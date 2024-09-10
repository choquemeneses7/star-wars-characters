import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchFormComponent } from './search-form.component';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Store, StoreModule } from '@ngrx/store';
import { searchCharacters } from '../../store/character.actions';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;
  let store: MockStore;
  const initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        StoreModule.forRoot({}),
        SearchFormComponent,
        BrowserAnimationsModule,
        NoopAnimationsModule
      ],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with saved filters from localStorage', () => {
    const savedFilters = { name: 'Luke', gender: 'male' };
    localStorage.setItem('searchFilters', JSON.stringify(savedFilters));
  
    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  
    expect(component.searchForm.value).toEqual(savedFilters);
  });

  it('should dispatch searchCharacters action on form submit', () => {
    const searchFilters = { name: 'Leia', gender: 'female' };
    component.searchForm.setValue(searchFilters);

    spyOn(store, 'dispatch');
    component.onSubmit();

    expect(store.dispatch).toHaveBeenCalledWith(searchCharacters({ searchTerm: 'Leia', gender: 'female' }));
    expect(localStorage.getItem('searchFilters')).toEqual(JSON.stringify(searchFilters));
  });

  it('should set form values correctly when inputs are changed', () => {
    const nameInput = fixture.debugElement.query(By.css('input')).nativeElement;
    const genderSelect = fixture.debugElement.query(By.css('mat-select')).nativeElement;
  
    nameInput.value = 'Han Solo';
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  
    genderSelect.click();
    fixture.detectChanges();
  
    const genderOptions = fixture.debugElement.queryAll(By.css('mat-option'));
    genderOptions.forEach(option => {
      if (option.nativeElement.textContent.trim() === 'Male') {
        option.nativeElement.click();
        fixture.detectChanges();
      }
    });
  
    expect(component.searchForm.get('name')?.value).toBe('Han Solo');
    expect(component.searchForm.get('gender')?.value).toBe('male');
  });
});
