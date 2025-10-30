import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  items: {},
};

export const profilSlice = createSlice({
  name: "profils",
  initialState,
  reducers: {
    addProfil: (state, action) => {
      const { name } = action.payload;
      const newId = uuidv4();
      if (!state.items) {
        state.items = {};
      }
      state.items[newId] = {
        id: newId,
        name: name,
        active: false,
      };
    },

    deleteProfil: (state, action) => {
      const { id } = action.payload;
      delete state.items[id];
    },

    isCurrentProfil: (state, action) => {
      const { id } = action.payload;
      const tabProfil = Object.values(state.items);
      const profil = tabProfil.find((p) => p.id === id);
      return profil ? profil.active : false;
    },

    setActiveProfil: (state, action) => {
      const tabProfil = Object.values(state.items);
      tabProfil.forEach((profil) => {
        profil.active = false;
      });
      const { id } = action.payload;
      if (!id) return;
      const profil = tabProfil.find((p) => p.id === id);
      profil.active = true;
    },
  },
});

export const selectAllProfils = (state) => (state.profils?.items ? Object.values(state.profils.items) : []);
export const selectCurrentProfil = (state) => (state.profils?.items ? Object.values(state.profils.items).find((p) => p.active) || null : null);

export const { addProfil, deleteProfil, isCurrentProfil, setActiveProfil } = profilSlice.actions;
export default profilSlice.reducer;
