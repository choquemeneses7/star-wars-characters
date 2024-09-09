import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CharacterState } from './character.reducer';

export const selectCharacterState = createFeatureSelector<CharacterState>('characters');

export const selectAllCharacters = createSelector(
  selectCharacterState,
  (state: CharacterState) => state.characters
);

export const selectFilteredCharacters = createSelector(
  selectCharacterState,
  (state: CharacterState) => state.filteredCharacters || []
);

export const selectLoading = createSelector(
  selectCharacterState,
  (state: CharacterState) => state.loading
);

export const selectError = createSelector(
  selectCharacterState,
  (state: CharacterState) => state.error
);

export const getCharacterById = createSelector(
  selectCharacterState,
  (state: CharacterState, props: { id: string }) => 
    state.characters.find(character => character.url.endsWith(props.id))
);
