import { Component, Input, OnInit } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-home-panel',
  templateUrl: './home-panel.component.html',
  styleUrls: ['./home-panel.component.css']
})
export class HomePanelComponent implements OnInit {

  items!: MenuItem[];
  
  constructor( private authService: AuthService) { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Inicio',
        routerLink: '/',
        icon: PrimeIcons.HOME
      },
      {
        label:'Crear votación',
        routerLink:'/panel/crear',
        icon: PrimeIcons.PLUS
      },
      {
        label:'Visualizar Votaciones',
        routerLink: '/panel/ver',
        icon: PrimeIcons.EYE

      },
      {
        label:'Buscar una Votacion',
        routerLink: '/panel/buscar',
        icon: PrimeIcons.SEARCH
      },
      {
          label: 'Cerrar sesión',
          routerLink: '/auth/login',
          icon: PrimeIcons.SIGN_OUT,
          command: () => {
            this.authService.estaLogeado = false;
            localStorage.clear()
          } 
      },
    ];
  }

}
