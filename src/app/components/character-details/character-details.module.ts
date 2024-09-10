import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterDetailsComponent } from './character-details.component';
import { CharacterDetailsRoutingModule } from './character-details-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CharacterDetailsRoutingModule,
    CharacterDetailsComponent
  ]
})
export class CharacterDetailsModule { }
