import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [MessageService]
})
export class AuthComponent implements OnInit {

  bandera: boolean = false;

  constructor(private fb: FormBuilder,
              private AuthService: AuthService,
              private router: Router,
              private messageService: MessageService 
              ) { }

  formLogin: FormGroup = this.fb.group({
    correo: ['test3@test.cl', [Validators.required]],
    password: ['123456', [Validators.required]]
  });

  ngOnInit(): void {
  }
  activarToast(){

    this.messageService.add( {  severity:'error', summary: 'Contraseña o usuario incorrecto' } )
  }
  ingresar(){
    if( this.formLogin.invalid ){
      this.formLogin.markAllAsTouched();
      this.activarToast();
      return;
    }
    
    
    this.AuthService.fetchAuthLogin( this.formLogin.value).pipe(
      catchError( this.atrapaError ),
      tap( (result:any) => {
        this.AuthService.estaLogeado = true;
        localStorage.setItem('isLog', this.AuthService.estaLogeado.toString() )
        if( result.token){

          localStorage.setItem( 'x-token', result.token ),
          localStorage.setItem( '_id', result.usuario._id )

          this.router.navigateByUrl('/panel');
        }else{
          this.bandera = !this.bandera;;
          setTimeout(() => {
          this.bandera = !this.bandera;
            
          }, 2500 );
        }
      })
    ).subscribe();

  }
  campoEsValido( campo: string ){
    return this.formLogin.controls[campo].errors 
    && this.formLogin.controls[campo].touched;
  }
  atrapaError ( err: any ){
    console.warn( 'Error en ', err.message )
    return of([])
  }
}
