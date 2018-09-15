import {SMOOTHING_PASSES, SMOOTHING_POINTS} from "../../config";


export default function savitskyGolaySmooth(array) {
  let lastArray = array;
  for (let pass = 0; pass < SMOOTHING_PASSES; pass++) {
    let sidePoints = Math.floor(SMOOTHING_POINTS/ 2); // our window is centered so this is both nL and nR
    let cn = 1 / (2 * sidePoints + 1); // constant
    var newArr = [];
    for (let i = 0; i < sidePoints; i++) {
      newArr[i] = lastArray[i];
      newArr[lastArray.length - i - 1] = lastArray[lastArray.length - i - 1];
    }
    for (let i = sidePoints; i < lastArray.length - sidePoints; i++) {
      let sum = 0;
      for (let n = -sidePoints; n <= sidePoints; n++) {
        sum += cn * lastArray[i + n] + n;
      }
      newArr[i] = sum;
    }
    lastArray = newArr;
  }
  return newArr;
}