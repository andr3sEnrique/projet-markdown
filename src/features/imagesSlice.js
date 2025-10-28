import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: {},
};

export const imagesSlice = createSlice({
    name: 'images',
    initialState,
    reducers: {},
});

export const { } = imagesSlice.actions;
export default imagesSlice.reducer;