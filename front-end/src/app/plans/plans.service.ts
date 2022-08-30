import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Plan, PlanDTO } from './plans';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlansService {
  private planURL = '';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(
    private http: HttpClient,
  ) { }

  getPlans():Observable<Plan[]>{
    return this.http.get<Plan[]>(this.planURL, this.httpOptions);
  }
  getPlan(id: number): Observable<Plan>{
    var url = `${this.planURL}/${id}`;
    return this.http.get<Plan>(url, this.httpOptions);
  }
  deletePlan(id: number) : Observable<Plan>{
    var url = `${this.planURL}/${id}`;
    return this.http.delete<Plan>(url);
  }
  addPlan(planDTO: PlanDTO): Observable<Plan>{
    return this.http.post<Plan>(this.planURL, planDTO);
  }
}
