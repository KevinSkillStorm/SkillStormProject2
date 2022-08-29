import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Devices, DevicesDTO } from './devices';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {
  private devicesURL = '';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }

  constructor(
    private http: HttpClient,
  ) { }

  getDevices(): Observable<Devices[]>{
    return this.http.get<Devices[]>(this.devicesURL, this.httpOptions);
  }

  getDevice(id: number): Observable<Devices>{
    var url = `${this.devicesURL}/${id}`
    return this.http.get<Devices>(url, this.httpOptions);
  }

  deleteDevice(id: number): Observable<Devices>{
    var url = `${this.devicesURL}/${id}`
    return this.http.delete<Devices>(url);
  }
  
  addDevice(devicesDTO: DevicesDTO): Observable<Devices>{
    return this.http.post<Devices>(this.devicesURL, devicesDTO);
  }

}
