import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: {},
};

export const blocksSlice = createSlice({
    name: 'blocks',
    initialState,
    reducers: {},
});

export const { } = blocksSlice.actions;
export default blocksSlice.reducer;