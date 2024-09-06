import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CharacterService } from './services/character.service';
import { FavoritesService } from './services/favorites.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
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
      next: (characters: Character[]) => {
        this.characters = characters;
        this.applyFilters();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        // Manejo de errores
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
