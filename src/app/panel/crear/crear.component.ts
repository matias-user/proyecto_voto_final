import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Encuesta } from 'src/app/interfaces/encuesta.interface';
import { PanelService } from '../panel.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css'],
  providers: [MessageService],
})
export class CrearComponent implements OnInit {

  date1!: Date;
  xToken!: string | null;   

  constructor( private panelService: PanelService,
                private messageService: MessageService  ) { }

  ngOnInit(): void {
  }
  recibiendoValorForm( value : Encuesta){
    this.messageService.add( { severity:'success', detail:'Encuesta creada!' } );
    this.xToken = localStorage.getItem('x-token');    
    this.panelService.fetchCrearEncuesta( value, this.xToken )
    .subscribe();
  }
}
