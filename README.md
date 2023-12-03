# Punto - Principe du jeu

Le but du jeu Punto est simple : aligner 5 cartes de votre couleur. Chaque joueur pose tour à tour une carte, en les connectant les unes aux autres ou en recouvrant une carte déjà posée, à condition que celle-ci ait une valeur inférieure.

## Mécanique de jeu

- **Objectif**: Aligner 5 cartes de votre couleur sur le plateau de jeu.
- **Nombre de joueurs**: De 2 à 4 joueurs.
- **Déroulement d'une partie**:
  - Chaque joueur pose une carte à tour de rôle sur le plateau.
  - La carte peut être posée à côté d'une carte déjà jouée ou recouvrir une carte de valeur inférieure.
  - L'objectif est de créer une ligne de 5 cartes de votre couleur, soit horizontalement, verticalement ou en diagonale.

## Stratégie et Astuces

- **Connecter les cartes**: L'alignement des cartes est essentiel. Créez des connexions pour aligner vos cartes de manière stratégique.
- **Recouvrement**: Le recouvrement est une tactique importante. Recouvrez les cartes des adversaires pour bloquer leurs alignements et renforcer les vôtres.
- **Anticipation**: Anticipez les mouvements des adversaires pour bloquer leurs séquences tout en poursuivant vos propres alignements.

## Fin de la partie

La partie prend fin dès qu'un joueur parvient à aligner 5 cartes de sa couleur de manière consécutive. Ce joueur est déclaré vainqueur de la partie.

## Remarque

Punto est un jeu simple à comprendre, mais qui demande de la stratégie et de l'anticipation. Les décisions de placement des cartes sont cruciales pour gagner la partie.

## Comment lancer l'application

1. Assurez-vous d'avoir Node.js installé sur votre système.
2. Clonez ce dépôt sur votre machine locale.
3. Installez les dépendances en exécutant la commande suivante dans le répertoire du projet :

```bash

npm install

```

4. Lancez l'application en exécutant la commande suivante :

```bash

npm start

```

## API et enregistrement des données

L'application enregistre les données de fin de partie dans différentes bases de données :

- Les données sont envoyées à MongoDB, MySQL et SQLite à la fin d'une partie complète (2 manches gagnantes).
- Chaque base de données stocke les détails des parties, les mouvements des joueurs, et les scores finaux.

## Notes supplémentaires

- L'application utilise Express.js pour le backend, et différentes bases de données (MongoDB, MySQL, SQLite) pour stocker les données de jeu.
- Les données sont envoyées à l'API à la fin de chaque partie complète (2 manches gagnantes).

## Auteur

Ce projet a été créé par Yann-Maël PERON.
