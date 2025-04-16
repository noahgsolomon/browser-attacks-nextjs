import { ThemeStyleProps } from "@/types/theme";
import { colorFormatter } from "./color-converter";

export const variableNames = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "destructive-foreground",
  "border",
  "input",
  "ring",
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
  "radius",
  "font-sans",
  "font-serif",
  "font-mono",
  "shadow-color",
  "shadow-opacity",
  "shadow-blur",
  "shadow-spread",
  "shadow-offset-x",
  "shadow-offset-y",
  "shadow",
  "shadow-2xs",
  "shadow-xs",
  "shadow-sm",
  "shadow-md",
  "shadow-lg",
  "shadow-xl",
  "shadow-2xl",
];

const nonColorVariables = ["font-sans", "font-serif", "font-mono", "radius"];

const VARIABLE_PREFIX = "--";

export const parseCssInput = (input: string) => {
  const lightColors: ThemeStyleProps = {} as ThemeStyleProps;
  const darkColors: ThemeStyleProps = {} as ThemeStyleProps;

  try {
    const rootContent = extractCssBlockContent(input, ":root");
    const darkContent = extractCssBlockContent(input, ".dark");

    if (rootContent) {
      parseColorVariables(rootContent, lightColors, variableNames);
    }
    if (darkContent) {
      parseColorVariables(darkContent, darkColors, variableNames);
    }
  } catch (error) {
    console.error("Error parsing CSS input:", error);
  }

  return { lightColors, darkColors };
};

const extractCssBlockContent = (input: string, selector: string): string | null => {
  const regex = new RegExp(`${escapeRegExp(selector)}\\s*{([^}]+)}`);
  return input.match(regex)?.[1]?.trim() || null;
};

const parseColorVariables = (
  cssContent: string,
  target: ThemeStyleProps,
  validNames: string[]
) => {
  const variableDeclarations = cssContent.match(/--[^:]+:\s*[^;]+/g) || [];

  variableDeclarations.forEach((declaration) => {
    const [name, value] = declaration.split(":").map((part) => part.trim());
    const cleanName = name.replace(VARIABLE_PREFIX, "");

    if (validNames.includes(cleanName)) {
      if (nonColorVariables.includes(cleanName)) {
        target[cleanName] = value;
        return;
      }

      const colorValue = processColorValue(value);
      const formattedValue = colorFormatter(colorValue, "hex");
      target[cleanName] = formattedValue;
    }
  });
};

const processColorValue = (value: string): string => {
  return /^\d/.test(value) ? `hsl(${value})` : value;
};

// Helper function to escape regex special characters
const escapeRegExp = (string: string): string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};
