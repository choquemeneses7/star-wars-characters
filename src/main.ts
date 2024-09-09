import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { characterReducer } from './app/store/character.reducer';
import { CharacterEffects } from './app/store/character.effects';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      HttpClientModule,
      StoreModule.forRoot({ characters: characterReducer }),
      EffectsModule.forRoot([CharacterEffects])
    )
  ]
}).catch(err => console.error(err));
