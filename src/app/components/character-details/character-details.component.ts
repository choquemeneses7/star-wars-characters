import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Character } from '../../models/characters';


@Component({
  selector: 'app-character-details',
  template: `
    <div *ngIf="character" [ngClass]="{'hero-style': isHeroOrVillain, 'villain-style': !isHeroOrVillain}">
      <h2>{{ character.name }}</h2>
      <p>Height: {{ character.height }}</p>
      <p>Mass: {{ character.mass }}</p>
      <p>Hair Color: {{ character.hair_color }}</p>
      <p>Skin Color: {{ character.skin_color }}</p>
      <p>Eye Color: {{ character.eye_color }}</p>
      <p>Birth Year: {{ character.birth_year }}</p>
      <p>Gender: {{ character.gender }}</p>
      <p>Homeworld: {{ character.homeworld }}</p>
    </div>
  `,
  standalone: true,
  styleUrls: ['./character-details.component.css'],
  imports: [CommonModule]
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
