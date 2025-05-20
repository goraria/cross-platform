"use client";

import React, { ComponentProps, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Building, CreditCard, PaintBucket, Settings, Settings2, SunIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge";
import {
	RadioInputOption
} from "@/components/elements/custom"
import { RadioGroup } from "@/components/ui/radio-group";

export function QuickSetting({
	className,
	...props
}: ComponentProps<"span"> & {
	className?: string
}) {
	const { theme, setTheme } = useTheme();
	const [selectedColor, setSelectedColor] = useState("neutral")
	const [selectedOption, setSelectedOption] = useState("")
	// const [selectedOption, setSelectedOption] = useState("payment")
	// const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])

	const colors = [
		{
			name: "primary",
			className: "foreground",
      color: "neutral",
			active: true
		},
		{
			name: "cyan",
			className: "cyan-500",
      color: "#696CFF",
			active: false
		},
    {
      name: "green",
      className: "green-500",
      color: "#0D9394",
      active: false
    },
		{
			name: "yellow",
			className: "yellow-500",
      color: "#FFAB1D",
			active: false
		},
		{
			name: "red",
			className: "red-500",
      color: "#EB3D63",
			active: false
		},
		{
			name: "blue",
			className: "orange-500",
      color: "#2092EC",
			active: false
		},
		{
			name: "orange",
			className: "orange-500",
      color: "#EC9720",
			active: false
		},
		{
			name: "purple",
			className: "purple-500",
      color: "#884fff",
			active: false
		}
	]


	// const handleFeatureChange = (feature: string) => {
	//   setSelectedFeatures(prev => 
	//     prev.includes(feature)
	//       ? prev.filter(f => f !== feature)
	//       : [...prev, feature]
	//   )
	// }

	return (
    <>
      <span className={cn("", className)} {...props}>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="cursor-pointer"
              size="icon"
            >
              <Settings2 className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Quick Setting</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="pb-0">
              <SheetTitle>Theme Customizer</SheetTitle>
              <SheetDescription>
                Customize & Preview in Real Time
              </SheetDescription>
            </SheetHeader>
            <Separator />
            <div className="flex flex-col gap-1.5 p-4 pb-0">
              <Badge variant="secondary" className="rounded">
                Theming
              </Badge>
            </div>
            <div className="flex flex-col gap-1.5 p-4">
              <RadioGroup
                value={selectedColor}
                onValueChange={setSelectedColor}
              >
                {/* <RadioInputOption
									label=""
									description=""
									value="payment"
									onSelect={setSelectedOption}
									flip="horizontal"
									pull="center"
									border="square"
								/>Z */}
                <div className="grid grid-cols-6 gap-4">
                  {colors.map((color, index) => (
                    <div
                      key={`${color.name}-${index}`}
                      onClick={() => setSelectedColor(color.name)}
                      className={cn(
                        "flex justify-center items-center border-2 aspect-square rounded-md transition-colors cursor-pointer",
                        selectedColor === color.name
                          ? // ? "border-primary"
                            `border-primary`
                          : "hover:border-primary/50",
                      )}
                    >
                      <RadioInputOption
                        label=""
                        description=""
                        value={color.name}
                        // selected={selectedColor === color.name}
                        selected={color.active}
                        onSelect={setSelectedColor}
                        flip="horizontal"
                        pull="center"
                        border="square"
                        type="hidden"
                        className={`bg-${color.className} rounded-md`}
                        style={{
                        	backgroundColor: color.color
                        }}
                      />
                    </div>
                  ))}
                  <div
                    key={"custom"}
                    onClick={() => setSelectedColor("")}
                    className={cn(
                      "flex justify-center items-center border-2 aspect-square rounded transition-colors cursor-pointer",
                      selectedColor === ""
                        ? "border-primary"
                        : "hover:border-primary/50",
                    )}
                  >
                    <PaintBucket className="h-full w-full p-2 text-destructive" />
                  </div>
                </div>
              </RadioGroup>
            </div>
            <div className="flex flex-col gap-1.5 p-4">
              <RadioGroup
                value={selectedOption}
                onValueChange={setSelectedOption}
              >
                <div className="space-y-4">
                  <div
                    onClick={() => setSelectedOption("payment")}
                    className={cn(
                      "flex items-center space-x-2 border-2 p-3 rounded transition-colors cursor-pointer",
                      selectedOption === "payment"
                        ? "border-primary"
                        : "hover:border-primary/50",
                    )}
                  >
                    <RadioInputOption
                      label="Payment Data"
                      description="Basic payment information"
                      value="payment"
                      selected={selectedOption === "payment"}
                      onSelect={setSelectedOption}
                      flip="horizontal"
                      pull="center"
                      border="square"
                      icon={<CreditCard className="h-4 w-4" />}
                    />
                  </div>

                  <div
                    onClick={() => setSelectedOption("business")}
                    className={cn(
                      "flex items-center space-x-2 border-2 p-3 rounded transition-colors cursor-pointer",
                      selectedOption === "business"
                        ? "border-primary border-2"
                        : "hover:border-primary/50",
                    )}
                  >
                    <RadioInputOption
                      label="For Business Sharks"
                      description="Advanced business features"
                      value="business"
                      selected={selectedOption === "business"}
                      onSelect={setSelectedOption}
                      flip="vertical"
                      pull="right"
                      border="square"
                      type="hidden"
                      icon={<Building className="h-4 w-4" />}
                    />
                  </div>
                </div>
              </RadioGroup>
            </div>
            {/* <SheetFooter>
							<SheetClose asChild>
								<Button type="submit">Save changes</Button>
							</SheetClose>
						</SheetFooter> */}
          </SheetContent>
        </Sheet>
        {/* <Button
					// variant="secondary"
					className="cursor-pointer"
					size="icon"
					onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
				>
					<Settings className="h-[1.2rem] w-[1.2rem]" />
					<span className="sr-only">Toggle theme</span>
				</Button> */}
      </span>
    </>
  );
}