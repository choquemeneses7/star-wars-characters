import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-character-details',
  template: `
    <div *ngIf="character">
      <h2>{{ character.name }}</h2>
      <p><strong>Gender:</strong> {{ character.gender }}</p>
      <p><strong>Height:</strong> {{ character.height }}</p>
      <p><strong>Homeworld:</strong> {{ character.homeworld }}</p>
    </div>
  `,
  standalone: true
})
export class CharacterDetailsComponent {
  @Input() character: any;
}
