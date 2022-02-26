import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Encuesta } from '../interfaces/encuesta.interface';

@Injectable({
  providedIn: 'root'
})
export class PanelService {

  url: string = environment.urlApis + 'api/encuestas/';

  constructor( private http: HttpClient ) { }

  fetchCrearEncuesta( body: Encuesta, token: string | null | any){

    // El token viene de localStorage
    return this.http.post( this.url, body, 
      { headers: {
      'x-token': token 
    } }
     );
  }
  fetchObtenerEncuestas( token: string ){
    
    return this.http.get( this.url ,  { headers: { 'x-token': token }} );
  }
  fetchUnaEncuesta( _id: string ){    
    return this.http.get( this.url  + _id );
  }
  votar( _id:string, value: string ){
    return this.http.put( this.url + `/${_id}/${value }`, value );
  }
  fetchBorrarEncuesta( uid: string ){
    return this.http.delete( this.url + uid );
  }
}
