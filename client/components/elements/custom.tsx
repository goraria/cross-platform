// components/ui/option-card.tsx
import React, { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils"
import { RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox";

type Flip = "horizontal" | "vertical";
type Pull = "left" | "right" | "center";
type Border = "square" | "circle";
type InputType = "radio" | "checkbox"
type Type = "visible" | "hidden"
// type Tag = "visible" | "hidden"
type Position = 'top' | 'right' | 'bottom' | 'left' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

interface RadioInputOptionProps {
  label: string
  description?: string
  value: string
	selected?: boolean
	type?: Type
  // type?: InputType
  hoverEffect?: boolean
  className?: string
  icon?: ReactNode
	flip?: Flip
	pull?: Pull
	border?: Border
	onSelect: (value: string) => void
	style?: React.CSSProperties
  // position?: Position
}

interface CheckboxInputOptionProps {
  label: string
  description?: string
  value: string
	selected?: boolean
	type?: Type
  // type?: InputType
  hoverEffect?: boolean
  className?: string
  icon?: ReactNode
	flip?: Flip
	pull?: Pull
	border?: Border
	onSelect: (value: string) => void
  // position?: Position
}

export function RadioInputOption({
  label = "",
  description = "",
  value,
	selected,
	// tag = "visible",
	type = "visible",
	hoverEffect = true,
	icon,
	flip,
	pull = "left",
	border = "square",
	onSelect,
	className,
	style,
	...props
}: RadioInputOptionProps) {

	const getFlipClasses = (flip?: Flip) => {
    if (!flip) return ""
    return flip === "horizontal" ? "flex-row-reverse" : "flex-col-reverse"
  }

  const getPullClasses = (pull: Pull) => {
    switch (pull) {
      case "left": return "justify-start"
      case "right": return "justify-end"
      case "center": return "justify-center"
      default: return "justify-start"
    }
  }

  const getBorderClasses = (border: Border) => {
    return (
			border === "circle" ? "rounded-full" : 
			border === "square" ? "rounded" :
			""
		)
  }

  // const getInputComponent = () => {
  //   if (type === "checkbox") {
  //     return (
  //       <Checkbox
  //         id={value}
	// 				className={cn(tag === "hidden" ? "hidden" : "")}
  //         checked={selected}
  //         onCheckedChange={() => onSelect(value)}
  //       />
  //     )
  //   } else if (type === "radio") {
  //     return (
  //       <RadioGroupItem
	// 				className={cn(tag === "hidden" ? "hidden" : "")}
  //         value={value}
  //         id={value}
  //       />
  //     )
  //   } else {
  //     return null
  //   }
  // }

  return (
		<>
			<div 
				onClick={() => onSelect(value)}
				className={cn(
					"flex border-2 p-3 transition-colors cursor-pointer gap-2 border-transparent",
					getFlipClasses(flip),
					getPullClasses(pull),
					getBorderClasses(border),
					// selected 
					// 	? "border-primary" 
					// 	: "border-transparent",
					// hoverEffect && !selected && "hover:border-primary/50",
					// tag && "inline-flex",
					className
				)}
				style={style}
				{...props}
			>
				<RadioGroupItem
					className={cn(type === "hidden" ? "hidden" : "")}
          value={value}
          id={value}
        />
				<div className="flex flex-col">
					<div className="flex items-center gap-2">
						{icon}
						<Label htmlFor={value}>{label}</Label>
					</div>
					{description && (
						<span className="text-sm text-muted-foreground">{description}</span>
					)}
				</div>
			</div>
			{/* <div className="flex items-center space-x-2">
				<RadioGroupItem value={value} id={value} />
				<div className="flex flex-col">
					<Label htmlFor={value}>{label}</Label>
					{description && (
						<span className="text-sm text-muted-foreground">{description}</span>
					)}
				</div>
			</div> */}
		</>
  )
}

export function CheckboxInputOption({
  label = "",
  description = "",
  value,
	selected = false,
	// tag = "visible",
	type = "visible",
	hoverEffect = true,
	className,
	icon,
	flip,
	pull = "left",
	border = "square",
	onSelect,
}: RadioInputOptionProps) {

	const getFlipClasses = (flip?: Flip) => {
    if (!flip) return ""
    return flip === "horizontal" ? "flex-row-reverse" : "flex-col-reverse"
  }

  const getPullClasses = (pull: Pull) => {
    switch (pull) {
      case "left": return "justify-start"
      case "right": return "justify-end"
      case "center": return "justify-center"
      default: return "justify-start"
    }
  }

  const getBorderClasses = (border: Border) => {
    return (
			border === "circle" ? "rounded-full" : 
			border === "square" ? "rounded" :
			""
		)
  }

  return (
		<>
			<div 
				onClick={() => onSelect(value)}
				className={cn(
					"flex border-2 p-3 transition-colors cursor-pointer gap-2 border-transparent",
					getFlipClasses(flip),
					getPullClasses(pull),
					getBorderClasses(border),
					// selected 
					// 	? "border-primary" 
					// 	: "border-transparent",
					// hoverEffect && !selected && "hover:border-primary/50",
					// tag && "inline-flex",
					className
				)}
			>
				<RadioGroupItem
					className={cn(type === "hidden" ? "hidden" : "")}
          value={value}
          id={value}
        />
				<div className="flex flex-col">
					<div className="flex items-center gap-2">
						{icon}
						<Label htmlFor={value}>{label}</Label>
					</div>
					{description && (
						<span className="text-sm text-muted-foreground">{description}</span>
					)}
				</div>
			</div>
		</>
  )
}