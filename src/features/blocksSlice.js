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
      const { name, content, shortcut, linkedProfil } = action.payload;
      const newId = uuidv4();
      state.items[newId] = {
        id: newId,
        name: name,
        content: content,
        shortcut: shortcut || "",
        linkedProfil: linkedProfil || null,
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
      Object.assign(state.items, action.payload);
    },
  },
});

export const { addBlock, updateBlock, deleteBlock, importBlocks } = blocksSlice.actions;
export default blocksSlice.reducer;
