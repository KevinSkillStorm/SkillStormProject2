import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Device, DeviceDTO } from './devices';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {
  private devicesURL = 'https://localhost:7104/api/Devices';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }

  constructor(
    private http: HttpClient,
  ) { }

  getDevices(): Observable<Device[]>{
    return this.http.get<Device[]>(this.devicesURL, this.httpOptions);
  }
  getDevice(id: number): Observable<Device>{
    var url = `${this.devicesURL}/${id}`
    return this.http.get<Device>(url, this.httpOptions);
  }
  deleteDevice(id: number): Observable<Device>{
    var url = `${this.devicesURL}/${id}`
    return this.http.delete<Device>(url);
  }  
  addDevice(deviceDTO: DeviceDTO): Observable<Device>{
    return this.http.post<Device>(this.devicesURL, deviceDTO);
  }
}
