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

## Installez MongoDB, MySQL et SQLite sur votre machine :

### MongoDB :

- Téléchargez et installez MongoDB à partir du [site officiel de MongoDB](https://www.mongodb.com/try/download/community).
- Suivez les instructions spécifiques à votre système d'exploitation pour terminer l'installation.

### MySQL :

- Téléchargez et installez MySQL à partir du [site officiel de MySQL](https://dev.mysql.com/downloads/mysql/).
- Suivez les instructions d'installation fournies pour votre système d'exploitation.
- Créez une base de données nommée `punto` dans MySQL pour stocker les données du jeu.

### SQLite :

- Téléchargez et installez SQLite à partir du [site officiel de SQLite](https://www.sqlite.org/download.html).
- Suivez les instructions d'installation spécifiques à votre système.

> Remarque : Pour MongoDB, aucune configuration supplémentaire n'est requise pour que l'application fonctionne correctement.

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

5. Lancez maintenant l'API en exécutant la commande suivante :

```bash

node api/app.js

```

Voilà ! L'application est maintenant lancée et prête à être utilisée.

## API et enregistrement des données

L'application enregistre les données de fin de partie dans différentes bases de données :

- Les données sont envoyées à MongoDB, MySQL et SQLite à la fin d'une partie complète (2 manches gagnantes).
- Chaque base de données stocke les détails des parties, les mouvements des joueurs, et les scores finaux.

## Notes supplémentaires

- L'application utilise React.js pour le frontend, et différentes bases de données (MongoDB, MySQL, SQLite) pour stocker les données de jeu.
- Les données sont envoyées à l'API à la fin de chaque partie complète (2 manches gagnantes).7

- Vous pouvez exécuter le script de génération de données pour générer des données de jeu aléatoires dans les bases de données. Pour ce faire, exécutez la commande suivante :

```bash

node script/generateGameData.js

```

## Auteur

Ce projet a été créé par Yann-Maël PERON.
