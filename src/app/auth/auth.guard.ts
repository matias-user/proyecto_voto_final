import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor( private authService: AuthService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
      


      return true
      // return this.authService.verificarSiLogeado();
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean > | boolean {      
      
      return true
      // return this.authService.verificarSiLogeado();
      // return this.authService.

  }
}
