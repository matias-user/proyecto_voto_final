import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items!: MenuItem[];
  data!: any;
  _isLog!: Observable<boolean> ;
  constructor( private authService: AuthService ) { }

  get isLog(){
    return this._isLog;
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Ingresa a tu Cuenta',
        routerLink: '/auth',
        icon: PrimeIcons.USER,
      },
      {
        label: 'Panel de Votaciones',
        routerLink: '/panel',
        icon: PrimeIcons.PENCIL,
      },
    ],
      this.data = {
        labels: [ `Pizza`, `Empanadas`, `Sushi`, `Arepas` ],
        datasets: [
          {
            data: [5, 3, 3, 2],
            backgroundColor: [
              "#288F61",
              "#32DB91",
              "#DB7527",
              "#0B3B8F",
              "##1D61DB"
            ],
            hoverBackgroundColor: [
              "#0B291C",
              "#1B754D",
              "#914E1A",
              "#0A327D",
              "#0B2352"
            ]
          }
        ]

      }
      this._isLog = this.authService.verificarSiLogeado();
  }
}
