import axios from "axios";
import {Config} from "../Config";

export function getGames() {
    axios.get(`${Config.ApiHost}/games`)
        .then(res => {
            this.setState(prevState => ({
                ...prevState,
                games: res.data
            }));
        })
        .catch(err => {
            console.log(err)
        });
}

export function addGame(game) {
    axios.post(
        `${Config.ApiHost}/games`,
        game).then(() => {
            this.getGames()
        }
    ).then(() => {
        this.setState(prevState => ({
            ...prevState,
            selected: null
        }), this.getGames());
    });
}

export function deleteGame(id) {
    axios.delete(
        `${Config.ApiHost}/games/${id}`)
        .then(() => {
            this.setState(prevState => ({
                ...prevState,
                selected: null
            }), this.getGames());
        });
}

export function editGame(game) {
    axios.put(
        `${Config.ApiHost}/games/${game.id}`,
        {
            ...game,
            name: game.name,
            description: game.description,
            rating: game.rating,
        }
    ).then(() => {
        this.setState(prevState => ({
            ...prevState,
            selected: null
        }), this.getGames());
    });
}
