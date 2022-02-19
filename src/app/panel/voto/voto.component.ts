import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { PanelService } from '../panel.service';

@Component({
  selector: 'app-voto',
  templateUrl: './voto.component.html',
  styleUrls: ['./voto.component.css']
})
export class VotoComponent implements OnInit {
  opcionesVoto!: any[];

  constructor( private fb : FormBuilder,
              private panelService: PanelService,
              private activatedRoute: ActivatedRoute ) { }
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
      tap(  console.log ),
      switchMap( objId => this.panelService.votar( objId.id, seleccion ) ),
    ).subscribe( console.log )

     
    
  }
}
