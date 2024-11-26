"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { FormControl } from "@/components/ui/form";

interface AgentWorkSpeedSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export const AgentWorkSpeedSlider = React.forwardRef<
  HTMLDivElement,
  AgentWorkSpeedSliderProps
>(({ value, onChange }, ref) => {
  return (
    <FormControl ref={ref}>
      <div className="relative w-full">
        <Slider
          value={[value]}
          onValueChange={(newValue) => onChange(newValue[0])}
          max={100}
          step={1}
          className="w-full"
        />
        <div
          className="absolute top-0 left-0 w-full mb-4"
          style={{
            pointerEvents: "none",
            transform: `translateX(calc(${value}% - 1.25rem))`,
          }}
        >
          <div className="bg-primary text-primary-foreground rounded px-2 py-1 text-xs font-semibold -translate-y-full mb-6 w-min whitespace-nowrap">
            {value}%
          </div>
        </div>
      </div>
    </FormControl>
  );
});

AgentWorkSpeedSlider.displayName = "AgentWorkSpeedSlider";
