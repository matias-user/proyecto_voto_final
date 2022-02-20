import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor( private authService: AuthService,
              private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
      
      return this.authService.verificarSiLogeado().pipe(
        tap( isAutenticado => !isAutenticado ? this.router.navigateByUrl('/inicio') : '')
      )
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean > | boolean {      
      
      return this.authService.verificarSiLogeado().pipe(
        tap( isAutenticado => !isAutenticado ? this.router.navigateByUrl('/inicio') : '')
      )

  }
}
