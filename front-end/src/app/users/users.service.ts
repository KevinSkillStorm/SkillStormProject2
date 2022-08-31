import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from './users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersURL = 'https://localhost:7104/api/Users';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(
    private http: HttpClient,
  ) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersURL, this.httpOptions);
  }
  getUser(id: number): Observable<User> {
    var url = `${this.usersURL}/${id}`;
    return this.http.get<User>(url, this.httpOptions);
  }
}
