import { Box, BoxProps, Button, ButtonProps } from "grommet";
import { Icon } from "grommet-icons";
import styled from "styled-components";

import { Side } from "../../../lib/types";
import {
  borderSize,
  colors,
  edgeSize,
  overflowStyle,
  transitionDuration,
} from "../../../theme/theme-new";
import Text from "../Text";
import {
  activeBackground,
  background,
  hoverBackground,
  textColor,
  Type,
} from "./config";
import { getBoxPad, getTextMargin } from "./helpers";

type Props = {
  IconComponent?: Icon;
  a11yTitle?: string;
  className?: string;
  hoverType?: Type;
  iconPosition?: Side;
  isDisabled?: boolean;
  label?: string;
  margin?: ButtonProps["margin"];
  noBorderSide?: Side;
  onClick: () => void;
  type: Type;
  width?: BoxProps["width"];
};

function AppButton({
  IconComponent,
  a11yTitle,
  className,
  iconPosition,
  isDisabled,
  label,
  margin,
  onClick,
  type,
}: Props): JSX.Element {
  return (
    <Button
      a11yTitle={a11yTitle || label}
      className={className}
      disabled={isDisabled}
      margin={margin}
      onClick={onClick}
      plain
    >
      <Box
        align="center"
        direction={iconPosition === "right" ? "row-reverse" : "row"}
        fill
        justify="between"
        pad={getBoxPad(!!label, !!IconComponent, iconPosition)}
      >
        {!!IconComponent && (
          <IconComponent color={textColor[type]} size={edgeSize.small} />
        )}
        {!!label && (
          <Text
            color={textColor[type]}
            margin={getTextMargin(!!IconComponent, iconPosition)}
            size="component"
            style={overflowStyle}
          >
            {label}
          </Text>
        )}
      </Box>
    </Button>
  );
}

const StyledAppButton = styled(AppButton)`
  background: ${(props) => `${background[props.type]}`};
  border-radius: ${borderSize.small};
  height: ${edgeSize.large};
  transition: all ${transitionDuration};

  ${(props) => !!props.width && `width: ${props.width};`}

  ${(props) =>
    props.type === "dark" &&
    `
  border: ${borderSize.xsmall} solid ${colors.gray8};
  `}

  ${(props) =>
    props.type === "secondary" &&
    `
  border: ${borderSize.xsmall} solid ${colors.gray3};
  `}

  ${(props) =>
    !!props.noBorderSide &&
    `
  border-${props.noBorderSide}: none;
  border-bottom-${props.noBorderSide}-radius: 0;
  border-top-${props.noBorderSide}-radius: 0;
  `}

  svg {
    transition: fill ${transitionDuration};
  }

  &:hover {
    ${(props) =>
      `
    background: ${hoverBackground[props.hoverType || props.type]};

    svg {
      fill: ${textColor[props.hoverType || props.type]};
    }
    `}

    ${(props) => props.type === "dark" && `border-color: ${colors.gray6};`}
    ${(props) => props.type === "secondary" && `border-color: ${colors.gray5};`}
  }

  &:active {
    ${(props) => `
    background: ${activeBackground[props.hoverType || props.type]};
    `}

    ${(props) => props.type === "dark" && `border-color: ${colors.gray4};`}
    ${(props) => props.type === "secondary" && `border-color: ${colors.gray7};`}
  }
`;

export default StyledAppButton;