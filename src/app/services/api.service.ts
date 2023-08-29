import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getEquations(): Observable<any[]> {
    const url = `${this.baseUrl}/api/equations`;
    console.log("test",this.http.get<any[]>(url));
    return this.http.get<any[]>(url);
    
  }
}
