import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

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

function recursiveDelete(tree, entryId) {
    const entry = tree[entryId];
    if (!entry) return;

    if (entry.isFolder && entry.children) {
        [...entry.children].forEach(childId => {
            recursiveDelete(tree, childId);
        });
    }

    // 2. Quitar la entrada del 'tree'
    delete tree[entryId];
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
        },
        createEntry: (state, action) => {
            const { name, isFolder, parentId, content } = action.payload;
            const parent = state.tree[parentId || 'root'];

            if (!parent || !parent.isFolder) {
                console.error("The father is not a folder or does not exist.");
                return;
            }

            const newId = uuidv4();

            state.tree[newId] = {
                id: newId,
                isFolder: isFolder,
                name: name,
                content: isFolder ? undefined : (content || '# New File'),
                children: isFolder ? [] : undefined,
            };

            parent.children.push(newId);
        },

        deleteEntry: (state, action) => {
            const { entryId } = action.payload;
            if (entryId === 'root') return;

            const parent = Object.values(state.tree).find(
                (e) => e.isFolder && e.children.includes(entryId)
            );
            if (parent) {
                parent.children = parent.children.filter(id => id !== entryId);
            }

            recursiveDelete(state.tree, entryId);

            if (state.currentFileId === entryId) {
                state.currentFileId = null;
            }
        },
        renameEntry: (state, action) => {
            const { entryId, newName } = action.payload;
            if (state.tree[entryId]) {
                state.tree[entryId].name = newName;
            }
        },
    },
});

export const {
    setCurrentFile,
    updateFileContent,
    createEntry,
    deleteEntry,
    renameEntry
} = filesSlice.actions;

export default filesSlice.reducer;