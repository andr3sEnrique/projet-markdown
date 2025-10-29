import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    items: {},
};

export const imagesSlice = createSlice({
    name: 'images',
    initialState,
    reducers: {
        addImage: (state, action) => {
            const { name, base64 } = action.payload;
            const newId = uuidv4();
            state.items[newId] = {
                id: newId,
                name: name,
                base64: base64,
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
    },
});

export const { addImage, deleteImage, renameImage } = imagesSlice.actions;
export default imagesSlice.reducer;