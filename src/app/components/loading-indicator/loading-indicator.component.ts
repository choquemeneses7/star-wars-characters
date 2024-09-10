import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-indicator',
  template: `
    <div class="loading-container">
      <mat-spinner></mat-spinner>
      <p>Loading...</p>
    </div>
  `,
  standalone: true,
  imports: [MatProgressSpinnerModule],
  styles: [`
    .loading-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    mat-spinner {
      margin-bottom: 16px;
    }

    p {
      font-size: 1.2rem;
      color: #555;
    }
  `]
})
export class LoadingIndicatorComponent {}
