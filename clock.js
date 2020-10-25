const DEBUG_MODE = false;

const canva = document.querySelector(".clock");
const ctx = canva.getContext("2d");

const cW = (canva.width = 400);
const cH = (canva.height = 400);

const tay = Math.PI * 2;

const numberCoord = [
  { num: 1, x: cW / 1.45, y: cH / 5.2 }, // 1
  { num: 2, x: cW / 1.2, y: cH / 2.8 }, // 2
  { num: 3, x: cW / 1.15, y: cH / 1.85 }, // 3
  { num: 4, x: cW / 1.2, y: cH / 1.4 }, //4
  { num: 5, x: cW / 1.45, y: cH / 1.15 }, //5
  { num: 6, x: cW / 2.14, y: cH / 1.06 }, // 6
  { num: 7, x: cW / 3.9, y: cH / 1.15 }, // 7
  { num: 8, x: cW / 8, y: cH / 1.4 }, // 8
  { num: 9, x: cW / 16, y: cH / 1.85 }, // 9
  { num: 10, x: cW / 11, y: cH / 2.8 }, // 10
  { num: 11, x: cW / 4.8, y: cH / 5.2 }, // 11
  { num: 12, x: cW / 2.26, y: cH / 8 }, // 12
];

// *******************************************
function elem(callBack) {
  ctx.beginPath();
  return callBack();
}

function line(x1, y1, x2, y2) {
  elem(() => {
    ctx.moveTo(x2, y2);
    ctx.lineTo(x1, y1);

    ctx.stroke();
  });
}

// *******************************************

function arrowsF(_Date) {
  const dMinutes = _Date.getMinutes();
  const dHours = _Date.getHours() % 12;
  const dSeconds = _Date.getSeconds();
  const dMiliseconds = _Date.getMilliseconds() / 10;

  const x1 = cW / 2;
  const y1 = cH / 2;

  ctx.fillStyle = "brown";
  ctx.strokeStyle = "brown";

  elem(() => {
    ctx.arc(cW / 2, cH / 2, 3, 0, tay);
    ctx.fill();
  });
  
  // seconds arrow
  line(x1, y1, cW / 2, cH / 4);

  // minutes arrow
  elem(() => {});

  // hours arrow
  elem(() => {});
}

function draw() {
  const _Date = new Date();

  ctx.strokeStyle = "black";

  elem(() => {
    ctx.fillStyle = "white";
    ctx.lineWidth = "6";
    ctx.arc(cW / 2, cH / 2, cH / 2 - 5, 0, tay);
    ctx.stroke();
    ctx.fill();
  });

  arrowsF(_Date);

  for (let { num, x, y } of numberCoord) {
    elem(() => {
      ctx.fillStyle = "black";

      ctx.font = Math.sqrt(cW + cH) + "px Segoe UI";
      ctx.fillText(num, x, y);
    });
  }
}

function debug() {
  const lines = [
    [0, cW / 2, cH, cH / 2],
    [cW / 2, 0, cH / 2, cH],
    [cW / 6, cH, cW - cW / 6, 0],
    [cW / 6, 0, cW - cW / 6, cH],
    [0, cH - cH / 4, cW, cH / 4],
    [0, cH / 4, cW, cH - cH / 4],
  ];

  ctx.strokeStyle = "red";

  lines.forEach(([x1, y1, x2, y2]) => line(x1, y1, x2, y2));
}

function clear() {
  ctx.clearRect(0, 0, cW, cH);
}

function loop(timestamp) {
  clear();
  draw(timestamp);
  if (DEBUG_MODE) debug();

  return requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
