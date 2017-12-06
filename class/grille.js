function Grille() {}

// initialisation de la grille
Grille.prototype.init = function(jeu, parent) {
  var table = document.createElement('table')
  table.id = 'plateau'

  var plateau = jeu.getPlateau()

  for (var i = jeu.getLig() - 1; i >= 0; i--) {
    var tr = document.createElement('tr')
    plateau[i] = []
    for (var j = 0; j < jeu.getCol(); j++) {
      var td = document.createElement('td')
      td.dataset.column = j
      tr.appendChild(td)
      plateau[i][j] = td
    }
    table.appendChild(tr)
  }
  parent.innerHTML = ''
  parent.appendChild(table)

  jeu.setPlateau(plateau)

  table.addEventListener('click', function(e) {
    jeu.diriger(e)
  })
}
