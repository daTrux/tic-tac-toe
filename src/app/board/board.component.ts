import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  cells: string[] = [];
  player!: 'X' | 'O';
  winner?: string;
  winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  constructor() {}

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.cells = Array(9).fill(null);
    this.player = 'X';
    this.winner = undefined;
  }

  clickCell(index: number) {
    if (!this.cells[index]) {
      this.cells.splice(index, 1, this.player);
      this.player = this.player === 'X' ? 'O' : 'X';
    }
    this.winner = this.calculateWinner();
  }
  calculateWinner() {
    for (let i = 0; i < this.winConditions.length; i++) {
      const [a, b, c] = this.winConditions[i];
      if (
        this.cells[a] &&
        this.cells[a] === this.cells[b] &&
        this.cells[a] === this.cells[c]
      ) {
        return this.cells[a];
      }
    }
    if (!this.cells.some(x => x == undefined)) {
      return 'Draw';
    }
    return undefined;
  }
}
