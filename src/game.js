let stateLoop;
let gameData;
let cardToPlay;
let attackCard;
let chat = false;
let maClasse;
let nomEenemi;
let advClasse;


const clearBoard = ()=>{
    document.getElementById("opponentStats").innerHTML = '';
    document.getElementById("advBoard").innerHTML = '';
    document.getElementById("myBoard").innerHTML = '';
    document.getElementById("myHand").innerHTML = '';
    document.getElementById("myStats").innerHTML = '';
    document.getElementById("turnTimer").innerHTML = '';
    document.getElementById("yourTurn").innerHTML = '';
    document.getElementById("errorBox").innerHTML = '';
}

const buildSection = (data, section)=>{
    data.forEach(element => {
        let carte = document.createElement("div");
        carte.id = element.uid;
        
        if(section == "myHand"){
            carte.onclick = () =>  jouerCarte(element.uid, element.cost);
            carte.className = "myCarte";
        }
        
        if(section == "myBoard"){
            carte.onclick = () => choisirCarteAttaque(element.uid);
            carte.className = "myCarte";
        }

        if(section == "advBoard"){
            carte.onclick = () => attaquerCarte(element.uid);
            carte.className = "advCarte";
        }

        carte.appendChild(document.createTextNode("Health: " + element.hp));
        carte.appendChild(document.createElement("br"));

        carte.appendChild(document.createTextNode("Cout: " + element.cost));
        carte.appendChild(document.createElement("br"));

        carte.appendChild(document.createTextNode("Atk: " + element.atk));
        carte.appendChild(document.createElement("br"));

        carte.appendChild(document.createTextNode("Uid: " + element.uid));
        carte.appendChild(document.createElement("br"));

        element.mechanics.forEach(mechanic =>{
            if(mechanic == "taunt"){
                setTauntImage(element.uid);
            }

            carte.appendChild(document.createTextNode(mechanic));
            carte.appendChild(document.createElement("br"));
        });
        document.getElementById(section).appendChild(carte);
    });
}

const setTauntImage = (id) =>{
    document.getElementById(id).style.backgroundImage = "url('../images/piper.jpg')";
}

const jouerCarte = (uid, cost)=>{
    if(gameData.mp >= cost &&  gameData.yourTurn == true){
        let formData = new FormData();
        formData.append("action", "PLAY");
        formData.append("uid", uid);

        fetch("ajax-game.php", {
            method : "POST",
            credentials : "include",
            body : formData
        })
        .then(response => response.json())
        .then(data => {
            if(typeof data != "object"){
                document.getElementById("errorBox").innerHTML = data;
            }
        })
    }  
}

const choisirCarteAttaque = (uid) =>{
    attackCard = uid;
}

const attaquerCarte = (uid)=>{
    if(attackCard != null){
        let formData = new FormData();
            formData.append("action", "ATTACK");
            formData.append("uid", attackCard);
            formData.append("target", uid);

            fetch("ajax-game.php", {
                method : "POST",
                credentials : "include",
                body : formData
            })
            .then(response => response.json())
            .then(data => {
                if(typeof data != "object"){
                    document.getElementById("errorBox").innerHTML = data;
                }
            })
            attackCard = null;
    }
}


const buildStats = (data, tag, section)=>{
    let stat = document.createElement("div");
    stat.className = "infoStats";

    stat.appendChild(document.createTextNode(tag));
    stat.appendChild(document.createElement("br"));
    stat.appendChild(document.createTextNode(data));

    document.getElementById(section).appendChild(stat);

}

const statsEnemi = (data)=>{
    let section = "opponentStats"
    buildStats(data.hp, "HP: ", section);
    buildStats(data.mp, "MP: ", section);
    buildStats(data.handSize, "Hand: ", section);
    buildStats(data.username, "Adversaire: ", section);
    buildStats(data.heroClass, "Class: ", section);
    buildStats(data.remainingCardsCount, "Cartes: ", section);
    
}

