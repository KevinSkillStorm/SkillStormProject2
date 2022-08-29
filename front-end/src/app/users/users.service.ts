import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Users } from './users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersURL = '';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(
    private http: HttpClient,
  ) { }
  
  getUsers() : Observable<Users[]>{
    return this.http.get<Users[]>(this.usersURL, this.httpOptions);
  }
  getUser(id: number) : Observable<Users>{
    var url =`${this.usersURL}/${id}`;
    return this.http.get<Users>(this.usersURL, this.httpOptions);
  }

  

}
