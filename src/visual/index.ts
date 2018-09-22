import {BAR_PADDING, NUM_BARS} from "../config";

let canvas = <HTMLCanvasElement> window.document.getElementById('canvas');
let ctx: CanvasRenderingContext2D = canvas.getContext('2d');

let lastFFT = [];

export default function render(finalizedBucketizedFFT: Array<number>){

  canvas.height = innerHeight;
  canvas.width = innerWidth;

  for(let i=0; i<NUM_BARS; i++){
    ctx.fillStyle = 'orange';
    drawRect(finalizedBucketizedFFT[i], i, ctx);
  }
  lastFFT = finalizedBucketizedFFT;
}

function drawRect(ele, i, ctx){
  const begin = i*(canvas.width/NUM_BARS) + BAR_PADDING/2;
  const end = (i+1)*(canvas.width/NUM_BARS) - BAR_PADDING/2;
  ctx.fillRect(begin, canvas.height/(ele+1), end-begin, canvas.height - canvas.height/(ele+1));
}
