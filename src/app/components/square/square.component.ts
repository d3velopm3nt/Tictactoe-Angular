import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent {
  @Input('squareNumber') squareNumber: number = 0;
  @Input('text') text: string = '';
  @Input('enabled') enabled: boolean = true;
  @Output('onSquareClick') onSquareClick: EventEmitter<number> = new EventEmitter();
  @Input('displayPlayer') displayPlayer: string  = 'square';
  playerChange:boolean=false;
  constructor() { }

  ngOnInit() {
  }

  handleClick() {
   
    this.onSquareClick.emit(this.squareNumber);
  }

}
