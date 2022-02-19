import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';
import { Encuesta } from 'src/app/interfaces/encuesta.interface';
import { PanelService } from '../panel.service';

@Component({
  selector: 'app-votaciones',
  templateUrl: './votaciones.component.html',
  styleUrls: ['./votaciones.component.css']
})
export class VotacionesComponent implements OnInit {
  multiAxisData: any;
  id!: string;
  votacion!: Encuesta;
  cantidadVotaciones!: number;
  votacionMasVotada!: string;
  datosVotaciones: any;

  @Input() labelsInput!: string[];
  @Input() dataInput!: number[];
  @Input() backGroundInput!: string[];
  
  constructor( private route: ActivatedRoute,
                private panelService: PanelService ) {
    // capturando id en routeParams y luego haciendo fetch a encuesta por id
    this.route.params.pipe(
        map(p => p.id),
        tap( _id => {
          this.id = _id
          this.contarMayorVotos( _id )
        }  )
        ).subscribe(  );

    this.panelService.fetchUnaEncuesta( this.id ).pipe(
      tap( ( result: any ) => {
        this.votacion = result.encuestas
        this.cantidadVotaciones = result.encuestas.votos.length;

      }  
      ),

    ).subscribe( )
    
   }

  ngOnInit(): void {
    
  
  }
  contarMayorVotos( id: string ){
    this.panelService.fetchUnaEncuesta( id ).pipe( 
      pluck( 'encuestas','votos' ),
      tap( (arr:any)  => {       
        // Convierte en un objeto
        const ObjNuevo = arr.reduce( 
          (acc:any, valor:any) => ( acc[valor] ? acc[valor] += 1 : acc[valor] = 1, acc), {} );

        let mayor = 0;
        let nombreMayor = '';
        let cantMayor = 0
        for( let val in ObjNuevo ){
          
          if( ObjNuevo[val] > mayor ){
            mayor = ObjNuevo[val];
            nombreMayor = val;
          }
          
        }        
        this.votacionMasVotada = nombreMayor;    
        this.datosVotaciones =  ObjNuevo;
        this.generarDatosGrafica( this.datosVotaciones )
        

      }   )
     ) .subscribe(  )
  }
  generarDatosGrafica( votaciones: any ){
    const labels = Object.keys( votaciones );
    const data = Object.values( votaciones );

    this.multiAxisData = {
      labels,
      datasets: [
        {
          label: '#',
          backgroundColor: [
              '#EC407A',
              '#AB47BC',
              '#42A5F5',
              '#7E57C2',
              '#66BB6A',
              '#FFCA28',
              '#26A69A'
          ],
          yAxisID: 'y',
          data
      }
    ]
  };
  }
}
