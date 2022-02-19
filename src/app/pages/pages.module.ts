import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { PrimeNgModule } from '../primeng/prime-ng/prime-ng.module';
import { FormularioVotacionComponent } from './components/formulario-votacion/formulario-votacion.component';
import { GraficaComponent } from './components/grafica/grafica.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    FormularioVotacionComponent,
    GraficaComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule
  ],
  exports:[
    FormularioVotacionComponent
  ]
})
export class PagesModule { }
