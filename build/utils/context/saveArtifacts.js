"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopVideos = exports.saveArtifacts = exports.saveConsoleLogs = void 0;
const debug_1 = __importDefault(require("debug"));
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const playwright_video_1 = require("playwright-video");
const forEach_1 = require("./forEach");
const debug = debug_1.default('qawolf:saveArtifacts');
const capturesToStop = [];
exports.saveConsoleLogs = async (context, saveDir) => {
    const logPath = new Map();
    await context.exposeBinding('qawLogEvent', ({ page }, { level, message }) => {
        const pageIndex = page.createdIndex;
        if (!logPath.has(pageIndex)) {
            const timestamp = Date.now();
            debug(`save logs for page ${pageIndex} at ${timestamp}`);
            logPath.set(pageIndex, path_1.join(saveDir, `logs_${pageIndex}_${timestamp}.txt`));
        }
        fs_extra_1.appendFileSync(logPath.get(pageIndex), `${level}: ${message}\n`);
    });
};
exports.saveArtifacts = async (context, saveDir) => {
    // only record a video if ffmpeg installed
    const includeVideo = !!playwright_video_1.getFfmpegPath();
    let pageCount = 0;
    await fs_extra_1.ensureDir(saveDir);
    await exports.saveConsoleLogs(context, saveDir);
    await forEach_1.forEachPage(context, async (page) => {
        const timestamp = Date.now();
        const pageIndex = pageCount++;
        debug(`save artifacts for page ${pageIndex} at ${timestamp}`);
        try {
            if (includeVideo) {
                debug(`save video for page ${pageIndex}`);
                const capture = await playwright_video_1.saveVideo(
                // playwright-video still depends on playwright-core
                page, path_1.join(saveDir, `video_${pageIndex}_${timestamp}.mp4`));
                capturesToStop.push(capture);
            }
            else {
                debug(`ffmpeg not found, skipping video for page ${pageIndex}`);
            }
        }
        catch (error) {
            debug(`cannot save artifacts for page ${pageIndex}: ${error.message}`);
        }
    });
};
exports.stopVideos = async () => {
    await Promise.all(capturesToStop.map((capture) => capture.stop()));
};
//# sourceMappingURL=saveArtifacts.js.map