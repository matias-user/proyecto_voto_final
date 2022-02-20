import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import {  switchMap, tap } from 'rxjs/operators';
import { PanelService } from '../panel.service';

@Component({
  selector: 'app-voto',
  templateUrl: './voto.component.html',
  styleUrls: ['./voto.component.css'],
  providers: [MessageService]
})
export class VotoComponent implements OnInit {
  opcionesVoto!: any[];

  constructor( private fb : FormBuilder,
              private panelService: PanelService,
              private activatedRoute: ActivatedRoute,
              private messageService: MessageService,
              private router: Router ) { }
  miForm: FormGroup = this.fb.group({
    seleccion: ''
  })

  selectedCategory: any = null;

  categories: any[] = [{name: 'Accounting', key: 'A'}, {name: 'Marketing', key: 'M'}, {name: 'Production', key: 'P'}, {name: 'Research', key: 'R'}];

  ngOnInit(): void {
    this.selectedCategory = this.categories[1];
    this.activatedRoute.params.pipe(
      switchMap( objId => this.panelService.fetchUnaEncuesta( objId.id ) ),
      tap( (votacion:any) =>{
        this.opcionesVoto = votacion.encuestas.opcionesVoto;        
      }   )
    ).subscribe()
  }
  enviarVoto(){
    const { seleccion } = this.miForm.value;
    this.activatedRoute.params.pipe(
      switchMap( objId => this.panelService.votar( objId.id, seleccion ) ),
      tap( (result:any) => {
        result.msg ? 
        this.messageService.add( 
          {severity:'success', summary:'Votación Exitosa', detail:`Listo, haz votado por ${seleccion}`} 
          ) : 
          {severity:'error', summary:'Votación Fallida', detail:'Hubo un error!'} 
        
          setTimeout(() => {
            this.router.navigateByUrl('/panel/ver')
          }, 2000);

      } 
      )
    ).subscribe( console.log )

     
    
  }
}
