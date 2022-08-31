
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable } from 'rxjs';
  
import { UserPlan } from './user-plans';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserPlansService {
  
  private apiURL = "https://localhost:7104/api/UserPlans";
    
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient, private route: ActivatedRoute) { }
  
  getUserPlans(): Observable<UserPlan[]> {
    return this.httpClient.get<UserPlan[]>(this.apiURL, this.httpOptions);
  }

  getUserPlan(id:number): Observable<UserPlan> {
    let url = `${this.apiURL}/${id}`;
    return this.httpClient.get<UserPlan>(url, this.httpOptions);
  }

  createUserPlan(userPlan:UserPlan): Observable<UserPlan> {
    return this.httpClient.post<UserPlan>(this.apiURL, userPlan, this.httpOptions)
  }  

  deleteUserPlan(id:number): Observable<UserPlan> {
    let url = `${this.apiURL}/${id}`
    return this.httpClient.delete<UserPlan>(url, this.httpOptions)
  }

}
