import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingIndicatorComponent } from './loading-indicator.component';
import { LoadingIndicatorRoutingModule } from './loading-indicator-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoadingIndicatorRoutingModule,
    LoadingIndicatorComponent
  ]
})
export class LoadingIndicatorModule { }
