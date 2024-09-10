import { characterReducer, initialState } from './character.reducer';
import { loadCharacters, loadCharactersSuccess, loadCharactersFailure, filterCharacters } from './character.actions';
import { Character } from '../models/characters';

describe('Character Reducer', () => {
  it('should return the default state', () => {
    const action = {} as any;
    const state = characterReducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  it('should handle loadCharacters action', () => {
    const action = loadCharacters();
    const state = characterReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true
    });
  });

  it('should handle loadCharactersSuccess action', () => {
    const characters: Character[] = [{ name: 'Luke Skywalker', gender: 'male' }];
    const action = loadCharactersSuccess({ characters });
    const state = characterReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      characters,
      filteredCharacters: characters,
      loading: false
    });
  });

  it('should handle loadCharactersFailure action', () => {
    const error = 'Failed to load characters';
    const action = loadCharactersFailure({ error });
    const state = characterReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error,
      loading: false
    });
  });

  it('should handle filterCharacters action with searchTerm and gender', () => {
    const initialCharacters: Character[] = [
      { name: 'Luke Skywalker', gender: 'male' },
      { name: 'Leia Organa', gender: 'female' }
    ];
    const stateWithCharacters = {
      ...initialState,
      characters: initialCharacters,
      filteredCharacters: initialCharacters
    };

    const action = filterCharacters({ searchTerm: 'Leia', gender: 'female' });
    const state = characterReducer(stateWithCharacters, action);

    expect(state).toEqual({
      ...stateWithCharacters,
      searchTerm: 'Leia',
      gender: 'female',
      filteredCharacters: [{ name: 'Leia Organa', gender: 'female' }]
    });
  });

  it('should handle filterCharacters action with only searchTerm', () => {
    const initialCharacters: Character[] = [
      { name: 'Luke Skywalker', gender: 'male' },
      { name: 'Leia Organa', gender: 'female' }
    ];
    const stateWithCharacters = {
      ...initialState,
      characters: initialCharacters,
      filteredCharacters: initialCharacters
    };

    const action = filterCharacters({ searchTerm: 'Luke' });
    const state = characterReducer(stateWithCharacters, action);

    expect(state).toEqual({
      ...stateWithCharacters,
      searchTerm: 'Luke',
      filteredCharacters: [{ name: 'Luke Skywalker', gender: 'male' }]
    });
  });

  it('should handle filterCharacters action with only gender', () => {
    const initialCharacters: Character[] = [
      { name: 'Luke Skywalker', gender: 'male' },
      { name: 'Leia Organa', gender: 'female' }
    ];
    const stateWithCharacters = {
      ...initialState,
      characters: initialCharacters,
      filteredCharacters: initialCharacters
    };

    const action = filterCharacters({ gender: 'female' });
    const state = characterReducer(stateWithCharacters, action);

    expect(state).toEqual({
      ...stateWithCharacters,
      gender: 'female',
      filteredCharacters: [{ name: 'Leia Organa', gender: 'female' }]
    });
  });
});
