import { createReducer, on } from '@ngrx/store';
import { loadCharacters, loadCharactersSuccess, loadCharactersFailure, filterCharacters } from './character.actions';
import { Character } from '../models/characters';

export interface CharacterState {
    characters: Character[];
    filteredCharacters: Character[];
    searchTerm: string;
    gender: string;
    loading: boolean;
    error: string | null;
  }

  export const initialState: CharacterState = {
    characters: [],
    filteredCharacters: [],
    searchTerm: '',
    gender: '',
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
    let filtered = state.characters;

    if (searchTerm) {
      filtered = filtered.filter(character => character.name?.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    if (gender) {
      filtered = filtered.filter(character => character.gender === gender);
    }

    return {
      ...state,
      searchTerm: searchTerm || state.searchTerm,
      gender: gender || state.gender,
      filteredCharacters: filtered
    };
  })
);
