import { UnaryLike } from './../../../node_modules/@babel/types/lib/index-legacy.d';
import {HttpClient, HttpHandler, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import { InspectionApiService } from '../inspection-api.service';

const httOption = {
  headers: new HttpHeaders({
    "Content-Type": "application/json; charset=utf-8",
  })
};

@Injectable({providedIn: 'root'})


export class InspectionService {

  private urlinspection: string = environment.url;
  constructor(private http:HttpClient){}

  getInspecytion():Observable<any[]>{
    return this.http.get<any>(this.urlinspection +'Inspection')
  }
  getIspectionid(id:any){
    return this.http.get(this.urlinspection + `Inspection/${id}`);
  }
  addInspection(data: any){
    return this.http.post(this.urlinspection + 'Inspection', data);
  }
  updateInspection(id: number, data: any){
    return this.http.put(this.urlinspection + `Inspection/${id}`, data);
  }
  deleteinspection(id:any){
    return this.http.delete(this.urlinspection + `Inspection/${id}`);
  }

  //Inspection Types
  getInspectionTypesList():Observable<any[]> {
    return this.http.get<any>(this.urlinspection + 'InspectionType');
  }
  addInspectionTypes(data: any){
      return this.http.put(this.urlinspection + 'InspectionType', data );
  }
  updateInspectionTypes(id: any, data: any){
    return this.http.delete(this.urlinspection + `InspectionType/${id}`, data);
  }
  deleteInspectionTypes(id:number|string){
    return this.http.delete(this.urlinspection + `InspectionType/${id}`);
  }


  //Status

  getStatusLis():Observable<any[]> {
      return this.http.get<any>(this.urlinspection + 'Status');
  }

  addStatus(data:any){
    return this.http.post(this.urlinspection + 'Status/', data);
  }
  updateStatus(id: any, data:any){
     return this.http.put(this.urlinspection + `Status/${id}`, data);
  }
  deleteStatus(id: any){
    return this.http.delete(this.urlinspection + `Status/${id}`);
  }

}
