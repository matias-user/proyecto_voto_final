import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { PanelService } from '../panel.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {
  arrVotacionEncontradas!: any[]; 
  termino!: string;
  constructor( private panelService: PanelService,
              private router: Router) { }

  ngOnInit(): void {
  }
  buscar(){
    if( this.termino ){

      this.panelService.fetchBuscarEncuesta( this.termino ).pipe(
        tap( (result:any) => {
          this.arrVotacionEncontradas = result.results[0];
          console.log(result.results);
          
        } )
      ).subscribe( )
    }
    
  }
  irVotacion(_id:string ){
    
    this.router.navigateByUrl(`/panel/tarjeta/${_id}`);
  }

}
