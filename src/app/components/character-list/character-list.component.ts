import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../../services/favorites.service';
import { Character } from '../../models/characters';

@Component({
  selector: 'app-character-list',
  template: `
    <ul>
      <li *ngFor="let character of characters"  (click)="selectACharacter(character)">
        <span>{{ character.name }} ({{ character.gender }})</span>
        <button (click)="toggleFavoriteTrigger(character); $event.stopPropagation();">
          {{ isFavorite(character) ? 'Unfavorite' : 'Favorite' }}
        </button>
      </li>
    </ul>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class CharacterListComponent implements OnInit{
  @Input() characters: Character[] = [];
  @Output() selectCharacter = new EventEmitter<any>();
  @Output() toggleFavorite = new EventEmitter<any>();

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    console.log("this.characters$: ", this.characters);
  }

  selectACharacter(character: any) {
    this.selectCharacter.emit(character);
  }

  toggleFavoriteTrigger(character: any) {
    this.toggleFavorite.emit(character);
  }

  isFavorite(character: any) {
    return this.favoritesService.isFavorite(character);
  }
}
