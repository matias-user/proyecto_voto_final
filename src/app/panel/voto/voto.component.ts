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
  isVotoUsuario: boolean = true;
  xToken!: string | any;

  constructor( private fb : FormBuilder,
              private panelService: PanelService,
              private activatedRoute: ActivatedRoute,
              private messageService: MessageService,
              private router: Router ) { }
  miForm: FormGroup = this.fb.group({
    seleccion: ''
  })

  ngOnInit(): void {
    const _id = localStorage.getItem('_id');
    this.xToken = localStorage.getItem('x-token');

    this.activatedRoute.params.pipe(
      switchMap( objId => this.panelService.fetchUnaEncuesta( objId.id ) ),
      tap( (votacion:any) =>{
        console.log(votacion.encuestas.usuarioVoto);
        
        const filtrarPorUsuario = votacion.encuestas.usuarioVoto.filter( (uid:string) => uid.slice(0,24) == _id );
        if( filtrarPorUsuario.length > 0 ){
          this.isVotoUsuario = false;
        }        
        
        this.opcionesVoto = votacion.encuestas.opcionesVoto;        
      }   )
    ).subscribe()
  }

  enviarVoto(){
    const { seleccion } = this.miForm.value;
    if( !this.isVotoUsuario ){
      
      return this.messageService.add( {severity:'warn', summary:'No puedes realizar esta acción', detail:'Ya has votado!'} );
      
    }else{

      this.activatedRoute.params.pipe(
        switchMap( objId => this.panelService.votar( objId.id, seleccion, this.xToken ) ),
        tap( (result:any) => {
          
          this.isVotoUsuario = false;
          result.msg ? this.messageService.add( {severity:'success', summary:'Votación Exitosa', detail:`Listo, haz votado por ${seleccion}`} 
            ) : 
            {severity:'error', summary:'Votación Fallida', detail:'Hubo un error!'} 
             
            setTimeout(() => {
              this.router.navigateByUrl('/panel/ver')
            }, 2000);
                
        } 
        )
      ).subscribe( )  
    }

     
    
  }
}
