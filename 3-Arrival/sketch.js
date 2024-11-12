let vehicles = [];
let points = [];
let textFontLoaded;
let inputBox;
let button;
let stars = [];

function preload() {
  // Charger une police de caractères
  textFontLoaded = loadFont('script.ttf');
}

function setup() {
  createCanvas(1300, 780);
  textFont(textFontLoaded);

  // Générer des étoiles dans le fond
  generateStars(400); // Nombre d'étoiles à générer

  // Boîte de saisie pour le texte
  inputBox = createInput();
  inputBox.position(20, height - 60);
  inputBox.size(200);

  // Bouton pour générer les véhicules sur le texte
  button = createButton('Générer');
  button.position(inputBox.x + inputBox.width + 10, height - 60);
  button.mousePressed(generateVehicles);

  // Générer le texte initial (par exemple "MIAGE IA")
  generatePoints('MIAGE IA');
  generateVehicles();
}

function draw() {
  // Changer l'arrière-plan pour un fond étoilé
  background(0); // Fond noir

  // Dessiner les étoiles
  drawStars();

  // Dessiner chaque véhicule vers sa cible respective
  for (let i = 0; i < vehicles.length; i++) {
    let target = createVector(points[i].x, points[i].y);
    let steering = vehicles[i].arrive(target);
    vehicles[i].applyForce(steering);
    vehicles[i].update();
    vehicles[i].show();
  }
}

// Fonction pour générer les étoiles
function generateStars(count) {
  stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 3) // Taille aléatoire pour les étoiles
    });
  }
}

// Fonction pour dessiner les étoiles
function drawStars() {
  fill(255); // Couleur blanche pour les étoiles
  noStroke();
  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];
    ellipse(star.x, star.y, star.size, star.size);
  }
}

// Fonction pour générer les points à partir du texte
function generatePoints(text) {
  points = textFontLoaded.textToPoints(text, width / 4, height / 2, 150, {
    sampleFactor: 0.2 // Ajuster pour plus de points ou moins
  });
}

// Fonction pour générer les véhicules sur les nouveaux points
function generateVehicles() {
  let text = inputBox.value();
  if (text.trim() === '') {
    text = 'tapez un mot'; // Si l'utilisateur n'a rien entré, utiliser un texte par défaut
  }
  generatePoints(text);

  // Créer des véhicules sur les nouveaux points
  vehicles = [];
  for (let i = 0; i < points.length; i++) {
    let pt = points[i];
    let vehicle = new Vehicle(random(width), random(height));
    vehicles.push(vehicle);
  }
}
