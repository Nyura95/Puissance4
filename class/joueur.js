function Joueur(joueur){
  if(!Array.isArray(joueur)) {
    throw('Joueur prends seulement un tableau')
  }
  // Sauvegarde des joueurs envoyés dans la class
  this.joueur = joueur
  // Par defaut, le premier joueur du tableau commence
  this.tour = 1

  document.getElementById("msgInfo").innerHTML = "Le joueur " + this.getJoueur().name + " commence la partie.";
}

Joueur.prototype.getTour = function() {
  document.getElementById("msgInfo").innerHTML = "C'est le tour du joueur : " + this.getJoueur().name + ".";
  return this.tour;
}

Joueur.prototype.setPlayer = function(joueur) {
  this.joueur.push(joueur)
}

Joueur.prototype.changePlayer = function() {
  this.tour = 3 - this.tour;
}

// Permet de recuperer le joueur qui joue
Joueur.prototype.getJoueur = function() {
  return this.joueur[this.tour - 1]
}
