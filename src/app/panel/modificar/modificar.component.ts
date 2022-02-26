import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor( private messageService: MessageService,
                private panelService: PanelService,
                private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe( 
      pluck('id'),
      switchMap( uid => this.panelService.fetchUnaEncuesta( uid ) ),
      tap( (votacion:any) =>{
        this.votacion = votacion;
        
        this.fechaFin = votacion.encuestas.fin;        
        this.tituloDeVotacion = votacion.encuestas.titulo;
      }  )
     ).subscribe( console.log )
  }
  recibiendoValor( value : Encuesta){
    this.messageService.add( { severity:'success', detail:'Encuesta modificada!' } );
  }

}
