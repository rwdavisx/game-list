import React from 'react';
import {withStyles} from '@material-ui/core';
import GameListItem from './GameListItem';
import Card from "@material-ui/core/Card/Card";
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List'
import AddIcon from '@material-ui/icons/Add';

const styles = {
    root: {
        width: 600,
    },
    fab: {
        margin: 0,
        left: '50%',
        bottom: 20,
    }
};

const GameList = props => {
    const {classes, games, setSelected, selected, api} = props;
    const GameBoardContainer = itemProps => <Card
        to={props.to}
        {...itemProps}
        classes={{root: classes.background}}/>;
    return (
        <div>
            <List className={classes.root} component={GameBoardContainer}>
                {
                    games.sort((a, b) => {
                        return a.name > b.name
                    }).map(game =>
                        <GameListItem
                            key={game.id}
                            game={game}
                            setSelected={setSelected}
                            selected={selected}
                            isSelected={selected === game.id}
                            api={api}
                        />)
                }
                {
                    selected === 'temp' &&
                    <GameListItem
                        key={'createGame'}
                        game={null}
                        setSelected={setSelected}
                        selected={selected}
                        isSelected={true}
                        api={api}
                    />
                }
            </List>
            {
                selected == null &&
                <Button
                    mini
                    variant='fab'
                    className={classes.fab}
                    style={{color: 'white', backgroundColor: '#e9007e'}}
                    onClick={() => setSelected('temp')}>
                    <AddIcon/>
                </Button>
            }
        </div>
    );
};

export default withStyles(styles)(GameList);