import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { CharacterDetailsComponent } from './components/character-details/character-details.component';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Character } from './models/characters';
import { loadCharacters, filterCharacters, searchCharacters } from './store/character.actions';
import { selectFilteredCharacters, selectLoading, selectError } from './store/character.selectors';
import { FavoritesService } from './services/favorites.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SearchFormComponent, CharacterDetailsComponent, LoadingIndicatorComponent, CharacterListComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'star-wars-character-search';
  characters$: Observable<Character[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  selectedCharacter: Character | null = null;

  constructor(private store: Store, private favoritesService: FavoritesService) {
    this.characters$ = this.store.select(selectFilteredCharacters);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit() {
    this.store.dispatch(loadCharacters());
    const savedFilters = localStorage.getItem('searchFilters');
    if (savedFilters) {
      const { name, gender } = JSON.parse(savedFilters);
      console.log("savedFilters: ", savedFilters)
      this.store.dispatch(searchCharacters({ searchTerm: name, gender }));
    }
  }

  onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.store.dispatch(filterCharacters({ searchTerm }));
    localStorage.setItem('searchFilters', JSON.stringify({ searchTerm }));
  }

  onFilter(filterOptions: any) {
    this.store.dispatch(filterCharacters(filterOptions));
    localStorage.setItem('searchFilters', JSON.stringify(filterOptions));
  }

  onSelectCharacter(character: Character) {
    console.log("selecteddd");
    this.selectedCharacter = character;
  }

  onToggleFavorite(character: Character) {
    this.favoritesService.toggleFavorite(character);
  }

  exportToCSV() {
    this.characters$.subscribe(characters => {
      const csvData = characters.map(c => `${c.name},${c.gender},${c.height}`).join('\n');
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'characters.csv';
      a.click();
    });
  }
}
