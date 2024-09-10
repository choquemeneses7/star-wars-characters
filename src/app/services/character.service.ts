  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { map, Observable } from 'rxjs';

  @Injectable({
    providedIn: 'root'
  })
  export class CharacterService {
    private apiUrl = 'https://swapi.dev/api/people/'; 

    constructor(private http: HttpClient) {}

    getCharacters(): Observable<any[]> {
      return this.http.get<any[]>(this.apiUrl).pipe(
        map((response: any) => response.results)
      );
    }
  }
