function Bouton(joueurs, jeu){
  var boutons = document.getElementsByTagName('input');
  var clic = this;
  for (var i = 0; i < boutons.length; ++i) {
    var btn = boutons[i];
    //opti a faire

    if(btn.id === "Reset") {
        boutons[i].addEventListener('click', function() {
           clic.Reset(joueurs);
         });
    }
  }
}


Bouton.prototype.Reset = function(jeu) {
  jeu.reset();
}
