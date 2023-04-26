export { Player }

class Player {
    #playerName;
    #playerScore;

    constructor(nameArg, scoreArg) {
        this.#playerName = nameArg;
        this.#playerScore = scoreArg;
    }

    getName() {
        return this.#playerName;
    }
    getScore() {
        return this.#playerScore;
    }

    setName(name) {
        this.#playerName = name;
    }

    setScore(score) {
        this.#playerScore = score;
    }

}