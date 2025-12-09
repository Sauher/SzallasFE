import { Injectable } from '@angular/core';
import axios from 'axios';
import { ApiResponse } from '../interfaces/apiresponse';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class APIService {

  SERVER = environment.serverUrl;

  constructor() { }

  async sendMail(data:object):Promise<ApiResponse>{
    try{
      const res = await axios.post(`${this.SERVER}/sendmail`,data)
    return {
      status:200,
      message: res.data.message
    }
    }
    catch (err : any){
      return {
        status:500,
        message: "Hiba történt az adatok lekéréskor"
      }
    }
  }

  async Registration(table: string, data: any){
    try{
      const response = await axios.post(`${this.SERVER}/${table}/registration`, data);
      return {
        status: 200,
        message: 'A regisztráció sikeres! Most már beléphetsz!',
        data: response.data   // nem kötelező visszaköldeni
      };
    }catch(err: any){
      return {
        status: 500,
        message: err.response.data.error
      };
    }
  }

  async Login(table: string, data: any){
    try{
      const response = await axios.post(`${this.SERVER}/${table}/login`, data);
      return {
        status: 200,
        message: 'Sikeres belépés!',
        data: response.data   // nem kötelező visszaköldeni
      };
    }catch(err: any){
      return {
        status: 500,
        message: err.response.data.error
      };
    }
  }

  async Upload(formData: FormData): Promise<ApiResponse>{
    try{
      const response = await axios.post(`${this.SERVER}/upload`, formData);
      return {
        status: 200,
        data: response.data
      };
    }catch(error: any){
      return {
        status: 500,
        message: 'Nem sikerült a fájl feltöltése!'
      };
    }
  }

  async deleteImage(filename: string): Promise<ApiResponse> {
    try{
      const response = await axios.delete(`${this.SERVER}/image/${filename}`);
      return {
        status: 200,
        data: response.data
      };
    }catch(error: any){
      return {
        status: 500,
        message: 'Nem sikerült a fájl törlése!'
      };
    }
  }

  // GET ALL record from 'table'  -> GET http://localhost:3000/users

  async SelectAll(table: string):Promise<ApiResponse>{
    try{
      const response = await axios.get(`${this.SERVER}/${table}`);
      return {
        status: 200,
        data: response.data
      };
    }catch(error: any){
      return {
        status: 500,
        message: 'Hiba történt az adatok elérésekor!'
      };
    }
  }

  // GET ONE record from 'table' by 'id'  -> GET http://localhost:3000/users/5

  async Select(table: string, id: number):Promise<ApiResponse>{
    try{
      const response = await axios.get(`${this.SERVER}/${table}/${id}`);
      return {
        status: 200,
        data: response.data
      };
    }catch(error: any){
      return {
        status: 500,
        message: 'Hiba történt az adatok elérésekor!'
      };
    }
  }

  // POST new record to 'table'  -> POST http://localhost:3000/users

  async Insert(table: string, data: any){
    try{
      const response = await axios.post(`${this.SERVER}/${table}`, data);
      return {
        status: 200,
        message: 'A rekord felvéve!',
        data: response.data   // nem kötelező visszaköldeni
      };
    }catch(error: any){
      return {
        status: 500,
        message: 'Hiba történt a művelet során!'
      };
    }
  }

  // UPDATE record from 'table' by 'id'  -> PATCH http://localhost:3000/users/5

  async Update(table:string, id: number, data:any){
    try{
      const response = await axios.patch(`${this.SERVER}/${table}/${id}`, data);
      return {
        status: 200,
        message: 'A rekord módosítva!',
        data: response.data   // nem kötelező visszaköldeni
      };
    }catch(error: any){
      return {
        status: 500,
        message: 'Hiba történt a művelet során!'
      };
    }
  }

  // DELETE ONE record from 'table' by 'id'  -> DELETE http://localhost:3000/users/5

  async Delete(table:string, id: number){
    try{
      const response = await axios.delete(`${this.SERVER}/${table}/${id}`);
      return {
        status: 200,
        message: 'A rekord törölve a táblából!'
      };
    }catch(error: any){
      return {
        status: 500,
        message: 'Hiba történt a művelet során!'
      };
    }
  }

  // DELETE ALL!!! record from 'table'  -> DELETE http://localhost:3000/users

  async DeleteAll(table: string){
    try{
      const response = await axios.delete(`${this.SERVER}/${table}`);
      return {
        status: 200,
        message: 'Összes rekord törölve a táblából!'
      };
    }catch(error: any){
      return {
        status: 500,
        message: 'Hiba történt a művelet során!'
      };
    }
  }

}
