import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Plans, PlansDTO } from './plans';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlansService {
  private plansURL = '';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(
    private http: HttpClient,
  ) { }

  getPlans():Observable<Plans[]>{
    return this.http.get<Plans[]>(this.plansURL, this.httpOptions);
  }

  getPlan(id: number): Observable<Plans>{
    var url = `${this.plansURL}/${id}`;
    return this.http.get<Plans>(url, this.httpOptions);
  }

  deletePlan(id: number) : Observable<Plans>{
    var url = `${this.plansURL}/${id}`;
    return this.http.delete<Plans>(url);
  }

  addPlan(plansDTO: PlansDTO): Observable<Plans>{
    return this.http.post<Plans>(this.plansURL, this.httpOptions);
  }

}
