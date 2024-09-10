import { TestBed } from '@angular/core/testing';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of, throwError } from 'rxjs';
import { CharacterService } from '../services/character.service';
import { CharacterEffects } from './character.effects';
import { loadCharacters, loadCharactersSuccess, loadCharactersFailure, searchCharacters } from './character.actions';

describe('CharacterEffects', () => {
  let effects: CharacterEffects;
  let actions$: Actions;
  let characterService: jasmine.SpyObj<CharacterService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('CharacterService', ['getCharacters']);

    TestBed.configureTestingModule({
      providers: [
        CharacterEffects,
        { provide: CharacterService, useValue: spy },
        { provide: Actions, useValue: of() }
      ]
    });

    effects = TestBed.inject(CharacterEffects);
    actions$ = TestBed.inject(Actions);
    characterService = TestBed.inject(CharacterService) as jasmine.SpyObj<CharacterService>;
  });

  describe('loadCharacters$', () => {
    it('should return a loadCharactersSuccess action, with characters, on success', () => {
      const characters = [{
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        hair_color: 'blond',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        gender: 'male',
        homeworld: 'Tatooine',
        films: [],
        species: [],
        vehicles: [],
        starships: [],
        created: '2',
        edited: '12',
        url: 'x'
      }];
      characterService.getCharacters.and.returnValue(of(characters));
      
      actions$ = of(loadCharacters());
      
      effects.loadCharacters$.subscribe(result => {
        expect(result).toEqual(loadCharactersSuccess({ characters }));
      });
    });

    it('should return a loadCharactersFailure action, with an error, on failure', () => {
      const error = 'Failed to load characters';
      characterService.getCharacters.and.returnValue(throwError(error));
      
      actions$ = of(loadCharacters());
      
      effects.loadCharacters$.subscribe(result => {
        expect(result).toEqual(loadCharactersFailure({ error: 'Failed to load characters' }));
      });
    });
  });

  describe('searchCharacters$', () => {
    it('should return a loadCharactersSuccess action, with filtered characters, on success', () => {
      const characters = [
        {
          name: 'Luke Skywalker',
          height: '172',
          mass: '77',
          hair_color: 'blond',
          skin_color: 'fair',
          eye_color: 'blue',
          birth_year: '19BBY',
          gender: 'male',
          homeworld: 'Tatooine',
          films: [],
          species: [],
          vehicles: [],
          starships: [],
          created: '2',
          edited: '12',
          url: 'x'
        },
        {
          name: 'Leia Organa',
          height: '172',
          mass: '77',
          hair_color: 'blond',
          skin_color: 'fair',
          eye_color: 'blue',
          birth_year: '19BBY',
          gender: 'female',
          homeworld: 'Tatooine',
          films: [],
          species: [],
          vehicles: [],
          starships: [],
          created: '2',
          edited: '12',
          url: 'x'
        }
      ];
      const searchTerm = 'Luke';
      const gender = 'male';
      const filtered = characters.filter(character =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        character.gender === gender
      );

      characterService.getCharacters.and.returnValue(of(characters));
      
      actions$ = of(searchCharacters({ searchTerm, gender }));
      
      effects.searchCharacters$.subscribe(result => {
        expect(result).toEqual(loadCharactersSuccess({ characters: filtered }));
      });
    });

    it('should return a loadCharactersFailure action, with an error, on failure', () => {
      const error = 'Failed to search characters';
      characterService.getCharacters.and.returnValue(throwError(error));
      
      actions$ = of(searchCharacters({ searchTerm: 'Luke', gender: 'male' }));
      
      effects.searchCharacters$.subscribe(result => {
        expect(result).toEqual(loadCharactersFailure({ error }));
      });
    });
  });
});
