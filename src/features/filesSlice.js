import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tree: {
        'root': {
            id: 'root',
            isFolder: true,
            name: 'Projet Markdown',
            children: ['file-1'],
        },
        'file-1': {
            id: 'file-1',
            isFolder: false,
            name: 'README.md',
            content: '# Welcome to Markdown Editor',
        },
    },
    currentFileId: 'file-1',
}

export const filesSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {
        setCurrentFile: (state, action) => {
            state.currentFileId = action.payload
        },
        updateFileContent: (state, action) => {
            const { content } = action.payload;
            const currentFile = state.tree[state.currentFileId];

            if (currentFile && !currentFile.isFolder) {
                currentFile.content = content;
            }
        }
    },
});

export const { setCurrentFile, updateFileContent } = filesSlice.actions;

export default filesSlice.reducer;