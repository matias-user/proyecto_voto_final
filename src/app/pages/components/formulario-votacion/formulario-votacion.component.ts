import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Encuesta } from 'src/app/interfaces/encuesta.interface';

@Component({
  selector: 'app-formulario-votacion',
  templateUrl: './formulario-votacion.component.html',
  styleUrls: ['./formulario-votacion.component.css'],
})
export class FormularioVotacionComponent implements OnInit {
  
  @Input() titulo: string = '';
  @Input() nombreBoton!: string;
  @Output() valorFormulario: EventEmitter<Encuesta> = new EventEmitter();

  es: any;
  miFormulario :FormGroup = this.fb.group({
    titulo: ['', Validators.required ],
    inicio: ['', Validators.required ],
    fin: ['', Validators.required ],
    opcionesVoto : this.fb.array( [] )
  });
  // Este control es en cual se agregan los valores a opcionesVoto
  opciones: FormControl = new FormControl( '', Validators.required ); 
  cantidadVotos : number = 0;

  get opcionesVotar(){
    return this.miFormulario.get('opcionesVoto') as FormArray;
  };

  constructor( private fb: FormBuilder,
               ) { }

  ngOnInit(): void {
    this.es = {
      firstDayOfWeek: 1,
      dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
      dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
      dayNamesMin: [ "D","L","M","X","J","V","S" ],
      monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
      monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
      today: 'Hoy',
      clear: 'Borrar'
    }
  }
  agregarOpcion(){
    if( this.opciones.invalid ) return;
    // Agregar  a array as formArray    
    this.opcionesVotar.push( new FormControl(  this.opciones.value , Validators.required) );
    this.opciones.reset();
     
  }
  guardarEncuesta(){
    this.valorFormulario.emit( this.miFormulario.value );
    
  } 
}
