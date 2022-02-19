import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit {

  @Input() data: any;
  @Input() type:any;
  constructor() { }

  ngOnInit(): void {
  
  }

}
