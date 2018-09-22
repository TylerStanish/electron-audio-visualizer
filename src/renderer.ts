import {getTransformedSpectrum, transformToVisualBins} from './audio/caseif/spectrum_algorithms';
import render from "./visual";
import {maxFftSize, temporalSmoothing} from "./audio/caseif/config";

const input = <HTMLInputElement>document.getElementById('audio_file');
const audioPlayer = <HTMLAudioElement> document.getElementById('audio_player');
let analyzer;
let bufferSource;
let context = new AudioContext();
let scriptProcessor;

setupAudioNodes();

input.onchange = function () {
  scriptProcessor.onaudioprocess = handleAudio;
  audioPlayer.src = URL.createObjectURL(input.files[0]);

  const fileReader = new FileReader();
  fileReader.readAsArrayBuffer(input.files[0]);
  // fileReader.readAsDataURL(input.files[0]);

  fileReader.onloadend = (file) => {
    console.log('the file', file);

    context.decodeAudioData(<ArrayBuffer>fileReader.result, buffer => {
      bufferSource.buffer = buffer;
      bufferSource.start(0);
    });
  };
};

function handleAudio(){
  let initialArray = new Uint8Array(analyzer.frequencyBinCount);
  analyzer.getByteFrequencyData(initialArray);
  let array = transformToVisualBins(initialArray);
  let array1 = getTransformedSpectrum(array);
  drawSpectrum(array1);
}

function drawSpectrum(arr){
  render(arr);
}

function setupAudioNodes(){
  bufferSource = context.createBufferSource();
  bufferSource.connect(context.destination);

  scriptProcessor = context.createScriptProcessor(1024, 1, 1);
  scriptProcessor.connect(context.destination);

  analyzer = context.createAnalyser();
  analyzer.connect(scriptProcessor);
  // analyzer.smoothingTimeConstant = temporalSmoothing;
  analyzer.minDecibels = -100;
  analyzer.maxDecibels = -33;
  analyzer.fftSize = maxFftSize;
  bufferSource.connect(analyzer);
}