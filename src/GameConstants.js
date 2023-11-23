class GameConstants {
  static DECK = [9, 9, 8, 8, 7, 7, 6, 6, 5, 5, 4, 4, 3, 3, 2, 2, 1, 1];
  static COLORS = ["Red", "Cyan", "Green", "Yellow"];
  static CARD_SIZE = 90;
  static BOARD_DIMENSION = 6;

  static shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  static removeFirstOccurrence(array, value) {
    let found = false;
    let index = -1;

    for (let i = 0; i < array.length; i++) {
      if (array[i] === value) {
        found = true;
        index = i;
        break;
      }
    }

    if (found) {
      return array.filter((v, idx) => idx !== index);
    } else {
      return array;
    }
  }

  static convert1DIndexTo2DCoordinates(index, dimX, dimY) {
    return {
      x: index % dimX,
      y: Math.trunc(index / dimX),
    };
  }

  static convert2DCoordinatesTo1DIndex(x, y, dimX, dimY) {
    return y * dimX + x;
  }

  static initializePlayerDecks() {
    const playerDecks = Array.from({ length: 4 }, () =>
      GameConstants.shuffleArray([...GameConstants.DECK])
    );
    return playerDecks;
  }
}


export default GameConstants;
