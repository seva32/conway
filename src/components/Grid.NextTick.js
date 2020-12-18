/* eslint-disable no-plusplus */
/* eslint-disable indent */
import deepCopy from '../utils/deepCopy';

const nextTick = (matrix, row, col) => {
  // copia de la matriz en T0
  const buffer = deepCopy(matrix);
  let x;
  let y;
  // conocemos las dimensiones de la matriz por los parametros
  // pasados como props al componente, iteramos cada posicion
  for (x = 0; x < row; x++) {
    for (y = 0; y < col; y++) {
      // contador de celulas vecinas vitales
      let n = 0;
      // var para recorrer vecinos en fila
      let xNeighbour;
      // var para recorrer vecinos en columna
      let yNeighbour;
      // cada celula pertenece a un campo de 3X3
      // vecino vecino vecino
      // vecino ACTUAL vecino
      // vecino vecino vecino
      // nos interesa que xNeighbour y yNeighbour tome
      // los valores -1,0,1.
      for (xNeighbour = -1; xNeighbour <= 1; xNeighbour++) {
        for (yNeighbour = -1; yNeighbour <= 1; yNeighbour++) {
          // [0][0] -> esta coordenada es un caso especial
          // porque estamos ante una matriz que se comporta como esfera
          // en cuanto al juego, su contraparte es [n][m]
          if (x === 0 && y === 0 && (xNeighbour === -1 || yNeighbour === -1)) {
            // coordenadas -1 -1 respecto a [0][0]
            if (xNeighbour === -1 && yNeighbour === -1) {
              if (matrix[row - 1][col - 1]) {
                n++;
              }
            } else if (xNeighbour === -1) {
              // barrido en fila
              if (matrix[row - 1][y + yNeighbour]) {
                n++;
              }
            } else if (matrix[x + xNeighbour][col - 1]) {
              // barrido en columna
              n++;
            }
          } else if (
            // [n][m] -> caso especial para los valores x:1, y:1
            x === row - 1 &&
            y === col - 1 &&
            (xNeighbour === 1 || yNeighbour === 1)
          ) {
            // coordenadas +1 +1 respecto a [n][m]
            if (xNeighbour === 1 && yNeighbour === 1) {
              if (matrix[0][0]) {
                n++;
              }
            } else if (xNeighbour === 1) {
              // barrido en fila
              if (matrix[0][y + yNeighbour]) {
                n++;
              }
            } else if (matrix[x + xNeighbour][0]) {
              // barrido en columna
              n++;
            }
          } else if (
            // [0][m] -> caso especial para los valors x:-1,y:1
            x === 0 &&
            y === col - 1 &&
            (xNeighbour === -1 || yNeighbour === 1)
          ) {
            if (xNeighbour === -1 && yNeighbour === 1) {
              if (matrix[row - 1][0]) {
                n++;
              }
            } else if (xNeighbour === -1) {
              if (matrix[row - 1][y + yNeighbour]) {
                n++;
              }
            } else if (matrix[x + xNeighbour][0]) {
              n++;
            }
          } else if (
            // [n][0] -> caso especial para los valors x:1,y:-1
            x === row - 1 &&
            y === 0 &&
            (xNeighbour === 1 || yNeighbour === -1)
          ) {
            if (xNeighbour === 1 && yNeighbour === -1) {
              if (matrix[0][col - 1]) {
                n++;
              }
            } else if (xNeighbour === 1) {
              if (matrix[0][y + yNeighbour]) {
                n++;
              }
            } else if (matrix[x + xNeighbour][col - 1]) {
              n++;
            }
          } else if (x === 0 && xNeighbour === -1) {
            if (matrix[row - 1][y + yNeighbour]) {
              n++;
            }
          } else if (x === row - 1 && xNeighbour === 1) {
            if (matrix[0][y + yNeighbour]) {
              n++;
            }
          } else if (y === 0 && yNeighbour === -1) {
            if (matrix[x + xNeighbour][col - 1]) {
              n++;
            }
          } else if (y === col - 1 && yNeighbour === 1) {
            if (matrix[x + xNeighbour][0]) {
              n++;
            }
          } else if (matrix[x + xNeighbour][y + yNeighbour]) {
            n++;
          }
        }
      }
      // necesitamos conocer el estado actual en cada celula,
      let c = buffer[x][y];
      // luego con la informacion respecto a los vecinos (si estan
      // vivos o no) puedo determinar el estado final de la celula
      switch (n) {
        case 3:
          c = true; // celula vive
          break;
        case 4:
          break; // celula no cambia
        default:
          c = false; // celula muere
      }
      buffer[x][y] = c;
    }
  }
  // al terminar de iterar la matriz guardo el nuevo estado
  return buffer;
};

export default nextTick;
