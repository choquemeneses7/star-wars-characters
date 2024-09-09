import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { searchCharacters } from '../../store/character.actions';

@Component({
  selector: 'app-search-form',
  template: `
    <form [formGroup]="searchForm" (ngSubmit)="onSubmit()">
      <label for="search">Search by name:</label>
      <input id="search" formControlName="name" placeholder="Search characters" />

      <label for="gender">Filter by gender:</label>
      <select id="gender" formControlName="gender">
        <option value="">All</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="n/a">N/A</option>
      </select>

      <button type="submit">Search</button>
    </form>
  `,
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class SearchFormComponent implements OnInit {
  searchForm = new FormGroup({
    name: new FormControl(''),
    gender: new FormControl('')
  });

  constructor(private store: Store) {}

  ngOnInit() {
    const savedFilters = localStorage.getItem('searchFilters');
    if (savedFilters) {
      this.searchForm.setValue(JSON.parse(savedFilters));
    }
  }

  onSubmit() {
    const { name, gender } = this.searchForm.value;
    this.store.dispatch(searchCharacters({ searchTerm: name || "", gender: gender || "" }));
    localStorage.setItem('searchFilters', JSON.stringify(this.searchForm.value));
  }
}
