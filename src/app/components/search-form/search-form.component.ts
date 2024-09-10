import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { searchCharacters } from '../../store/character.actions';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-form',
  template: `
    <form [formGroup]="searchForm" (ngSubmit)="onSubmit()" class="search-form">
      <mat-form-field appearance="fill">
        <mat-label>Search by name</mat-label>
        <input matInput id="search" formControlName="name" placeholder="Search characters"/>
        <mat-icon
          matSuffix
          *ngIf="searchForm.get('name')?.value"
          (click)="clearSearch()"
          style="cursor: pointer;"
        >
          cancel
        </mat-icon>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Filter by gender</mat-label>
        <mat-select id="gender" formControlName="gender">
          <mat-option value="">All</mat-option>
          <mat-option value="male">Male</mat-option>
          <mat-option value="female">Female</mat-option>
          <mat-option value="n/a">N/A</mat-option>
        </mat-select>
      </mat-form-field>

      <button mat-raised-button color="primary" type="submit">Search</button>
    </form>
  `,
  styles: [
    `
      .search-form {
        display: flex;
        flex-direction: column;
        gap: 16px;
        max-width: 400px;
        margin: 0 auto;
      }
    `
  ],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    CommonModule
  ]
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

  clearSearch() {
    this.searchForm.get('name')?.setValue('');
  }
}
