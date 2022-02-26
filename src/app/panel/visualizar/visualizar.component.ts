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
  votacionesCerradas: any[] = [];
  fechaHoy!: number;

  constructor( private panelService: PanelService) { }

  ngOnInit(): void {
    const token = JSON.stringify( localStorage.getItem('x-token') );

    const longitudToken = token.length;
    const tokenSinComillas = token.slice( 1, longitudToken -1 );
    
    this.panelService.fetchObtenerEncuestas( tokenSinComillas ).pipe(
      tap( (result: any)  => {
        
        this.fechaHoy = Number( new Date( Date.now() ).getTime() ) ;
        result.encuestas.forEach( (result:any) => {
          console.log( `Este es el de la encuesta ${Number( new Date(result.fin ).getTime() )} y este hoy ${this.fechaHoy}` );
          
          console.log(  Number( new Date(result.fin ).getTime() )  < this.fechaHoy && result.estado && result.fin ? true: false  );
        } )

        
        this.votacionesAbiertas = 
        
              result.encuestas.filter( (votacion:any) => {
                // votacion.estado 
                
                if( Number( new Date(votacion.fin ).getTime() )  > this.fechaHoy && votacion.estado && votacion.fin ){
                  return votacion 
                }
              } );
            this.votacionesCerradas = result.encuestas.filter( (votacion:any) => {
              
              if( Number( new Date(votacion.fin ).getTime() )  < this.fechaHoy && votacion.estado && votacion.fin ){
                return votacion 
              }
            } );
              
      } )
    ) .subscribe( );
  }

}
