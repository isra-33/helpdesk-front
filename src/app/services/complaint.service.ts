import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/category`);
  }

  getComplaints(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/complaints`);
  }

  getStatuses(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/status`);
  }

  save(complaint: any): Observable<any> {
    return this.http.post<any>(`${API_URL}/complaints`, complaint);
  }
  deleteData(id: string): Observable<any> {
    return this.http.delete(`${API_URL}/complaints/${id}`);
  }

  getClients(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/client`);
  }
  
}
