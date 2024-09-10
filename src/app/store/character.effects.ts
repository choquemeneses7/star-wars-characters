import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CharacterService } from '../services/character.service';
import { loadCharacters, loadCharactersSuccess, loadCharactersFailure, searchCharacters } from './character.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class CharacterEffects {
  constructor(private actions$: Actions, private characterService: CharacterService) {}

  loadCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCharacters),
      mergeMap(() =>
        this.characterService.getCharacters().pipe(
          map(characters => loadCharactersSuccess({ characters })),
          catchError(error => {
            console.error('Error loading characters:', error);
            return of(loadCharactersFailure({ error: 'Failed to load characters' }));
          })
        )
      )
    )
  );

  searchCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchCharacters),
      mergeMap(action =>
        this.characterService.getCharacters().pipe(
          map(characters => {
            const filtered = characters.filter(character => {
              const matchesName = character.name.toLowerCase().includes(action.searchTerm.toLowerCase());
              const matchesGender = action.gender ? character.gender === action.gender : true;
              return matchesName && matchesGender;
            });
            return loadCharactersSuccess({ characters: filtered });
          }),
          catchError(error => of(loadCharactersFailure({ error })))
        )
      )
    )
  );
}
