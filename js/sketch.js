let doorClosed, doorOpened;
let doorState = "CLOSED";
let doorCloseSound = new Tone.MonoSynth(
  {
    envelope: {
      attack: 0.01,
      decay: 1,
      sustain: 1,
      release: 0.5
    }
});

let doorCloseSoundEffect = new Tone.AutoPanner(
  {
    "frequency": "8n",
    "type": "square6",
    "depth": 0,
    "wet": 0.5
}).toDestination();

let doorOpenSound = new Tone.AMSynth(
  {
    envelope: {
      attack: 0.006,
      decay: 4,
      sustain: 0.04,
      release: 1.2
    }
});

let doorOpenSoundEffect = new Tone.PitchShift(
  {
    "pitch": 7,
    "windowSize": 0.1,
    "delayTime": 0,
    "feedback": 0,
    "wet": 0.5
  }
).toDestination();

function setup() {
  createCanvas(600, 400);

  doorClosed = loadImage("Photos/Door-Close.png");
  doorOpened = loadImage("Photos/Door-Open.png");

  doorCloseSound.connect(doorCloseSoundEffect);
  doorOpenSound.connect(doorOpenSoundEffect);
}

function draw() {
  background(255);
  if(doorState == "CLOSED") {
    image(doorClosed, 0, 0);
  }
  else {
    image(doorOpened, 0, 0);
  }
}

function mousePressed() {
  if(doorState == "CLOSED") {
    doorOpenSound.triggerAttackRelease("C5", "8n");
    doorState = "OPENED";
  }
  else {
    doorCloseSound.triggerAttackRelease("C3", "32n");
    doorState = "CLOSED";
  }
}