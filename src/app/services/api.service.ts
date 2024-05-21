import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://ovidiupopa.xyz';
  constructor(private http: HttpClient) {}

  getEquations(): Observable<any[]> {
    const url = `${this.baseUrl}/api/equations`;
    return this.http.get<any[]>(url);
  }

  getEquationByUrlLink(urlLink: string): Observable<any> {
    const url = `${this.baseUrl}/api/equations/${urlLink}`;
    return this.http.get<any>(url);
  }
}
