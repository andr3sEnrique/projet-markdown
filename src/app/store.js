import { configureStore } from "@reduxjs/toolkit";
import filesReducer from "../features/filesSlice";
import blockReducer from "../features/blocksSlice";
import imagesReducer from "../features/imagesSlice";
import profilsReducer from "../features/profilsSlice";
import { loadState, saveState } from "./localStorage";
import throttle from "lodash.throttle";

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    files: filesReducer,
    blocks: blockReducer,
    images: imagesReducer,
    profils: profilsReducer,
  },
  preloadedState: preloadedState,
});

store.subscribe(
  throttle(() => {
    saveState({
      files: store.getState().files,
      blocks: store.getState().blocks,
      images: store.getState().images,
      profils: store.getState().profils,
    });
  }, 1000)
);
