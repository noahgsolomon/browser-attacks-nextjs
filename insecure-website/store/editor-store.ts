import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ThemeEditorState } from "@/types/editor";
//@ts-expect-error - Missing type definitions for tiny-isequal package
import { isEqual } from "@ngard/tiny-isequal";
import { defaultThemeState } from "@/config/theme";
import { getPresetThemeStyles } from "../utils/theme-presets";

interface EditorStore {
  themeState: ThemeEditorState;
  setThemeState: (state: ThemeEditorState) => void;
  applyThemePreset: (preset: string) => void;
  resetToDefault: () => void;
  resetToCurrentPreset: () => void;
  hasDefaultThemeChanged: () => boolean;
  hasCurrentPresetChanged: () => boolean;
  hasChangedThemeFromDefault: boolean;
}

export const useEditorStore = create<EditorStore>()(
  persist(
    (set, get) => ({
      themeState: defaultThemeState,
      hasChangedThemeFromDefault: false,
      setThemeState: (state: ThemeEditorState) => {
        set({ themeState: state });
      },
      applyThemePreset: (preset: string) => {
        const themeState = get().themeState;
        const updates: Partial<EditorStore> = {
          themeState: {
            ...themeState,
            preset,
            styles: getPresetThemeStyles(preset),
          },
        };
        if (preset !== "default") {
          updates.hasChangedThemeFromDefault = true;
        }
        set(updates);
      },
      resetToDefault: () => {
        const mode = get().themeState.currentMode;
        set({ themeState: { ...defaultThemeState, currentMode: mode } });
      },
      resetToCurrentPreset: () => {
        const themeState = get().themeState;
        const preset = themeState.preset || 'default';
        set({
          themeState: {
            ...themeState,
            styles: getPresetThemeStyles(preset),
          },
        });
      },
      hasDefaultThemeChanged: () => {
        const state = get();
        return !isEqual(state.themeState.styles, defaultThemeState.styles);
      },
      hasCurrentPresetChanged: () => {
        const state = get();
        const preset = state.themeState.preset || 'default';
        const presetStyles = getPresetThemeStyles(preset);
        return !isEqual(state.themeState.styles, presetStyles);
      },
    }),
    {
      name: "editor-storage", // unique name for localStorage
    },
  ),
);
