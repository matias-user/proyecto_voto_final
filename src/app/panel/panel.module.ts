import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelRoutingModule } from './panel-routing.module';
import { CrearComponent } from './crear/crear.component';
import { PrimeNgModule } from '../primeng/prime-ng/prime-ng.module';
import { HomePanelComponent } from './home-panel/home-panel.component';
import { PagesModule } from '../pages/pages.module';
import { ModificarComponent } from './modificar/modificar.component';
import { VisualizarComponent } from './visualizar/visualizar.component';
import { VotacionesComponent } from './votaciones/votaciones.component';
import { VotoComponent } from './voto/voto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BuscarComponent } from './buscar/buscar.component';

@NgModule({
  declarations: [
    CrearComponent,
    HomePanelComponent,
    ModificarComponent,
    VisualizarComponent,
    VotacionesComponent,
    VotoComponent,
    BuscarComponent
  ],
  imports: [
    CommonModule,
    PanelRoutingModule,
    PrimeNgModule,
    PagesModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PanelModule { }
