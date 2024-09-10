import { selectCharacterState, selectAllCharacters, selectFilteredCharacters, selectLoading, selectError, getCharacterById } from './character.selectors';
import { CharacterState } from './character.reducer';

describe('Character Selectors', () => {
  const initialState: CharacterState = {
    characters: [
      { name: 'Luke Skywalker', gender: 'male', url: 'https://swapi.dev/api/people/1/' },
      { name: 'Leia Organa', gender: 'female', url: 'https://swapi.dev/api/people/2/' }
    ],
    filteredCharacters: [
      { name: 'Luke Skywalker', gender: 'male', url: 'https://swapi.dev/api/people/1/' }
    ],
    searchTerm: 'Luke',
    gender: 'male',
    loading: false,
    error: null
  };

  it('should select the character state', () => {
    const result = selectCharacterState.projector(initialState);
    expect(result).toEqual(initialState);
  });

  it('should select all characters', () => {
    const result = selectAllCharacters.projector(initialState);
    expect(result).toEqual(initialState.characters);
  });

  it('should select filtered characters', () => {
    const result = selectFilteredCharacters.projector(initialState);
    expect(result).toEqual(initialState.filteredCharacters);
  });

  it('should select loading status', () => {
    const result = selectLoading.projector(initialState);
    expect(result).toBe(initialState.loading);
  });

  it('should select error', () => {
    const result = selectError.projector(initialState);
    expect(result).toBe(initialState.error);
  });

  it('should get character by id', () => {
    const result = getCharacterById.projector(initialState, { id: '1' });
    expect(result).toEqual(undefined);
  });

  it('should return undefined if character by id not found', () => {
    const result = getCharacterById.projector(initialState, { id: '999' });
    expect(result).toBeUndefined();
  });
});
