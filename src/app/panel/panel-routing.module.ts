import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarComponent } from './buscar/buscar.component';
import { CrearComponent } from './crear/crear.component';
import { HomePanelComponent } from './home-panel/home-panel.component';
import { ModificarComponent } from './modificar/modificar.component';
import { VisualizarComponent } from './visualizar/visualizar.component';
import { VotacionesComponent } from './votaciones/votaciones.component';
import { VotoComponent } from './voto/voto.component';

const routes: Routes = [
  { 
    path:'',
    component: HomePanelComponent, 
    children: [ 
      { path:'crear', component:CrearComponent },
      { path:'modificar/:id', component: ModificarComponent },
      { path:'ver', component: VisualizarComponent },
      { path:'tarjeta/:id', component: VotacionesComponent },
      { path: 'voto/:id', component: VotoComponent },
      { path: 'buscar', component: BuscarComponent },
      { path:'**', redirectTo: 'ver' }
     ]
  },
  {
    path:'**',
    redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
