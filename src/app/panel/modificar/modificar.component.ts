import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
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

  constructor( private messageService: MessageService,
                private panelService: PanelService,
                private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe( 
      pluck('id'),
      switchMap( uid => this.panelService.fetchUnaEncuesta( uid ) ),
      tap( votacion =>{
        this.votacion = votacion
      }  )
     ).subscribe( console.log )
  }
  recibiendoValor( value : Encuesta){
    console.log('hola');
    this.messageService.add( { severity:'success', detail:'Encuesta modificada!' } );
    // this.xToken = localStorage.getItem('x-token');    
    // this.panelService.fetchCrearEncuesta( value, this.xToken ).subscribe( console.log );
  }

}
