import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [
  { path:'ingreso', component: AuthComponent },
  { path:'registro', component: RegistroComponent },
  { path: '**', redirectTo: 'ingreso' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
