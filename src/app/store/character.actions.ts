import { createAction, props } from '@ngrx/store';
import { Character } from '../models/characters';

export const loadCharacters = createAction('[Character] Load Characters');

export const loadCharactersSuccess = createAction(
  '[Character] Load Characters Success',
  props<{ characters: Character[] }>()
);

export const loadCharactersFailure = createAction(
  '[Character] Load Characters Failure',
  props<{ error: string }>()
);

export const searchCharacters = createAction(
  '[Character] Search Characters',
  props<{ searchTerm: string; gender: string }>()
);

export const filterCharacters = createAction(
  '[Character List] Filter Characters',
  props<{ searchTerm?: string; gender?: string }>()
);
