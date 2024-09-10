import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterListComponent } from './character-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import { Character } from '../../models/characters';

describe('CharacterListComponent', () => {
  let component: CharacterListComponent;
  let fixture: ComponentFixture<CharacterListComponent>;
  let debugElement: DebugElement;
  let mockFavoritesService: jasmine.SpyObj<FavoritesService>;

  const mockCharacters: Character[] = [
    {
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
    },
    {
      name: 'Leia Organa',
      height: '150',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'female',
      homeworld: 'Tatooine',
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: '2',
      edited: '12',
      url: 'x'
    }
  ];

  beforeEach(async () => {
    mockFavoritesService = jasmine.createSpyObj('FavoritesService', ['isFavorite']);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        CharacterListComponent
      ],
      providers: [
        { provide: FavoritesService, useValue: mockFavoritesService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterListComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    component.characters = mockCharacters;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the list of characters', () => {
    const characterCards = debugElement.queryAll(By.css('.character-card'));
    expect(characterCards.length).toBe(mockCharacters.length);
    
    const firstCardTitle = characterCards[0].query(By.css('mat-card-title')).nativeElement.textContent;
    expect(firstCardTitle).toContain(mockCharacters[0].name);

    const firstCardSubtitle = characterCards[0].query(By.css('mat-card-subtitle')).nativeElement.textContent;
    expect(firstCardSubtitle).toContain(mockCharacters[0].gender);
  });

  it('should emit selectCharacter when a character card is clicked', () => {
    spyOn(component.selectCharacter, 'emit');
    const characterCard = debugElement.query(By.css('.character-card'));
    characterCard.triggerEventHandler('click', null);
    expect(component.selectCharacter.emit).toHaveBeenCalledWith(mockCharacters[0]);
  });

  it('should emit toggleFavorite when the favorite button is clicked', () => {
    spyOn(component.toggleFavorite, 'emit');
    const favoriteButton = debugElement.query(By.css('button[mat-icon-button]'));
    favoriteButton.triggerEventHandler('click', null);
    expect(component.toggleFavorite.emit).toHaveBeenCalledWith(mockCharacters[0]);
  });

  it('should display correct favorite icon based on isFavorite', () => {
    mockFavoritesService.isFavorite.and.returnValue(true);
    fixture.detectChanges();
    const favoriteIcon = debugElement.query(By.css('mat-icon')).nativeElement.textContent;
    expect(favoriteIcon).toBe('favorite');

    mockFavoritesService.isFavorite.and.returnValue(false);
    fixture.detectChanges();
    expect(debugElement.query(By.css('mat-icon')).nativeElement.textContent).toBe('favorite_border');
  });
});
