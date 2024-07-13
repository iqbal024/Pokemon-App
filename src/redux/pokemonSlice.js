import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  caughtPokemons: [],
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    catchPokemon: (state, action) => {
      state.caughtPokemons.push(action.payload);
    },
    releasePokemon: (state, action) => {
      state.caughtPokemons = state.caughtPokemons.filter(
        (pokemon) => pokemon.id !== action.payload
      );
    },
    renamePokemon: (state, action) => {
      const index = state.caughtPokemons.findIndex(
        (pokemon) => pokemon.id === action.payload.id
      );
      if (index !== -1) {
        state.caughtPokemons[index].nickname = action.payload.newName;
      }
    },
  },
});

export const { catchPokemon, releasePokemon, renamePokemon } =
  pokemonSlice.actions;
export default pokemonSlice.reducer;
