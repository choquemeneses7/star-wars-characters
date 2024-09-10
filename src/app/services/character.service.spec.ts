import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CharacterService } from './character.service';

describe('CharacterService', () => {
  let service: CharacterService;
  let httpMock: HttpTestingController;
  const apiUrl = 'https://swapi.dev/api/people/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CharacterService]
    });

    service = TestBed.inject(CharacterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve characters from the API via GET', () => {
    const dummyCharacters = [
      { name: 'Luke Skywalker' },
      { name: 'Darth Vader' }
    ];

    service.getCharacters().subscribe(characters => {
      expect(characters.length).toBe(2);
      expect(characters).toEqual(dummyCharacters);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush({ results: dummyCharacters });
  });

  it('should handle errors gracefully', () => {
    service.getCharacters().subscribe({
      next: () => fail('should have failed with a 500 error'),
      error: (error) => {
        expect(error.status).toBe(500);
      }
    });

    const req = httpMock.expectOne(apiUrl);
    req.flush('Something went wrong', { status: 500, statusText: 'Server Error' });
  });
});
