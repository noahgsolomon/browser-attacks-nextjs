import { EditorConfig } from "@/types/editor";
import { themeEditorConfig } from "./theme";

export const editorRegistry: Record<string, EditorConfig> = {
  theme: themeEditorConfig,
};

export const getEditorConfig = (type: string): EditorConfig => {
  const config = editorRegistry[type];
  if (!config) {
    throw new Error(`Editor type "${type}" not found`);
  }
  return config;
};

export const editorTypes = Object.keys(editorRegistry);
