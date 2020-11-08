


const clearBoard = ()=>{
    document.getElementById("advBoard").innerHTML = '';
    document.getElementById("myBoard").innerHTML = '';
    document.getElementById("myHand").innerHTML = '';
}

const buildBoard = (data)=>{ 

    let hand = data.hand;
    hand.forEach(element => {
        console.log(element.hp);
        let carte = document.createElement("div");
        carte.className = "carte";
        carte.appendChild(document.createTextNode(element.hp));
        carte.appendChild(document.createTextNode(element.cost));
        carte.appendChild(document.createTextNode(element.atk));
        element.mechanics.forEach(mechanic =>{
            carte.appendChild(document.createTextNode(mechanic));
        });
        document.getElementById("myHand").appendChild(carte);
    });

}



const state = () => {
    fetch("ajax-state.php", {   // Il faut créer cette page et son contrôleur appelle 
        method : "POST",       // l’API (games/state)
        credentials: "include"
    })
.then(response => response.json())
.then(data => {
    
    console.log(data); // contient les cartes/état du jeu.
    if(data != "WAITING"){
        clearBoard();
        buildBoard(data);
    }
    
    setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
    })
}

window.addEventListener("load", () => {
setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
});

