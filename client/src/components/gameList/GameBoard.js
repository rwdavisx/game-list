import React, {Component} from 'react';
import {withStyles} from '@material-ui/core';
import {getGames, addGame, deleteGame, editGame} from '../../services/GameAPI';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import GameList from './GameList';

const styles = {
    root: {
        marginTop: 40,
        paddingTop: 30,
        marginBottom: 40,
        paddingBottom: 30,
    },
    form: {
        marginTop: 20,
    },
    header: {
        width: 600,
        height: 50,
        backgroundColor: '#00FFBB'
    }
};

class GameBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            games: [],
            selected: null
        };
    }

    componentDidMount() {
        this.getGames();
    }

    setSelected = id => {
        this.setState({
            selected: id,
        });
    };

    getGames = getGames.bind(this);

    addGame = addGame.bind(this);

    deleteGame = deleteGame.bind(this);

    editGame = editGame.bind(this);

    render() {
        const {classes} = this.props;
        const {games, selected} = this.state;
        const api = {
            create: this.addGame,
            read: this.getGames,
            update: this.editGame,
            delete: this.deleteGame,
        };
        return (
            <section>
                <Grid container alignItems='center' className={classes.root} direction='column'>
                    <Card
                        className={classes.header}
                        style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10}}>
                        <Typography align='center' variant='title'>
                            What are your favorite games?
                        </Typography>
                    </Card>
                    <GameList
                        games={games}
                        selected={selected}
                        setSelected={this.setSelected}
                        handleChange={this.handleChange}
                        api={api}/>
                </Grid>
            </section>
        );
    }
}

export default withStyles(styles)(GameBoard);