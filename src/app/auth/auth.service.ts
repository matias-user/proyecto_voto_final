import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root',
  
})
export class AuthService {

  estaLogeado: boolean = false;

  pathApiUsuarios: string = 'api/usuarios';
  pathApiLogin: string = 'api/auth';

  constructor(private http: HttpClient ) { }

  fetchApiUsuariosCrear( body: Usuario ){
    return this.http.post( environment.urlApis + this.pathApiUsuarios, body );
  }
  fetchAuthLogin( body: any ){
    return this.http.post( environment.urlApis + this.pathApiLogin, body);
  }
  verificarSiLogeado(): Observable<boolean> {
    if(!localStorage.getItem('isLog')){
      console.log('No estas logueado para ingresar');
      return of(false);
      
    }
    return of( true ) 

  }
}
