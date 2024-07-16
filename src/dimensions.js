import { create } from "zustand";

export const useDimensions = create((set) => ({
  height: "20 px",
  sections: 5,
  blockWidth: `calc(${100 / 5}% + 1px)`,
  setSections: (sections) =>
    set({ sections, width: `calc(${100 / (sections - 1)} + 1px)` }),
}));
