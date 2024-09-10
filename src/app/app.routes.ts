import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/character-list/character-list.module').then(m => m.CharacterListModule)
  },
  {
    path: 'character-list',
    loadChildren: () => import('./components/character-list/character-list.module').then(m => m.CharacterListModule)
  },
  {
    path: 'character-details/:id',
    loadChildren: () => import('./components/character-details/character-details.module').then(m => m.CharacterDetailsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
