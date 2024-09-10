import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterDetailsComponent } from './character-details.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { Character } from '../../models/characters';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('CharacterDetailsComponent', () => {
  let component: CharacterDetailsComponent;
  let fixture: ComponentFixture<CharacterDetailsComponent>;
  let debugElement: DebugElement;

  const mockCharacter: Character = {
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
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatCardModule,
        MatDividerModule,
        CharacterDetailsComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterDetailsComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display character details when a character is provided', () => {
    component.character = mockCharacter;
    fixture.detectChanges();

    const cardTitle = debugElement.query(By.css('mat-card-title')).nativeElement.textContent;
    expect(cardTitle).toContain(mockCharacter.name);

    const paragraphs = debugElement.queryAll(By.css('p'));
    expect(paragraphs[0].nativeElement.textContent).toContain('Height: 172 cm');
    expect(paragraphs[1].nativeElement.textContent).toContain('Mass: 77 kg');
    expect(paragraphs[2].nativeElement.textContent).toContain('Hair Color: blond');
    expect(paragraphs[3].nativeElement.textContent).toContain('Skin Color: fair');
    expect(paragraphs[4].nativeElement.textContent).toContain('Eye Color: blue');
    expect(paragraphs[5].nativeElement.textContent).toContain('Birth Year: 19BBY');
    expect(paragraphs[6].nativeElement.textContent).toContain('Gender: male');
    expect(paragraphs[7].nativeElement.textContent).toContain('Homeworld: Tatooine');
  });

  it('should apply the villain-style class for female characters', () => {
    component.character = { ...mockCharacter, gender: 'female' };
    fixture.detectChanges();

    const matCard = debugElement.query(By.css('mat-card')).nativeElement;
    expect(matCard.classList).not.toContain('hero-style');
    expect(matCard.classList).toContain('villain-style');
  });

  it('should set isHeroOrVillain correctly on character change', () => {
    component.character = mockCharacter;
    component.ngOnChanges({
      character: {
        currentValue: mockCharacter,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true
      }
    });
    expect(component.isHeroOrVillain).toBeTrue();

    component.character = { ...mockCharacter, gender: 'female' };
    component.ngOnChanges({
      character: {
        currentValue: { ...mockCharacter, gender: 'female' },
        previousValue: mockCharacter,
        firstChange: false,
        isFirstChange: () => false
      }
    });
    expect(component.isHeroOrVillain).toBeFalse();
  });
});
