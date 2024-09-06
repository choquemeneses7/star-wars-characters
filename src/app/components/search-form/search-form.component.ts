import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
export class SearchFormComponent {
  @Output() search = new EventEmitter<string>();
  @Output() filter = new EventEmitter<any>();

  searchForm = new FormGroup({
    name: new FormControl(''),
    gender: new FormControl('')
  });

  onSubmit() {
    const { name, gender } = this.searchForm.value;
    this.search.emit(name || "");
    this.filter.emit({ gender });
  }
}
