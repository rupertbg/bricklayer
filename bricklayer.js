function generateNeighbourCoords(y, x, d = 1) {
  let coords = [];
  for (let i = 1; i < d + 1; i++) {
    coords.push([y, x + i]);
    coords.push([y, x - i]);
    coords.push([y + i, x]);
    coords.push([y - i, x]);
  }
  return coords
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function findConjoinableNeighbours(matrix, x, y) {
  const neighbourCoords = generateNeighbourCoords(x, y);
  return neighbourCoords.filter(coord => 
    matrix[coord[0]] 
    && matrix[coord[0]][coord[1]]
    && matrix[coord[0]][coord[1]].join === null
  );
}

function joinBricks(bricks) {
  let coordsToProcess = [];
  for (let y = 0; y < bricks.length; y++) {
    for (let x = 0; x < bricks[y].length; x++) {
      coordsToProcess.push([y, x]);
    };
  };
  shuffle(coordsToProcess);
  for (let i = 0; i < coordsToProcess.length; i++) {
    const coords = coordsToProcess[i];
    const y = coords[0];
    const x = coords[1];
    const conjoinableNeighbours = findConjoinableNeighbours(bricks, y, x);
    const joinCoords = conjoinableNeighbours[Math.floor(Math.random() * conjoinableNeighbours.length)];
    if (joinCoords && bricks[y][x].join === null) {
      let directions;
      if (x > joinCoords[1]) directions = ['left', 'right']
      else if (x < joinCoords[1]) directions = ['right', 'left']
      else if (y > joinCoords[0]) directions = ['top', 'bottom']
      else if (y < joinCoords[0]) directions = ['bottom', 'top'];
      bricks[y][x].join = directions[0];
      bricks[joinCoords[0]][joinCoords[1]].join = directions[1];
    } 
  }
  return bricks;
}

function layBricks(height, width) {
  let matrix = []
  // Create rows
  for (let y = 0; y < height; y++) {
    matrix.push([]);
    for (let x = 0; x < width; x++) {
      matrix[y].push({
        join: null,
        color: 'brown',
      });
    };
  };
  return matrix;
}

function generateBricks(height, width) {
  const bricks = layBricks(height, width);
  const joinedBricks = joinBricks(bricks);
  return joinedBricks;
}

function printBricks(height, width) {
  const bricks = generateBricks(height, width);
  let output = '';
  let y = bricks.length;
  while (y--) {
    let str = '';
    for (let x = 0; x < bricks[y].length; x++) {
      str += `${bricks[y][x].join || 'x'} `;
    };
    output += `${str}\n`;
  }
  console.clear();
  console.log(output);
}