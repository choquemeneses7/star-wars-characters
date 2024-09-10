import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFormComponent } from '../components/search-form/search-form.component';
import { SearchFormRoutingModule } from './search-form-routing.module';
import { Routes } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SearchFormRoutingModule,
  ]
})
export class SearchFormModule { }
