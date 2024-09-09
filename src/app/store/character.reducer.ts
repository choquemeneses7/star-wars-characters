import { createReducer, on } from '@ngrx/store';
import { loadCharacters, loadCharactersSuccess, loadCharactersFailure, filterCharacters } from './character.actions';
import { Character } from '../models/characters';

export interface CharacterState {
  characters: Character[];
  filteredCharacters: Character[];
  loading: boolean;
  error: string | null;
}

export const initialState: CharacterState = {
  characters: [],
  filteredCharacters: [],
  loading: false,
  error: null
};

export const characterReducer = createReducer(
  initialState,
  on(loadCharacters, state => ({ ...state, loading: true })),
  on(loadCharactersSuccess, (state, { characters }) => ({
    ...state,
    characters,
    filteredCharacters: characters,
    loading: false
  })),
  on(loadCharactersFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(filterCharacters, (state, { searchTerm, gender }) => {
    const filtered = Array.isArray(state.characters) ? state.characters.filter(character => 
      (searchTerm ? character.name.includes(searchTerm) : true) &&
      (gender ? character.gender === gender : true)
    ) : [];
    
    return { ...state, filteredCharacters: filtered };
  })
);
