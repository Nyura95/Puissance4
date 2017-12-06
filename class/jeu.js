function Jeu(jeu) {
  // creation du plateau comprenant la grille
  this.plateau = new Array()
  // -1 = partie nulle, 0 = partie en cours, 1 = partie gagnée par le joueur 1, 2 = partie gagnée par le joueur 2
  this.statusDuJeu = 0
  // nb de coups total joués
  this.coups = 0
  // lignes
  this.lig = 6
  // colonnes
  this.col = 7

  //Creation et nitialisation de la grille
  new Grille().init(this, jeu)

  let mesJoueurs = [
    {
      id: 1,
      name: 'Alexis',
    },
    {
      id: 2,
      name: 'Lola',
    },
  ]

  // Creation d'objet Joueurs
  this.joueurs = new Joueur(mesJoueurs)

  new Bouton(this)
}

// Getter et setter
Jeu.prototype.getPlateau = function() {
  return this.plateau
}
Jeu.prototype.setPlateau = function(plateau) {
  this.plateau = plateau
}
Jeu.prototype.getGameStatus = function() {
  return this.statusDuJeu
}
Jeu.prototype.getCoups = function() {
  return this.coups
}
Jeu.prototype.getLig = function() {
  return this.lig
}
Jeu.prototype.getCol = function() {
  return this.col
}

Jeu.prototype.diriger = function(event) {
  // retourne lelement selectionne lors d'un clic
  // les coordonnees de la colonne
  var colonne = event.target.dataset.column
  if (colonne) {
    // on converti la variable colonne en int
    // on renvoie vers la fonction jouer
    this.jouer(parseInt(colonne))
  }
}

Jeu.prototype.jouer = function(colonne) {
  // Vérifier si la partie est encore en cours
  if (this.statusDuJeu != 0) {
    if (window.confirm('La partie est finie!\nVoulez vous recommencer?')) {
      this.reset()
    }
    return
  }

  // Trouver la première case libre dans la colonne
  var ligne

  for (var i = 0; i < this.lig; i++) {
    if (!this.plateau[i][colonne].className) {
      ligne = i
      break
    }
  }
  // si la ligne est undefined alors on sort de la table, il ny a donc plus de place dans la colonne
  if (ligne === undefined) {
    document.getElementById('msgInfo').innerHTML =
      "Il n'y a plus de place dans la colonne."
    return
  }

  // Effectuer le coup
  this.set(ligne, colonne, this.joueurs.getTour())

  // Vérifier s'il y a un gagnant, ou si la partie est finie
  if (this.gagner(ligne, colonne, 'joueur' + (3 - this.joueurs.getTour()))) {
    this.statusDuJeu = 3 - this.joueurs.getTour()
  } else if (this.coups >= this.lig * this.col) {
    this.statusDuJeu = -1
  }

  //Si la partie est finie, un message s'affiche en fonction du statuts du jeu, nul ou gagné par un joueur
  switch (this.statusDuJeu) {
    case -1:
      document.getElementById('msgInfo').innerHTML = 'Partie Nulle!'
      break
    case 1:
      document.getElementById('msgInfo').innerHTML = 'Le joueur 1 a gagné'
      break
    case 2:
      document.getElementById('msgInfo').innerHTML = 'Le joueur 2 a gagné'
      break
  }
}
;(Jeu.prototype.set = function(ligne, colonne, joueur) {
  // Coloration de la case où je joueur à joué
  this.plateau[ligne][colonne].className = 'joueur' + joueur
  // Incrémentation du nb de coups
  this.coups++
  // Le joueur change
  this.joueurs.changePlayer()
}),
  (Jeu.prototype.gagner = function(ligne, colonne, classNom) {
    // Horizontal
    var cmpt = 0
    for (var j = 0; j < this.col; j++) {
      cmpt = this.plateau[ligne][j].className == classNom ? cmpt + 1 : 0
      if (cmpt >= 4) {
        return true
      }
    }
    // Vertical
    cmpt = 0
    for (var i = 0; i < this.lig; i++) {
      cmpt = this.plateau[i][colonne].className == classNom ? cmpt + 1 : 0
      if (cmpt >= 4) {
        return true
      }
    }
    // Diagonal
    cmpt = 0
    var decalage = ligne - colonne
    for (
      var i = Math.max(decalage, 0);
      i < Math.min(this.lig, this.col + decalage);
      i++
    ) {
      cmpt = this.plateau[i][i - decalage].className == classNom ? cmpt + 1 : 0
      if (cmpt >= 4) {
        return true
      }
    }
    // Anti-diagonal
    cmpt = 0
    decalage = ligne + colonne
    for (
      var i = Math.max(decalage - this.col + 1, 0);
      i < Math.min(this.lig, decalage + 1);
      i++
    ) {
      cmpt = this.plateau[i][decalage - i].className == classNom ? cmpt + 1 : 0
      if (cmpt >= 4) {
        return true
      }
    }
    return false
  })

// reinitialisation du jeu, la boucle parcours chaque cellule et remplace
// la classe de chaque td par un contenu vide
Jeu.prototype.reset = function() {
  for (var i = 0; i < this.lig; i++) {
    for (var j = 0; j < this.col; j++) {
      this.plateau[i][j].className = ''
    }
  }
  this.coups = 0
  this.statusDuJeu = 0
}

// delai pour la lecture du code au dessus, puis les changements s'effectues apres 100ms
setTimeout(function() {
  var jeu = new Jeu(document.getElementById('jeu'))
}, 100)
