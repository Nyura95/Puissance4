function Joueur(joueur) {
  if (!Array.isArray(joueur)) {
    throw 'La class joueur prends seulement un tableau'
  }
  // Sauvegarde des joueurs envoyés dans la class
  this.joueur = joueur

  // Par defaut, le premier joueur du tableau commence (on increment)
  this.tour = 1

  document.getElementById('msgInfo').innerHTML =
    'Le joueur ' + this.getJoueur().name + ' commence la partie.'
}

//Affiche et retourne le tour en cours
Joueur.prototype.getTour = function() {
  document.getElementById('msgInfo').innerHTML =
    "C'est le tour du joueur : " + this.getJoueur().name + '.'
  return this.tour
}

// Ajoute un joueur
Joueur.prototype.setPlayer = function(joueur) {
  this.joueur.push(joueur)
}

//Change de joueur
Joueur.prototype.changePlayer = function() {
  // 3 - 1 = 2
  // 3 - 2 = 1
  this.tour = 3 - this.tour
}

// Permet de recuperer le joueur qui joue
Joueur.prototype.getJoueur = function() {
  return this.joueur[this.tour - 1]
}
