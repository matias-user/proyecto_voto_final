import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path:'inicio',
    loadChildren: () => import('./pages/pages.module').then( m => m.PagesModule ),
    pathMatch:'full'
  },
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
  },
  {
    path:'panel',
    loadChildren: () => import('./panel/panel.module').then( m => m.PanelModule ),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path:'**',
    redirectTo:'inicio'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
