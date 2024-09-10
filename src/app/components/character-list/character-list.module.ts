import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterListComponent } from './character-list.component';
import { CharacterListRoutingModule } from './character-list-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CharacterListRoutingModule,
    CharacterListComponent
  ]
})
export class CharacterListModule { }
