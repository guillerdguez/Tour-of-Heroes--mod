import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Villain } from '../Model/Domain/villain';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class villainDAO {
  private villainsUrl = 'api/villains';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  /////////// CREATE methods ///////////

  addVillain(villain: Villain): Observable<Villain> {
    return this.http.post<Villain>(this.villainsUrl, villain, this.httpOptions);
  }

  /////////// READ methods ///////////

  getVillains(): Observable<Villain[]> {
    return this.http.get<Villain[]>(this.villainsUrl);
  }

  getVillainNo404<Data>(id: number): Observable<Villain> {
    const url = `${this.villainsUrl}/?id=${id}`;
    return this.http.get<Villain>(url);
  }

  getVillain(id: number): Observable<Villain> {
    const url = `${this.villainsUrl}/${id}`;
    return this.http.get<Villain>(url);
  }

  searchVillains(term: string): Observable<Villain[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Villain[]>(`${this.villainsUrl}/?name=${term}`);
  }

  /////////// UPDATE methods ///////////

  updateVillain(villain: Villain): Observable<any> {
    return this.http.put(this.villainsUrl, villain, this.httpOptions);
  }
  /////////// DELETE methods ///////////

  deleteVillain(id: number): Observable<Villain> {
    const url = `${this.villainsUrl}/${id}`;

    return this.http.delete<Villain>(url, this.httpOptions);
  }
}
