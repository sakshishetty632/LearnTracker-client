import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Works with standalone components
})
export class ApiService {
  private baseUrl = 'https://learntracker-server.onrender.com/api/student-progress'; // Updated backend URL

  constructor(private http: HttpClient) {
  }

  // Submit a new request (POST)
  submitRequest(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data);
  }

  // Get all requests (GET)
  getRequests(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // Update an existing request (PUT)
  updateRequest(reqId: string, updatedData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${reqId}`, updatedData);
  }

  // Delete a request (DELETE)
  deleteRequest(reqId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${reqId}`);
  }
}
