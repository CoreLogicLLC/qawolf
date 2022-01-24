import Debug from 'debug';
import { EventEmitter } from 'events';
import { buildVirtualCode } from '../build-code/buildVirtualCode';
import { CodeReconciler } from './CodeReconciler';
import { getLineIncludes, removeLinesIncluding } from './format';
import { CREATE_HANDLE, PATCH_HANDLE } from './patchCode';
import { Step } from '../types';

const debug = Debug('qawolf:CodeUpdater');

export type CodeFileOptions = {
  path: string;
};

type UpdateOptions = {
  steps: Step[];
};

export abstract class CodeUpdater extends EventEmitter {
  protected _locked = false;
  private _reconciler: CodeReconciler;

  protected constructor() {
    super();
    this._reconciler = new CodeReconciler();
  }

  protected abstract _loadCode(): Promise<string>;
  protected abstract _updateCode(code: string): Promise<void>;

  private async _update(code: string): Promise<void> {
    debug('update code');
    this.emit('codeupdate', code);
    await this._updateCode(code);
  }

  protected async _prepare(): Promise<void> {
    const code = await this._loadCode();

    const createLine = getLineIncludes(code, CREATE_HANDLE);
    if (!createLine) return;

    const updatedCode = code.replace(createLine.trim(), PATCH_HANDLE);
    await this._update(updatedCode);
  }

  public async finalize(): Promise<void> {
    this._locked = true;
    let code = await this._loadCode();
    code = removeLinesIncluding(code, PATCH_HANDLE);
    await this._update(code);
  }

  public async update(options: UpdateOptions): Promise<void> {
    // do not conflict with an update in progress
    if (this._locked) {
      debug(`skip update: update in progress`);
      return;
    }

    // check the virtual code changed
    const updatedVirtualCode = buildVirtualCode(options.steps);
    if (!this._reconciler.hasChanges(updatedVirtualCode)) {
      debug(`skip update: no virtual changes`);
      return;
    }

    this._locked = true;

    // update the actual code
    const actualCode = await this._loadCode();

    const updatedCode = this._reconciler.reconcile({
      actualCode,
      virtualCode: updatedVirtualCode,
    });
    await this._update(updatedCode);

    // store the updated virtual code
    this._reconciler.update(updatedVirtualCode);

    this._locked = false;
  }
}
