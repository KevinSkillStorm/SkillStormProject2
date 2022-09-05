import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Device, DeviceDTO } from './devices';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {
  private devicesURL = `${environment.apiUrl}/Devices`;
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }

  constructor(
    private http: HttpClient,
  ) { }

  getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(this.devicesURL, this.httpOptions);
  }
  getDevice(id: number): Observable<Device> {
    var url = `${this.devicesURL}/${id}`
    return this.http.get<Device>(url, this.httpOptions);
  }
  getDeviceFromUser(id: number): Observable<Device[]> {
    let url = `${this.devicesURL}/Devices/${id}`;
    return this.http.get<Device[]>(url, this.httpOptions);
  }
  updateDevice(id: number, deviceDTO: DeviceDTO): Observable<Device> {   
    let url = `${this.devicesURL}/${id}`;
    return this.http.put<Device>(url, deviceDTO, this.httpOptions);
  }
  deleteDevice(id: number): Observable<Device> {
    var url = `${this.devicesURL}/${id}`
    console.log(url);
    return this.http.delete<Device>(url, this.httpOptions);
  }
  addDevice(deviceDTO: DeviceDTO): Observable<Device> {
    return this.http.post<Device>(this.devicesURL, deviceDTO, this.httpOptions);
  }
}
