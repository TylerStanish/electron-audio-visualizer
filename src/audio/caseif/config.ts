// NOTE: Not all config values may necessarily be changed by the user at
// runtime. Some are mutated internally after intialization, meaning changing
// them at runtime may not work as expected.

/* *********************** */
/* * Audio node settings * */
/* *********************** */
export var volumeStep = 0.05; // the step for each volume notch as a fraction of 1

/* *************************** */
/* * Basic spectrum settings * */
/* *************************** */
// BASIC ATTRIBUTES
export var spectrumSize = 63; // number of bars in the spectrum
export var spectrumDimensionScalar = 4.5; // the ratio of the spectrum width to its height
export var spectrumSpacing = 7; // the separation of each spectrum bar in pixels at width=1920
export var maxFftSize = 16384; // the preferred fftSize to use for the audio node (actual fftSize may be lower)
export var audioDelay = 0.4; // audio will lag behind the rendered spectrum by this amount of time (in seconds)
// BASIC TRANSFORMATION
export var spectrumStart = 4; // the first bin rendered in the spectrum
export var spectrumEnd = 1200; // the last bin rendered in the spectrum
export var spectrumScale = 2.5; // the logarithmic scale to adjust spectrum values to
// EXPONENTIAL TRANSFORMATION
export var spectrumMaxExponent = 25; // the max exponent to raise spectrum values to
export var spectrumMinExponent = 8; // the min exponent to raise spectrum values to
export var spectrumExponentScale = 2; // the scale for spectrum exponents
// DROP SHADOW
export var spectrumShadowBlur = 6; // the blur radius of the spectrum's drop shadow
export var spectrumShadowOffsetX = 0; // the x-offset of the spectrum's drop shadow
export var spectrumShadowOffsetY = 0; // the y-offset of the spectrum's drop shadow

/* ********************** */
/* * Smoothing settings * */
/* ********************** */
export var smoothingPoints = 3; // points to use for algorithmic smoothing. Must be an odd number.
export var smoothingPasses = 1; // number of smoothing passes to execute
export var temporalSmoothing = 0.2; // passed directly to the JS analyzer node

/* ************************************ */
/* * Spectrum margin dropoff settings * */
/* ************************************ */
export var headMargin = 7; // the size of the head margin dropoff zone
export var tailMargin = 7; // the size of the tail margin dropoff zone
export var minMarginWeight = 0.7; // the minimum weight applied to bars in the dropoff zone

/* *************************** */
/* * Basic particle settings * */
/* *************************** */
// COUNT
export var baseParticleCount = 2000; // the number of particles at 1080p
export var fleckCount = 50; // total fleck count
export var bokehCount = 250; // total bokeh count
// OPACITY
export var particleOpacity = 0.7; // opacity of primary particles
export var bokehOpacity = 0.5; // opacity of bokeh (raising this above 0.5 results in weird behavior)
// SIZE
export var minParticleSize = 4; // the minimum size scalar for particle systems
export var maxParticleSize = 7; // the maximum size scalar for particle systems
export var particleSizeExponent = 2; // the exponent to apply during dynamic particle scaling (similar to spectrum exponents)
// POSITIONING
export var yVelRange = 3; // the range for particle y-velocities
export var xPosBias = 4.5; // bias for particle x-positions (higher values = more center-biased)
export var zPosRange = 450; // the range of z-particles
export var zModifier = -250; // the amount to add to z-positions
export var zPosBias = 2.3; // bias for particle z-positions (higher values = more far-biased)
export var leftChance = 0.88; // the chance for a particle to spawn along the left edge of the screen
export var rightChance = 0.03; // the chance for a particle to spawn along the right edge of the screen
export var topBottomChance = 0.09; // the chance for a particle to spawn along the top/bottom edges of the screen
// VELOCITY
export var velBias = 1.8; // bias for particle velocities (higher values = more center-biased)
export var minParticleVelocity = 2; // the minimum scalar for particle velocity
export var maxParticleVelocity = 5; // the maximum scalar for particle velocity
export var absMinParticleVelocity = 0.001; // the absolute lowest speed for particles
export var fleckVelocityScalar = 1.75; // velocity of flecks relative to normal particles
export var fleckYVelScalar = 0.75; // y-velocity range of flecks relative to x-velocity
export var bokehMinVelocity = maxParticleVelocity * 0.15; // the minimum velocity of bokeh
export var bokehMaxVelocity = maxParticleVelocity * 0.3; // the maximum velocity of bokeh

/* ****************************** */
/* * Particle analysis settings * */
/* ****************************** */
export var ampLower = 7; // the lower bound for amplitude analysis (inclusive)
export var ampUpper = 30; // the upper bound for amplitude analysis (exclusive)
export var particleExponent = 4.5; // the power to raise velMult to after initial computation

/* ***************** */
/* * Misc settings * */
/* ***************** */
export var cycleSpeed = 4; // the (arbitrary) scalar for cycling rainbow spectrums
export var blockWidthRatio = 0.63; // the width of the Monstercat logo relative to its containing block
export var blockHeightRatio = 0.73; // the height of the Monstercat logo relative to its containing block
export var mouseSleepTime = 1000; // inactivity period in milliseconds before the bottom text is hidden

export var resRatio = window.innerWidth/1920;
export var spectrumWidthTemp = 1568 * resRatio;
spectrumSpacing = 7 * resRatio;
export var barWidth = (spectrumWidthTemp + spectrumSpacing) / spectrumSize - spectrumSpacing;
export var spectrumWidth = (barWidth + spectrumSpacing) * spectrumSize - spectrumSpacing;

export var spectrumHeight = spectrumWidth / spectrumDimensionScalar;
export var marginDecay = 1.6; // I admittedly forget how this works but it probably shouldn't be changed from 1.6
// margin weighting follows a polynomial slope passing through (0, minMarginWeight) and (marginSize, 1)
export var headMarginSlope = (1 - minMarginWeight) / Math.pow(headMargin, marginDecay);
export var tailMarginSlope = (1 - minMarginWeight) / Math.pow(tailMargin, marginDecay);