const buildBoard = (data)=>{ 

    gameData = data;
    let hand = data.hand;
    let myBoard = data.board;
    enemi = data.opponent;
    let section = "myStats";

    maClasse = data.heroClass;
    advClasse = enemi.heroClass;
    nomEenemi = enemi.username;

    buildStats(data.hp, "HP: ", section);
    buildStats(data.mp, "MP: ", section);
    buildStats(data.maxMp, "Max MP: ", section);
    buildStats(data.heroClass, "Class: ", section);
    buildStats(data.remainingCardsCount, "Cartes: ", section);

    buildSection(hand, "myHand");
    buildSection(myBoard, "myBoard");

    buildSection(enemi.board, "advBoard");
    statsEnemi(enemi);
    document.getElementById("turnTimer").appendChild(document.createTextNode("Time: " + data.remainingTurnTime));
    document.getElementById("yourTurn").appendChild(document.createTextNode("Votre tour: " + data.yourTurn));
    
}


const state = () => {
    fetch("ajax-state.php", {   // Il faut créer cette page et son contrôleur appelle 
        method : "POST",       // l’API (games/state)
        credentials: "include"
    })
    .then(response => response.json())
    .then(data => {
    
        console.log(data); // contient les cartes/état du jeu.
        if(typeof data == "object"){
            clearBoard();
            buildBoard(data);
        }
        else{
            if(data == "LAST_GAME_WON"){
                affichagePostGame("victoire");
            }
            else if(data == "LAST_GAME_LOST"){
                affichagePostGame("defaite");
            }
        }

        setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
    })
}


const affichagePostGame = (message) =>{

    document.getElementById("playArea").innerHTML = '';

    let endSplash = document.createElement("div");
    endSplash.className = "messageFin";
    if(message == "victoire"){
        endSplash.id = "victoire";
    }
    else{
        endSplash.id = "defaite";
    }

    endSplash.appendChild(document.createTextNode(message + "!"));
    document.getElementById("playArea").appendChild(endSplash);

    clearTimeout(stateLoop);
    
    writeResult(message);
}


const writeResult = (result) => {
    let formData = new FormData();
    formData.append("classe", maClasse);
    formData.append("adversaire", nomEenemi);
    formData.append("advClasse", advClasse);
    formData.append("write", result);

    fetch("ajax-game.php", {
        method : "POST",
        credentials : "include",
        body : formData
    })
    .then(response => response.json())
    .then(data => {
        if(typeof data != "object"){
            document.getElementById("errorBox").innerHTML = data;
        }
    })
}


window.addEventListener("load", () => {
    stateLoop = setTimeout(state, 1000); // Appel initial (attendre 1 seconde)

    document.getElementById("hero").onclick = () =>{
        if(gameData.yourTurn == true){ 
            let formData = new FormData();
            formData.append("action", "HERO_POWER");

            fetch("ajax-game.php", {
                method : "POST",
                credentials : "include",
                body : formData
            })
            .then(response => response.json())
            .then(data => {
                if(typeof data != "object"){
                    document.getElementById("errorBox").innerHTML = data;
                }
            })
        }
    }

    document.getElementById("pass").onclick = () =>{
        if(gameData.yourTurn == true){
            let formData = new FormData();
            formData.append("action", "END_TURN");

            fetch("ajax-game.php", {
                method : "POST",
                credentials : "include",
                body : formData
            })
            .then(response => response.json())
            .then(data => {
                if(typeof data != "object"){
                    document.getElementById("errorBox").innerHTML = data;
                }
            })
        }
    }
    
    document.querySelector("#opponentStats").onclick = () =>{
        attaquerCarte(0);
    }

    document.getElementById("chatButton").onclick = () =>{
        if(chat == false){
            document.getElementById("gameChat").style.display = "block";
            chat = true;
        }
        else{
            document.getElementById("gameChat").style.display = "none";
            chat = false;
        }
    }
});

