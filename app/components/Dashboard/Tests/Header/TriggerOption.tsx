import { Box } from "grommet";

import { Trigger } from "../../../../lib/types";
import { overflowStyle } from "../../../../theme/theme-new";
import CountBadge from "../../../shared-new/CountBadge";
import Option from "../../../shared-new/Select/Option";
import Text from "../../../shared-new/Text";
import TriggerIcon from "../../../shared-new/TriggerIcon";

type Props = {
  count: number;
  isSelected: boolean;
  label?: string;
  onClick: () => void;
  trigger?: Trigger;
};

export default function TriggerOption({
  count,
  isSelected,
  label,
  onClick,
  trigger,
}: Props): JSX.Element {
  const labelHtml = (
    <Box align="center" direction="row" justify="between" width="full">
      <Box align="center" direction="row">
        <TriggerIcon trigger={trigger} />
        <Text color="gray9" size="component" style={overflowStyle}>
          {label || trigger?.name}
        </Text>
      </Box>
      <CountBadge count={count} />
    </Box>
  );

  return <Option isSelected={isSelected} label={labelHtml} onClick={onClick} />;
}