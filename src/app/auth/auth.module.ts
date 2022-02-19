import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth/auth.component';
import { PrimeNgModule } from '../primeng/prime-ng/prime-ng.module';
import { RegistroComponent } from './registro/registro.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AuthComponent,
    RegistroComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule,
    
  ]
})
export class AuthModule { }
