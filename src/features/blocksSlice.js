import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  items: {},
};

export const blocksSlice = createSlice({
  name: "blocks",
  initialState,
  reducers: {
    addBlock: (state, action) => {
      const { name, content, shortcut } = action.payload;
      const newId = uuidv4();
      state.items[newId] = {
        id: newId,
        name: name,
        content: content,
        shortcut: shortcut || "",
      };
    },

    updateBlock: (state, action) => {
      const { id, name, content, shortcut } = action.payload;
      if (state.items[id]) {
        state.items[id] = { ...state.items[id], name, content, shortcut };
      }
    },

    deleteBlock: (state, action) => {
      const { id } = action.payload;
      delete state.items[id];
    },

    importBlocks: (state, action) => {
      // 'action.payload' debe ser un objeto 'items' (como el nuestro)
      // Esto fusionará los bloques importados, sobrescribiendo
      // los existentes si tienen el mismo ID (raro, pero posible).
      Object.assign(state.items, action.payload);
    },
  },
});

export const { addBlock, updateBlock, deleteBlock, importBlocks } = blocksSlice.actions;
export default blocksSlice.reducer;
