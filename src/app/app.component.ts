  import { Component } from '@angular/core';
  import { RouterOutlet } from '@angular/router';
  import { CharacterService } from './services/character.service';
  import { FavoritesService } from './services/favorites.service';
  import { Character } from './models/characters';
  import { SearchFormComponent } from './components/search-form/search-form.component';
  import { CharacterDetailsComponent } from './components/character-details/character-details.component';
  import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
  import { CharacterListComponent } from './components/character-list/character-list.component';
  import { CommonModule } from '@angular/common';

  @Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, SearchFormComponent, CharacterDetailsComponent, LoadingIndicatorComponent, CharacterListComponent, CommonModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
  })
  export class AppComponent {
    title = 'star-wars-character-search';
    characters: Character[] = [];
    filteredCharacters:Character[] = [];
    selectedCharacter = null;
    loading = false;

    constructor(private characterService: CharacterService, private favoritesService: FavoritesService) {}

    ngOnInit() {
      this.loadCharacters();
      this.loadFiltersFromStorage();
    }

    loadCharacters() {
      this.loading = true;
      this.characterService.getCharacters().subscribe({
        next: (response: any) => {
          this.characters = response.results;
          this.applyFilters();
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    }

    onSearch(searchTerm: string) {
      this.applyFilters(searchTerm);
    }

    onFilter(filterOptions: any) {
      this.applyFilters('', filterOptions.gender);
    }

    applyFilters(searchTerm = '', genderFilter = '') {
      this.filteredCharacters = this.characters.filter(character => {
        const matchesName = character.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGender = genderFilter ? character.gender === genderFilter : true;
        return matchesName && matchesGender;
      });
    }

    onSelectCharacter(character: any) {
      this.selectedCharacter = character;
    }

    onToggleFavorite(character: any) {
      this.favoritesService.toggleFavorite(character);
    }

    loadFiltersFromStorage() {
      const filters = JSON.parse(localStorage.getItem('filters') || '{}');
      if (filters) {
        this.applyFilters(filters.name, filters.gender);
      }
    }

    exportToCSV() {
      const csvData = this.filteredCharacters.map(c => `${c.name},${c.gender},${c.height}`).join('\n');
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'characters.csv';
      a.click();
    }
  }
