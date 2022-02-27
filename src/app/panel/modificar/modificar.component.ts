import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { pluck, switchMap, tap } from 'rxjs/operators';
import { Encuesta } from 'src/app/interfaces/encuesta.interface';
import { PanelService } from '../panel.service';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css'],
  providers: [MessageService]
})
export class ModificarComponent implements OnInit {
  xToken: string | null = '';
  votacion!: any;
  tituloDeVotacion!: string;
  fechaFin!: Date;
  uid!: string;
  constructor( private messageService: MessageService,
                private panelService: PanelService,
                private activatedRoute: ActivatedRoute,
                private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe( 
      pluck('id'),
      tap( uid => this.uid = uid),
      switchMap( uid => this.panelService.fetchUnaEncuesta( uid ) ),
      tap( (votacion:any) =>{
        this.votacion = votacion;
        this.fechaFin = votacion.encuestas.fin;        
        this.tituloDeVotacion = votacion.encuestas.titulo;
      }  )
     ).subscribe( );
  }
  recibiendoValor( value : Encuesta){
      
    this.panelService.fetchActualizarEncuesta( this.uid, value ).pipe(
      tap( (obj:any) => {
        if( obj.votacion.estado ){

          this.messageService.add( { severity:'success', detail:'Encuesta modificada!' } );
          setTimeout(() => {
            this.router.navigateByUrl('/panel/ver');
          }, 1200);
        }else{

          this.messageService.add( { severity:'error', detail:'No se pudo modificar!' } );
        }
         
      }  )
    )
    .subscribe();
  }

}
