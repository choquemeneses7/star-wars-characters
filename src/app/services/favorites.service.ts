import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoritesKey = 'favorites';

  addFavorite(character: any) {
    const favorites = this.getFavorites();
    favorites.push(character);
    localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
  }

  removeFavorite(character: any) {
    let favorites = this.getFavorites();
    favorites = favorites.filter(fav => fav.name !== character.name);
    localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
  }

  getFavorites(): any[] {
    return JSON.parse(localStorage.getItem(this.favoritesKey) || '[]');
  }

  toggleFavorite(character: any) {
    if (this.isFavorite(character)) {
      this.removeFavorite(character);
    } else {
      this.addFavorite(character);
    }
  }

  isFavorite(character: any): boolean {
    return this.getFavorites().some(fav => fav.name === character.name);
  }
}
