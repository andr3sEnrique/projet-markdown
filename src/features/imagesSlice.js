import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: {},
};

export const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    addImage: (state, action) => {
      const { id, name, base64, linkedProfil } = action.payload;
      if (!id) return;

      state.items[id] = {
        id: id,
        name: name,
        base64: base64,
        linkedProfil: linkedProfil || null,
      };
    },
    deleteImage: (state, action) => {
      const { id } = action.payload;
      delete state.items[id];
    },
    renameImage: (state, action) => {
      const { id, newName } = action.payload;
      if (state.items[id]) {
        state.items[id].name = newName;
      }
    },
    importImages: (state, action) => {
      Object.assign(state.items, action.payload);
    },
  },
});

export const { addImage, deleteImage, renameImage, importImages } = imagesSlice.actions;
export default imagesSlice.reducer;
