import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

// Define allowed prop values
type IconType = "regular" | "solid" | "logo";
type IconSize = "xs" | "sm" | "md" | "lg";
type Rotate = 90 | 180 | 270;
type Flip = "horizontal" | "vertical";
type Pull = "left" | "right";
type Border = "square" | "circle";
type Animation = "spin" | "tada" | "flashing" | "burst" | "fade-left" | "fade-right";
type Hover = "spin" | "tada" | "flashing" | "burst" | "fade-left" | "fade-right";

interface BoxIconProps extends Omit<ComponentProps<'i'>, 'children'> {
  type?: IconType;
  name: string;
  color?: string;
  size?: IconSize | string;
  rotate?: Rotate;
  flip?: Flip;
  pull?: Pull;
  border?: Border;
  animation?: Animation;
  hover?: Hover;
}

export function BoxIcon({
  type = 'regular',
  name,
  color,
  size,
  rotate,
  flip,
  pull,
  border,
  animation,
  hover,
  className,
  style,
  ...props
}: BoxIconProps) {
  // Determine prefix: 'bx' always, then 'bx-', 'bxs-' or 'bxl-'
  const prefix =
    type === 'solid' ? (
      'bxs'
    ) : type === 'logo' ? (
      'bxl'
    ) : type === 'regular' ? (
      'bx'
    ) : 'bx';

  // Build class list
  const classes = cn(
    'bx',
    `${prefix}-${name}`,
    size && (['xs', 'sm', 'md', 'lg'].includes(size) ? `bx-${size}` : ''),
    rotate && `bx-rotate-${rotate}`,
    flip && `bx-flip-${flip}`,
    pull && `bx-pull-${pull}`,
    border && (border === 'circle' ? 'bx-border-circle' : 'bx-border'),
    animation && `bx-${animation}`,
    hover && `bx-${hover}-hover`,
    className
  );

  // Merge custom style with color and size if CSS size provided
  const mergedStyle = {
    ...style,
    ...(color ? { color } : {}),
    ...(size && !['xs', 'sm', 'md', 'lg'].includes(size) ? { fontSize: size } : {}),
  };

  return <i className={classes} style={mergedStyle} {...props} />;
}


// import { cn } from "@/lib/utils";
// import { ComponentProps } from "react";
//
// interface BoxIconProps {
//   type: "regular|solid|logo",
//   name: "adjust|alarms|etc....",
//   color: "blue|red|etc...",
//   size: "xs|sm|md|lg|cssSize",
//   rotate: "90|180|270",
//   flip: "horizontal|vertical",
//   border: "square|circle",
//   animation: "spin|tada|etc...",
//   pull: "left|right",
//   className: string,
// }
//
// export const BoxIcon = ({
//   className,
//   ...props
// }: ComponentProps<"i">) => {
//
//   const { type, name, color, size, rotate, flip, border, animation, pull } = props;
//
//   return (
//     <i
//       className={cn(`bx bx${type}`, className)}
//       style={{ width: 50, height: 50, color: "red" }}
//     ></i>
//   );
// };