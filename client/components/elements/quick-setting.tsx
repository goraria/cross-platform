"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Building, CreditCard, Settings, SunIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge";
import {
	OptionCard
} from "@/components/elements/custom"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function QuickSetting({
	className,
	...props
}: React.ComponentProps<"span"> & {
	className?: string
}) {
	const { theme, setTheme } = useTheme();
	const [selectedOption, setSelectedOption] = useState("")
	// const [selectedOption, setSelectedOption] = useState("payment")
	// const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])

	// const handleFeatureChange = (feature: string) => {
	//   setSelectedFeatures(prev => 
	//     prev.includes(feature)
	//       ? prev.filter(f => f !== feature)
	//       : [...prev, feature]
	//   )
	// }

	return (
		<>
			<span className={cn("grid grid-cols-2 gap-2", className)} {...props}>
				<Sheet>
					<SheetTrigger asChild>
						<Button
							// variant="outline"
							size="icon"
						>
							<Settings className="h-[1.2rem] w-[1.2rem]" />
							<span className="sr-only">Quick Setting</span>
						</Button>
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>Theme Customizer</SheetTitle>
							<SheetDescription>
								Customize & Preview in Real Time
							</SheetDescription>
						</SheetHeader>
						<Separator />
						<div className="flex flex-col gap-1.5 p-4">
							<Badge variant="secondary" className="rounded">Theming</Badge>
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
												: "hover:border-primary/50"
										)}
									>
										<OptionCard
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
												: "hover:border-primary/50"
										)}
									>
										<OptionCard
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
				<Button
					// variant="secondary"
					className="cursor-pointer"
					size="icon"
					onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
				>
					<Settings className="h-[1.2rem] w-[1.2rem]" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</span>
		</>
	);
}