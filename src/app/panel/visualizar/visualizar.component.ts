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

    const longitudToken = token.length;
    const tokenSinComillas = token.slice( 1, longitudToken -1 );
    
    this.panelService.fetchObtenerEncuestas( tokenSinComillas ).pipe(
      tap( (result: any)  => {
        console.log(result);
        
        this.votacionesAbiertas = 
              result.encuestas.filter( (votacion:any) =>  votacion.estado == true );
              
      } )
    ) .subscribe( );
  }

}
