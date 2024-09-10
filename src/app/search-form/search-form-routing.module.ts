import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchFormComponent } from '../components/search-form/search-form.component';

const routes: Routes = [{
  path: '',
  component: SearchFormComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchFormRoutingModule { }
