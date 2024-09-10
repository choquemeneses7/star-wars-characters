import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingIndicatorComponent } from './loading-indicator.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('LoadingIndicatorComponent', () => {
  let component: LoadingIndicatorComponent;
  let fixture: ComponentFixture<LoadingIndicatorComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatProgressSpinnerModule,
        LoadingIndicatorComponent
      ]
    }).overrideComponent(LoadingIndicatorComponent, {
      set: {
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
      }
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingIndicatorComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the loading spinner and text', () => {
    const spinner = debugElement.query(By.css('mat-spinner'));
    const text = debugElement.query(By.css('p')).nativeElement.textContent;

    expect(spinner).toBeTruthy();
    expect(text).toBe('Loading...');
  });

  it('should apply the correct CSS class', () => {
    const container = debugElement.query(By.css('.loading-container')).nativeElement;
    
    expect(container.classList).toContain('loading-container');
  });
});
