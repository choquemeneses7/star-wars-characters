import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingIndicatorComponent } from './loading-indicator.component';

const routes: Routes = [{
  path: '',
  component: LoadingIndicatorComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoadingIndicatorRoutingModule { }
