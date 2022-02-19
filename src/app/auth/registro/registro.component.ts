import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MessageService} from 'primeng/api';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [MessageService]
})
export class RegistroComponent implements OnInit {

  generoOpciones!: any[];
  msgs:any = [];
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private messageService: MessageService
              ) { }

  formRegistro: FormGroup = this.fb.group({
    correo: [ 'test@test.cl', [ Validators.required ] ],
    nombre: [ 'test', [ Validators.required ] ],
    password: [ '123456', [ Validators.required ] ],
    rut: [ '12312312', [ Validators.required ] ],
    edad: [ '25', [ Validators.required ] ],
    genero: [ 'masculino', [ Validators.required ] ],

  })

  ngOnInit(): void {
    this.generoOpciones = [
      { label:'Masculino', value:'masculino' },
      { label:'Femenino', value:'femenino' },
    ]
  }
  campoEsValido( campo: string ){
    return this.formRegistro.controls[campo].errors 
    && this.formRegistro.controls[campo].touched;
  }
  crearCuenta(){
    if( this.formRegistro.invalid ){
      this.formRegistro.markAllAsTouched();
      return;
    }
    // const { correo, nombre, password } = this.formRegistro.value;
    try {
      
      this.authService.fetchApiUsuariosCrear( this.formRegistro.value ).subscribe( console.log );
      this.addSingle();
      // this.router.navigateByUrl('/auth')
    } catch (error) {
      console.log(error);
      
    }
  }
  // Agregar toast
  addSingle() {
    this.messageService.add({severity:'success', summary:'Cuenta creada exitosamente.' });
  }
}
