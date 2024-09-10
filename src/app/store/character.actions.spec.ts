import { loadCharacters, loadCharactersSuccess, loadCharactersFailure, searchCharacters, filterCharacters } from './character.actions';
import { Character } from '../models/characters';

describe('Character Actions', () => {
  it('should create loadCharacters action', () => {
    const action = loadCharacters();
    expect(action.type).toBe('[Character] Load Characters');
  });

  it('should create loadCharactersSuccess action with correct payload', () => {
    const characters: Character[] = [{
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
    const action = loadCharactersSuccess({ characters });
    expect(action.type).toBe('[Character] Load Characters Success');
    expect(action.characters).toEqual(characters);
  });

  it('should create loadCharactersFailure action with correct payload', () => {
    const error = 'Error loading characters';
    const action = loadCharactersFailure({ error });
    expect(action.type).toBe('[Character] Load Characters Failure');
    expect(action.error).toBe(error);
  });

  it('should create searchCharacters action with correct payload', () => {
    const searchTerm = 'Luke';
    const gender = 'male';
    const action = searchCharacters({ searchTerm, gender });
    expect(action.type).toBe('[Character] Search Characters');
    expect(action.searchTerm).toBe(searchTerm);
    expect(action.gender).toBe(gender);
  });

  it('should create filterCharacters action with correct payload', () => {
    const searchTerm = 'Leia';
    const gender = 'female';
    const action = filterCharacters({ searchTerm, gender });
    expect(action.type).toBe('[Character List] Filter Characters');
    expect(action.searchTerm).toBe(searchTerm);
    expect(action.gender).toBe(gender);
  });
});
