// components/theme-color-switch.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const themeColors = [
  { name: "Pink", value: "#FF00AA" },
  { name: "Blue", value: "#3B82F6" },
  { name: "Green", value: "#22C55E" },
  { name: "Purple", value: "#A855F7" },
  { name: "Orange", value: "#F97316" },
  { name: "Red", value: "#EF4444" },
] as const

export function ThemeColorSwitch() {
  const [currentColor, setCurrentColor] = useState<typeof themeColors[number]["value"]>(themeColors[0].value)

  const handleColorChange = (color: typeof themeColors[number]["value"]) => {
    setCurrentColor(color)
    // Convert hex to HSL
    const hsl = hexToHSL(color)
    // Update CSS variables
    document.documentElement.style.setProperty('--primary', hsl)
    document.documentElement.style.setProperty('--ring', hsl)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-10 h-10 p-0">
          <div 
            className="w-6 h-6 rounded-full" 
            style={{ backgroundColor: currentColor }}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2">
        <div className="grid grid-cols-3 gap-2">
          {themeColors.map((color) => (
            <button
              key={color.value}
              onClick={() => handleColorChange(color.value)}
              className={cn(
                "w-full aspect-square rounded-md border-2 transition-all",
                "hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2",
                currentColor === color.value ? "border-primary" : "border-transparent"
              )}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

// Helper function to convert hex to HSL
function hexToHSL(hex: string): string {
  // Remove the hash if it exists
  hex = hex.replace('#', '')

  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255
  const g = parseInt(hex.substring(2, 4), 16) / 255
  const b = parseInt(hex.substring(4, 6), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }

    h /= 6
  }

  // Convert to degrees and percentages
  h = Math.round(h * 360)
  s = Math.round(s * 100)
  const lPercent = Math.round(l * 100)

  return `${h} ${s}% ${lPercent}%`
}