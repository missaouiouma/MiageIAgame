let vehicles = [];
let showCircles = true;
let vehicleCountSlider;
let distanceSlider;
let speedSlider;
let radiusSlider;
let thetaVariationSlider;
let maxForceSlider;

function setup() {
  createCanvas(1400, 720);

  // Slider pour ajuster le nombre de véhicules
  vehicleCountSlider = createSlider(1, 20, 5);
  vehicleCountSlider.position(width / 2 - 110, height - 80);
  vehicleCountSlider.style('width', '220px');
  createP('Nombre de véhicules').position(vehicleCountSlider.x + 240, vehicleCountSlider.y - 10).style('color', 'white');

  // Slider pour ajuster la distance du centre du cercle
  distanceSlider = createSlider(50, 300, 150);
  distanceSlider.position(width / 2 - 110, height - 40);
  distanceSlider.style('width', '220px');
  createP('Distance du centre du cercle').position(distanceSlider.x + 240, distanceSlider.y - 10).style('color', 'white');

  // Slider pour ajuster la vitesse des véhicules
  speedSlider = createSlider(1, 10, 5);
  speedSlider.position(width / 2 - 110, height - 120);
  speedSlider.style('width', '220px');
  createP('Vitesse maximale des véhicules').position(speedSlider.x + 240, speedSlider.y - 10).style('color', 'white');

  // Slider pour ajuster le rayon du cercle
  radiusSlider = createSlider(10, 100, 50);
  radiusSlider.position(width / 2 - 110, height - 160);
  radiusSlider.style('width', '220px');

  createP('Rayon du cercle').position(radiusSlider.x + 240, radiusSlider.y - 10).style('color', 'white');

  // Slider pour ajuster la variation de l'angle theta
  thetaVariationSlider = createSlider(0.1, 1.0, 0.5, 0.1);
  thetaVariationSlider.position(width / 2 - 110, height - 200);
  thetaVariationSlider.style('width', '220px');
  createP('Variation de l\'angle theta').position(thetaVariationSlider.x + 240, thetaVariationSlider.y - 10).style('color', 'white');

  // Slider pour ajuster la force maximale
  maxForceSlider = createSlider(0.1, 5.0, 1.0, 0.1);
  maxForceSlider.position(width / 2 - 110, height - 240);
  maxForceSlider.style('width', '220px');
  createP('Force maximale').position(maxForceSlider.x + 240, maxForceSlider.y - 10).style('color', 'white');

  // Création initiale des véhicules
  updateVehicles(vehicleCountSlider.value());
}

function draw() {
  // Arrière-plan noir pailleté
  setBlackSparkleBackground();

  // Mise à jour du nombre de véhicules selon le slider
  let currentVehicleCount = vehicleCountSlider.value();
  if (vehicles.length !== currentVehicleCount) {
    updateVehicles(currentVehicleCount);
  }

  // Mise à jour des propriétés des véhicules
  for (let v of vehicles) {
    v.distanceCercle = distanceSlider.value();
    v.maxSpeed = speedSlider.value();
    v.cercleRadius = radiusSlider.value();
    v.thetaVariation = thetaVariationSlider.value();
    v.maxForce = maxForceSlider.value();
    v.update();
    v.edges();
    v.wander();
    v.show();
  }

  // Dessiner le texte animé "wander effect" en haut de l'écran
  drawAnimatedText();

  // Afficher le message d'instructions
  displayInstructions();
}

// Afficher le message d'instructions
function displayInstructions() {
  textAlign(CENTER, CENTER);
  textSize(18);
  fill(250);
  noStroke();
}

// Mettre à jour le nombre de véhicules
function updateVehicles(count) {
  vehicles = [];
  for (let i = 0; i < count; i++) {
    let v = new Vehicle(random(width), random(height));
    v.distanceCercle = distanceSlider.value();
    v.maxSpeed = speedSlider.value();
    v.cercleRadius = radiusSlider.value();
    v.thetaVariation = thetaVariationSlider.value();
    v.maxForce = maxForceSlider.value();
    vehicles.push(v);
  }
}

function drawAnimatedText() {
  textAlign(CENTER, TOP);
  textSize(60);
  textFont('cursive');
  fill(255);
  noStroke();
  text('wander effect', width / 2, 20);
}

// Définir un arrière-plan noir pailleté
function setBlackSparkleBackground() {
  background(0);
  for (let i = 0; i < 500; i++) {
    let x = random(width);
    let y = random(height);
    stroke(255, random(150, 255));
    point(x, y);
  }
}

function keyPressed() {
  if (key === 'd' || key === 'D') {
    showCircles = !showCircles;
  }
}
