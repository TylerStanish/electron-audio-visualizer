import render from "./visual";


const coreAudio = require('node-core-audio');
const ft = require('fourier-transform/asm');

import processAudio from "./audio";

let engine = coreAudio.createNewAudioEngine();

const options = {
  inputChannels: 1,
  outputChannels: 1,
  inputDevice: 2
};

engine.setOptions(options);
console.log(
  engine.getDeviceName(0),
  engine.getDeviceName(1),
  engine.getDeviceName(2),
  engine.getDeviceName(3),
  engine.getDeviceName(4)
);

engine.addAudioCallback(function(inputBuffer){
  let spectrum = ft(inputBuffer[0]);
  processAudio(spectrum);
  // return inputBuffer;
});


// renderInit();