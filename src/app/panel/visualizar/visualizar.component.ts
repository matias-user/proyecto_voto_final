import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { PanelService } from '../panel.service';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.component.html',
  styleUrls: ['./visualizar.component.css']
})
export class VisualizarComponent implements OnInit {
  votacionesAbiertas: any = [];
  
  constructor( private panelService: PanelService) { }

  ngOnInit(): void {
    const token = JSON.stringify( localStorage.getItem('x-token') );
    const uid = JSON.stringify( localStorage.getItem('_id') );

    this.panelService.fetchObtenerEncuestas( token ).pipe(
      tap( (result: any)  => {
        this.votacionesAbiertas = 
              result.encuestas.filter( (votacion:any) => votacion.isAbierta == true );
      } )
    ) .subscribe( );
  }

}
