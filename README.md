#### Auteur: Jean-Philippe Lacroix - 1240916

# Magix

# Synopsis

### Le but du projet Magix est de créer un jeu à la HeartStone.  Le programme créé utilise les principes de connexion à un serveur via un API, connexion à une base de donnée par un DAO ainsi que l'inégration de gestion d'événements en PHP et Javascript.

#
# But du Jeu 
### Lors d'une partie, deux joueurs s'affrontent.  Ils devront jouer des cartes prpvenant de leur paquet choisi avant la partie, ainsi que des capacités de leur Héro choisi.  
### Les cartess jouées par un joueur ont la capacité d'attaquer les cartes jouées par son adversaire, attaquer le Héro adverse et d'utiliser une habileté spéciale pour affecter le déroulement de la partie.
### Un joueur est déclaré vaincqueuer lorsque la vie du Héro adverse arrive à 0.

#
# Utilisation
## Page d'acceuil 
### Lorsque l'utilisateur démarre le programme, la page d'acceuil est affichée.  Sur cette page, l'utilisateur devra inscrire som nom utilisateur et son mot de passe.  Ces informations seront envoyé au serveur de jeu.  Si les informations sont valides, une clé de jeu sera retournée et l'utilisateur pourra procéder au lobby, sinon l'accès est refusé.
#
## Page de Lobby
### Une fois arrivé dans le lobby, le joueur pourra initier une partie soit contre un autre joueur connecté ou contre un oridnateur pour se pratiquer.  De plus un chat sera disponible pour pouvoir communiquer avec d'autres joueurs.
#
## Page de Jeu

### Une fois la partie commencé le joueur se verra envoyé sur la page de jeu pour affornter son adversaire.

### La section au haut représente l'adversaire et présente certaines informations à son sujet comme: son nom, la classe de héro utilisé, le nombre de points de vies restants ainsi que certains autres détails.

### Les deux sections plus bas représentent les tableaux de jeu.  C'est ici que seront afficées les cartes jouées par les participants et donc celles qui peuvent attaquer et se faire attaquer.  Sur ces cartes ont pouura des informations comme: la vie et l'attaque de la carte ainsi les effets spéciaux de celle-ci.

### Ensuite, on verra la main du joueur.  Ici on peut voir toutes les cartes que le joueur peux jouer, si il a assez d'énergie pour se faire.  Sur les cartes dans la main, on peut voir les mêmes détails que celles mises sur le talbeau de jeu.

### Finalement, il-y-a les détails et actions du joueur.  Dans les détails on verra les mêmes types d'informations que pour l'adversaire, qui seront mises à jour tout au courant de la partie. Pour la section des actions, il s'agit de boutons qui permettent ente autre d'utiliser le pouvoir du Héro, passer ou mettre fin à son tour et accéder au chat lors de la partie.

#
## Controles
### Si le joueur veux jouer une carte dans sa main, il ne sufit que de cliquer sur celle-ci pour l'envoyer sur le tableau de jeu.

### Si le joueur décide d'attaquer, il faut d'abord cliquer sur la carte à utiliser pour l'attaque puis à cliquer sur la carte cible sur le tableau adverse ou sur les détails de l'adversaire pour l'attaquer directement.

### Pour utiliser le pouvoir du Héro, ceder son tour ou accéder au chat, il suffit de cliquer sur le bouton à cet effet.


#
# État du jeu
## Éléments fonctionnels du jeu
- Connexion au serveur de jeu 
- Déconnexion du serveur de jeu
- Accès au lobby 
- Chat dans la page de lobby
- Démarrer une partie contre l'ordinateur
- Démarrer une partie contre un autre joueur
- Afficher l'état du jeu et le mettre à jour
- Jouer une carte de sa main
- Attaque une carte de l'adversaire
- Attaquer l'adversaire
- Utiliser le pouvoir du Héro choisi 
- Ceder son tour
- Accéder au chat pendant une partie
- Message d'erreur lors d'une partie si applicable (cible invalide, hero déjà utilisé, etc.)
- Splash screen indiquant le résultat après une partie 

## Bugs Connus
- Affichage spécial pour effet glow n'apparait pas 
- Problème de connexion à la base de donéées pour la conservation des parties

## Éléments manquants
- Animation JS sur la page d'acceuil
- Page d'affichage des 10 dernieres parties
- Saisie de données de la BD pour affichage des 10 dernières parties