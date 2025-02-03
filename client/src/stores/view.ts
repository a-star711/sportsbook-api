import { create } from "zustand";

type ViewMode = "LEAGUE" | "TIMELINE";

interface ViewState {
  mode: ViewMode;
  setMode: (mode: ViewMode) => void;
  toggleMode: () => void;
}

export const useViewStore = create<ViewState>((set) => ({
  mode: window.location.pathname === "/gameview" ? "LEAGUE" : "TIMELINE",
  setMode: (mode) => {

    window.history.pushState({}, "", mode === "LEAGUE" ? "/gameview" : "/");
    set({ mode });
  },
  toggleMode: () => set((state) => {
    const newMode = state.mode === "LEAGUE" ? "TIMELINE" : "LEAGUE";
    window.history.pushState({}, "", newMode === "LEAGUE" ? "/gameview" : "/");
    return { mode: newMode };
  }),
}));