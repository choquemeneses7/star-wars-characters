import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Character } from './models/characters';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { CharacterDetailsComponent } from './components/character-details/character-details.component';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { FavoritesService } from './services/favorites.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let store: MockStore;
  let favoritesServiceSpy: jasmine.SpyObj<FavoritesService>;

  const mockCharacters: Character[] = [
    { name: 'Luke Skywalker', height: '172', mass: '77', hair_color: 'blond', skin_color: 'fair', eye_color: 'blue', birth_year: '19BBY', gender: 'male', homeworld: 'Tatooine', films: [], species: [], vehicles:[], starships: [], created: '2', edited: '12', url: 'x' }
  ];

  beforeEach(async () => {
    const favoritesServiceMock = jasmine.createSpyObj('FavoritesService', ['toggleFavorite', 'isFavorite']);

    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        CommonModule,
        RouterModule,
        StoreModule.forRoot({}),
        MatCardModule,
        MatButtonModule,
        BrowserAnimationsModule,
        LoadingIndicatorComponent,
        CharacterDetailsComponent,
        CharacterListComponent,
        SearchFormComponent
      ],
      providers: [
        provideMockStore({
          initialState: {
            characters: {
              filteredCharacters: mockCharacters,
              loading: false,
              error: null
            }
          },
          selectors: [
            { selector: 'selectFilteredCharacters', value: of(mockCharacters) },
            { selector: 'selectLoading', value: of(false) },
            { selector: 'selectError', value: of(null) }
          ]
        }),
        { provide: FavoritesService, useValue: favoritesServiceMock }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    favoritesServiceSpy = TestBed.inject(FavoritesService) as jasmine.SpyObj<FavoritesService>;

    favoritesServiceSpy.isFavorite.and.returnValue(true);

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should display character details when a character is selected', () => {
    component.selectedCharacter = mockCharacters[0];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-character-details')).not.toBeNull();
  });

  it('should dispatch loadCharacters action on init', () => {
    const spyDispatch = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(spyDispatch).toHaveBeenCalledWith(jasmine.objectContaining({ type: '[Character] Load Characters' }));
  });

  it('should export characters to CSV when exportToCSV is called', () => {
    spyOn(window.URL, 'createObjectURL').and.returnValue('blob:url');
    const anchorSpy = jasmine.createSpyObj('a', ['click']);
    
    spyOn(document, 'createElement').and.returnValue(anchorSpy);

    component.exportToCSV();
    expect(window.URL.createObjectURL).toHaveBeenCalled();
    expect(anchorSpy.click).toHaveBeenCalled();
  });
});
