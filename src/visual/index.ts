import {BAR_PADDING, NUM_BARS} from "../config";

export default function render(finalizedBucketizedFFT: Array<number>){
  let canvas = <HTMLCanvasElement> window.document.getElementById('canvas');
  let ctx: CanvasRenderingContext2D = canvas.getContext('2d');

  canvas.height = innerHeight;
  canvas.width = innerWidth;
  const {width, height} = canvas;

  if(finalizedBucketizedFFT.length !== NUM_BARS){
    // alert('ayyy');
  }

  for(let i=0; i<NUM_BARS; i++){
    const begin = i*(width/NUM_BARS) + BAR_PADDING/2;
    const end = (i+1)*(width/NUM_BARS) - BAR_PADDING/2;
    ctx.fillStyle = 'orange';
    ctx.fillRect(begin, height/(finalizedBucketizedFFT[i]+1), end-begin, height - height/(finalizedBucketizedFFT[i]+1));
  }
}