import savitskyGolaySmooth from "./smoothers/savitskyGolay";
import {
  NUM_BARS
} from "../config";
import {default as render} from "../visual";

export default function processAudio(fft: Array<number>){
  const smoothed: Array<number> = savitskyGolaySmooth(fft);
  const bucketized: Array<number> = bucketize(smoothed);
  for(let i=0; i<bucketized.length; i++){
    bucketized[i] = bucketized[i] * 20000;
  }
  console.log(bucketized);
  render(bucketized);
}

function smooth(arr){
  return savitskyGolaySmooth(arr);
}


function bucketize(fft: Array<number>){
  let newArr = new Array(NUM_BARS);
  const sliceWidth = fft.length/NUM_BARS;
  for(let i=0; i<NUM_BARS; i++){
    newArr[i] = avg(fft, i*sliceWidth, (i+1)*sliceWidth);
  }
  return newArr;
}

// end is exclusive
function avg(arr, start, end){
  let count = 0;
  for(let i=start; i<end; i++){
    count += arr[i];
  }
  return count/arr.length;
}

function runningAverage(oldVal = 0, lenSoFar, newVal){
  return (oldVal + newVal) / (lenSoFar + 1)
}