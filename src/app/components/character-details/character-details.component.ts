import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Character } from '../../models/characters';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-character-details',
  template: `
    <div #detailsContainer id="character-details" class="character-details-container">
      <mat-card *ngIf="character" [ngClass]="{'hero-style': isHeroOrVillain, 'villain-style': !isHeroOrVillain}">
        <mat-card-header>
          <mat-card-title>{{ character.name }}</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <p><strong>Height:</strong> {{ character.height }} cm</p>
          <mat-divider></mat-divider>
          <p><strong>Mass:</strong> {{ character.mass }} kg</p>
          <mat-divider></mat-divider>
          <p><strong>Hair Color:</strong> {{ character.hair_color }}</p>
          <mat-divider></mat-divider>
          <p><strong>Skin Color:</strong> {{ character.skin_color }}</p>
          <mat-divider></mat-divider>
          <p><strong>Eye Color:</strong> {{ character.eye_color }}</p>
          <mat-divider></mat-divider>
          <p><strong>Birth Year:</strong> {{ character.birth_year }}</p>
          <mat-divider></mat-divider>
          <p><strong>Gender:</strong> {{ character.gender }}</p>
          <mat-divider></mat-divider>
          <p><strong>Homeworld:</strong> {{ character.homeworld }}</p>
        </mat-card-content>
      </mat-card>
    <div #detailsContainer class="character-details-container">
  `,
  standalone: true,
  styles: [`
    .hero-style {
      background-color: #e0f7fa;
      border-left: 4px solid #0288d1;
    }

    .villain-style {
      background-color: #ffebee;
      border-left: 4px solid #d32f2f;
    }

    mat-card {
      margin: 20px;
      padding: 16px;
    }

    mat-card-title {
      font-size: 1.8rem;
      font-weight: bold;
    }

    p {
      margin: 8px 0;
    }

    mat-divider {
      margin: 8px 0;
    }
  `],
  imports: [CommonModule, MatCardModule, MatDividerModule]
})
export class CharacterDetailsComponent implements OnChanges {
  @Input() character: Character | null = null;
  
  isHeroOrVillain: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['character'] && this.character) {
      this.isHeroOrVillain = this.character.gender === 'male';
    }
  }
}
