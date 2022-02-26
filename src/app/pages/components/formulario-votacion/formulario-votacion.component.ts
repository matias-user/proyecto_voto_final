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
  @Input() tituloForm: string = '';
  @Input() FechafinForm!: Date;

  es: any;
  miFormulario :FormGroup = this.fb.group({
    titulo: [this.tituloForm, Validators.required ],
    inicio: [ new Date(),  ],
    fin: [this.FechafinForm, Validators.required ],
    opcionesVoto :  this.fb.array( [],Validators.required ), 
  });
  // Este control es en cual se agregan los valores a opcionesVoto
  opciones: FormControl = new FormControl( '', Validators.required ); 
  cantidadVotos : number = 0;

  get opcionesVotar(){
        
    return  this.miFormulario.get('opcionesVoto') as FormArray;
    
  };

  constructor( private fb: FormBuilder,
               ) { }

  ngOnInit(): void {     
    setTimeout(() => {
      
      this.miFormulario.get('titulo')?.setValue(this.tituloForm);
      this.miFormulario.get('fin')?.setValue( new Date(this.FechafinForm)  );

    }, 300);

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
    if( this.miFormulario.invalid ){
      console.log('invalido');
      this.miFormulario.markAllAsTouched();
      return;
    }
    
    this.valorFormulario.emit( this.miFormulario.value );
    this.miFormulario.reset();
  } 
  editarEncuesta(){
    
  }
  campoEsValido( campo: string ){
    return this.miFormulario.controls[campo].errors 
    && this.miFormulario.controls[campo].touched;
  }
}
