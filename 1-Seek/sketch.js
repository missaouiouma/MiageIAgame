let target, vehicle;
let vehicule;
let maxSpeedSlider, maxForceSlider;
let vehicles = [];

// la fonction setup est appelée une fois au démarrage du programme par p5.js
function setup() {
  // on crée un canvas de 800px par 800px
  createCanvas(800, 800);

  // TODO: créer un tableau de véhicules en global

  // Initialisation de plusieurs véhicules avec des positions aléatoires
  for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(height);
    vehicles.push(new Vehicle(x, y));
  }


  maxSpeedSlider = createSlider(0, 20, 10, 1); // min, max, valeur initiale, pas
  maxSpeedSlider.position(10, height + 20);  // Positionner le slider sur l'interface

  maxForceSlider = createSlider(0, 2, 0.25, 0.05); // min, max, valeur initiale, pas
  maxForceSlider.position(10, height + 50);


  // ajouter nb vehicules au tableau dans une boucle
  // avec une position random dans le canvas

  // La cible est un vecteur avec une position aléatoire dans le canvas
  target = createVector(random(width), random(height));

}

// la fonction draw est appelée en boucle par p5.js, 60 fois par seconde par défaut
// Le canvas est effacé automatiquement avant chaque appel à draw
function draw() {
  // fond noir pour le canvas
  background(0);

  // A partir de maintenant toutes les formes pleines seront en rouge
  fill("red");
  // pas de contours pour les formes.
  noStroke();

  // mouseX et mouseY sont des variables globales de p5.js, elles correspondent à la position de la souris
  // on les stocke dans un vecteur pour pouvoir les utiliser avec la méthode seek (un peu plus loin)
  // du vehicule

  target.x = mouseX;
  target.y = mouseY;

  // Dessine un cercle de rayon 32px à la position de la souris
  // la couleur de remplissage est rouge car on a appelé fill(255, 0, 0) plus haut
  // pas de contours car on a appelé noStroke() plus haut
  circle(target.x, target.y, 32);

  // Mise à jour et dessin de chaque véhicule
  for (let vehicle of vehicles) {
    vehicle.applyBehaviors(target);
    vehicle.update();
    vehicle.show();
  }

  fill(255);
  noStroke();
  textSize(16);
  text(`Max Speed: ${maxSpeedSlider.value()}`, 10, height - 60);
  text(`Max Force: ${maxForceSlider.value()}`, 10, height - 30);

    // TODO: boucle sur le tableau de véhicules
  // pour chaque véhicule : seek, update, show
}
