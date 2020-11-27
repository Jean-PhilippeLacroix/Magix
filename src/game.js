let gameData = null;
let cardToPlay = null;
let attackCard = null;
let chat = false;


const clearBoard = ()=>{
    document.getElementById("opponentStats").innerHTML = '';
    document.getElementById("advBoard").innerHTML = '';
    document.getElementById("myBoard").innerHTML = '';
    document.getElementById("myHand").innerHTML = '';
    document.getElementById("myStats").innerHTML = '';
    document.getElementById("turnTimer").innerHTML = '';
    document.getElementById("yourTurn").innerHTML = '';
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

            if(mechanic == "charge" ){
                setChargeImage(element.id);
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
            
            console.log(data);
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
                console.log(data);
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
    let enemi = data.opponent;
    let section = "myStats";

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
        if(data != "WAITING"){
            clearBoard();
            if(data == "LAST_GAME_WON"){
                affichagePostGame("victoire");
            }
            else if(data == "LAST_GAME_LOST"){
                affichagePostGame("defaite");
            }
            else{
                buildBoard(data);
            }
        }

        
        setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
    })
}


const affichagePostGame = (message) =>{

    document.getElementById("playArea").innerHTML = '';

    let endSplash = document.createElement("div");
    endSplash.id = "endSplash";
    if(message == "victoire"){
        endSplash.className = "victoireMessage";
    }
    else{
        endSplash.className = "defaiteMessage";
    }

    endSplash.appendChild(document.createTextNode(message + "!"));

    console.log("fin de partie");
    
    writeResult(message);
}

const writeResult = (result) => {
    let formData = new FormData();
    formData.append("classe", gameData.heroClass);
    formData.append("adversaire", gameData.opponent.username);
    formData.append("advClasse", gameData.opponent.heroClass);
    formData.append("write", result);

    fetch("ajax-game.php", {
        method : "POST",
        credentials : "include",
        body : formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
}


window.addEventListener("load", () => {
    setTimeout(state, 1000); // Appel initial (attendre 1 seconde)

    document.getElementById("hero").onclick = () =>{
        if(gameData.yourTurn == true && gameData.heroPowerAlreadyUsed == false){
            let formData = new FormData();
            formData.append("action", "HERO_POWER");

            fetch("ajax-game.php", {
                method : "POST",
                credentials : "include",
                body : formData
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
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
                console.log(data);
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

