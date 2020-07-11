'use strict';

const e = React.createElement;

class Bricks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const brickSize = 50;
    const height = window.innerHeight / brickSize;
    const width = window.innerWidth / brickSize;
    const bricks = generateBricks(height, width);
    const brickElements = bricks.map((row, i) => e(
      'tr',
      {
        key: `${i}`,
      },
      row.map((brick, j) => e(
        'td',
        {
          key: `${i}-${j}`,
          datatype: brick.join,
          style: {
            width: `${brickSize}px`,
            height: `${brickSize}px`,
            background: Math.random() >= 0.5 ? '#cb4154' : '#cc4243',
            borderTop: brick.join && brick.join == 'top' ? undefined : 'thin solid black',
            borderBottom: brick.join && brick.join == 'bottom' ? undefined : 'thin solid black',
            borderLeft: brick.join && brick.join == 'left' ? undefined : 'thin solid black',
            borderRight: brick.join && brick.join == 'right' ? undefined : 'thin solid black',
          }
        }
      )
      )),
    );
    const tbody = e(
      'tbody',
      {
        style: {
          padding: 0,
          margin: 0,
        }
      },
      brickElements,
    );
    return e(
      'table',
      {
        style: {
          padding: 0,
          margin: 0,
          borderCollapse: 'collapse',
        }
      },
      tbody,
    );
  }
}

const domContainer = document.getElementById('root');
const renderBricks = () => ReactDOM.render(e(Bricks), domContainer);

renderBricks();

let resizeTimeout;

window.onresize = () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(renderBricks, 50);
}