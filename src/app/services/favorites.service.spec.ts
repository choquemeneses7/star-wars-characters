import { TestBed } from '@angular/core/testing';
import { FavoritesService } from './favorites.service';

describe('FavoritesService', () => {
  let service: FavoritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a favorite', () => {
    const character = { name: 'Luke Skywalker' };
    service.addFavorite(character);

    const favorites = service.getFavorites();
    expect(favorites.length).toBe(1);
    expect(favorites[0]).toEqual(character);
  });

  it('should remove a favorite', () => {
    const character = { name: 'Luke Skywalker' };
    service.addFavorite(character);
    service.removeFavorite(character);

    const favorites = service.getFavorites();
    expect(favorites.length).toBe(0);
  });

  it('should toggle favorite status', () => {
    const character = { name: 'Luke Skywalker' };

    service.toggleFavorite(character);
    let favorites = service.getFavorites();
    expect(favorites.length).toBe(1);
    expect(favorites[0]).toEqual(character);

    service.toggleFavorite(character);
    favorites = service.getFavorites();
    expect(favorites.length).toBe(0);
  });

  it('should check if a character is a favorite', () => {
    const character = { name: 'Luke Skywalker' };

    expect(service.isFavorite(character)).toBe(false);

    service.addFavorite(character);
    expect(service.isFavorite(character)).toBe(true);

    service.removeFavorite(character);
    expect(service.isFavorite(character)).toBe(false);
  });
});
