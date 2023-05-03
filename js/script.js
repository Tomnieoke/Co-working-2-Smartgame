//'use strict';

//function() {
    const grid = document.getElementById('grid');
    const tiles = document.getElementById('tiles');

    // all levels
    const challenges = {
        1: {tiles: 'f', gate: 'x', solution: ''},
        2: {tiles: 'ae', gate: 't', solution: '9844f81e1408f6ec'},
        63: {tiles: 'bdefghij', gate: 'w', solution: ''}
    };

    class HorseAcademy {
        constructor(rows, cols) {
            this.rows = rows;
            this.cols = cols;
            this.newChallenge(challenges[1]);
        }
        
        newChallenge(challenge) {
            this.solution = challenge.solution;

            // reset all gates
            document.querySelectorAll('#grid span').forEach(el => {
                el.style.backgroundColor = '';
            });

            // set gate to red
            document.querySelector('#grid #gate-' + challenge.gate)
                .style.backgroundColor = 'red';

            this.resetBoard();
        }

        resetBoard() {
            // create 2d array
            this.board = [...Array(this.cols)].fill()
                .map(col => [...Array(this.rows)].fill()
                .map(cell => null));
            
            // test code
            this.board[0][2] = {name: 'e', rotation: 3};
            this.board[1][3] = {name: 'a', rotation: 0};
            // test code end

            this.renderBoard();
        }

        renderBoard() {
            // clear all tiles
            tiles.innerHTML = '';

            // convert all tiles to html elements and put them on the board
            for (let col = 0; col < this.cols; col++) {
                for (let row = 0; row < this.rows; row++) {
                    const tile = this.board[col][row];

                    if (!tile) continue;

                    const img = document.createElement('img');
                    img.src = `img/tiles/${tile.name}.png`;
                    img.alt = 'tile ' + tile.name;

                    const div = document.createElement('div');
                    div.appendChild(img);

                    // use css classes to position the tile on the grid
                    div.classList.add(
                        'tile',
                        'x-' + row,
                        'y-' + col,
                        'rotation-' + tile.rotation
                    );

                    tiles.appendChild(div);
                }
            }
        }

        solved() {
            return (CryptoJS.SHA1(this.board) + '').slice(0, 16) === this.solution;
        }
    }

    const game = new HorseAcademy(4, 5);
    game.newChallenge(challenges[2]);
    console.log(game.solved()); // true
//})();