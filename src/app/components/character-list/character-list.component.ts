import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../../services/favorites.service';
import { Character } from '../../models/characters';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-character-list',
  template: `
    <div class="character-card-container">
      <mat-card
        *ngFor="let character of characters"
        (click)="selectACharacter(character)"
        class="character-card"
        [ngClass]="{'selected': selectedCharacter === character}"
      >
        <mat-card-header>
          <mat-card-title>{{ character.name }}</mat-card-title>
          <mat-card-subtitle>{{ character.gender }}</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <p>Height: {{ character.height }} cm</p>
        </mat-card-content>

        <mat-card-actions>
          <button mat-icon-button color="primary" (click)="toggleFavoriteTrigger(character); $event.stopPropagation();">
            <mat-icon>{{ isFavorite(character) ? 'favorite' : 'favorite_border' }}</mat-icon>
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatListModule],
  styles: [`
    .character-card-container {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      margin-top: 2%;
      justify-content: center;
      align-items: center;
    }

    .character-card {
      width: 300px;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .character-card:hover {
      transform: scale(1.03);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    }

    .character-card.selected {
      border: 2px solid #3f51b5;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
    }
  `]
})
export class CharacterListComponent {
  @Input() characters: Character[] = [];
  @Output() selectCharacter = new EventEmitter<any>();
  @Output() toggleFavorite = new EventEmitter<any>();

  selectedCharacter: Character | null = null;

  constructor(private favoritesService: FavoritesService) {}

  selectACharacter(character: Character) {
    this.selectedCharacter = this.selectedCharacter === character ? null : character;
    this.selectCharacter.emit(character);
  }

  toggleFavoriteTrigger(character: Character) {
    this.toggleFavorite.emit(character);
  }

  isFavorite(character: Character) {
    return this.favoritesService.isFavorite(character);
  }
}
