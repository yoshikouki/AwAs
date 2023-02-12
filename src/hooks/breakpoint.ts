import { useEffect, useState } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import { KeyValuePair } from "tailwindcss/types/config";
import tailwindConfig from "../tailwind.config"; // Fix the path

const config = resolveConfig(tailwindConfig);
const screensConfig = config.theme?.screens as KeyValuePair;
// type BreakpointKey = "sm" | "md" | "lg" | "xl" | "2xl";
type BreakpointKey = keyof typeof screensConfig;

const getBreakpoints = () => {
  const breakpoints: Record<string, number> = {};
  for (const [breakpoint, stringValue] of Object.entries(screensConfig)) {
    breakpoints[breakpoint] = parseInt(stringValue.replace("px", ""), 10);
  }
  return breakpoints;
};

const getCurrentBreakpoint = (breakpoints = getBreakpoints()): string => {
  let currentBreakpoint: BreakpointKey[] = [];
  const ascendingBreakpoints = Object.entries(breakpoints);
  for (const [breakpoint, value] of ascendingBreakpoints) {
    if (globalThis.innerWidth <= value) {
      currentBreakpoint.push(breakpoint);
    }
  }
  return currentBreakpoint[0];
};

export const useBreakpoint = () => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<BreakpointKey>("sm");
  const isCurrentBreakpoint = (breakpoint: BreakpointKey): boolean => {
    return breakpoint.toLowerCase() === currentBreakpoint;
  };
  useEffect(() => {
    setCurrentBreakpoint(getCurrentBreakpoint());
  }, [currentBreakpoint]);
  return {
    currentBreakpoint,
    isCurrentBreakpoint,
  };
};
