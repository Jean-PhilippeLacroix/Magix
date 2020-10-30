

const state = () => {
    $.ajax({
        url : "ajax-state.php", // Il faut créer cette page et son contrôleur appelle 
                        // l’API (games/state)
        type : "POST"
    })
    .done(function (msg) { 
    let reponse = JSON.parse(msg);

    console.log(reponse); // contient les cartes/état du jeu.

    setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
    })
}

window.addEventListener("load", () => {
setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
});
