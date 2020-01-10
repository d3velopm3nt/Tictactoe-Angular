import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Movement } from 'src/app/models/movement';
import { SquareComponent } from '../square/square.component';
@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @ViewChildren(SquareComponent) private squares: QueryList<SquareComponent>;
  movementHistory: Movement[] = [];
  currentPlayer: string = 'X';
  hasGameFinished: boolean = false;
  finishedAsDraw: boolean = false;
  displayplayer:string = 'square-playerx';
  winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  
  constructor() { }

  ngOnInit() {
  }

  handleSquareClick(squareNumber: number) {
    


    console.log(this.displayplayer);
    const square = this.getSquare(squareNumber);
    this.movementHistory.push({
      player: this.currentPlayer,
      squareNumber: square.squareNumber
    });

    square.text = this.currentPlayer;
    square.enabled = false;
    square.displayPlayer = (this.currentPlayer === 'X' ? 'square-playerx' : 'square-playero') 

    if (this.hasCurrentPlayerWon()) {
      this.hasGameFinished = true;
      this.disableAllSquares();
    } else if (this.hasDrawHappend()) {
      this.finishedAsDraw = true;
    } else {
      this.currentPlayer = (this.currentPlayer === 'X') ? 'O' : 'X';
    }
  }

  restart() {
    this.hasGameFinished = false;
    this.finishedAsDraw = false;
    this.currentPlayer = 'X';
    this.movementHistory = [];
    this.squares.forEach((square) => {
      square.text = '';
      square.enabled = true;
      square.displayPlayer = 'square';
    })
  }

  getMovementsFromPlayer(playerName: string) {
   
    return this.movementHistory.filter((movement) => movement.player === playerName);
  }

  private getSquare(squareNumber: number): SquareComponent {
    return this.squares.find((square) => square.squareNumber == squareNumber);
  }

  private hasCurrentPlayerWon(): boolean {
    const currentPlayerMovements = this.movementHistory.filter((move) => move.player === this.currentPlayer);

    for (let i = 0; i < this.winningCombinations.length; i++) {
      const [a, b, c] = this.winningCombinations[i];
     // debugger;
      const matchingMovements = currentPlayerMovements.filter((move) =>
        move.squareNumber === a ||
        move.squareNumber === b ||
        move.squareNumber === c);

      if (matchingMovements.length === 3) {
        var winsquares = this.squares.filter(x=> x.squareNumber === a ||x.squareNumber === b || x.squareNumber === c);
        winsquares.forEach(x=>x.displayPlayer = 'square square-win');
        return true;
      }
    }

    return false;
  }

  private hasDrawHappend() {
    return this.movementHistory.length === 9;
  }

  private disableAllSquares() {
    this.squares.forEach((square) => {
      square.enabled = false;
    });
  }
}
