import React, {Component} from 'react';
import {withStyles} from '@material-ui/core';

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import StarIcon from '@material-ui/icons/Star';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import RemoveIcon from '@material-ui/icons/Remove';
import TextField from '@material-ui/core/TextField';

const styles = {
    root: {
        paddingTop: 0,
        paddingLeft: 20,
        paddingRight: 20,
    },
};

const calcStars = rating => {
    let stars = [];
    for (let i = 0; i < rating; i++) {
        stars.push(<StarIcon key={`star-${i}`} style={{color: 'gold'}}/>)
    }
    return stars;
};

class GameListItem extends Component {
    constructor(props) {
        super(props);
        const {game} = props;
        this.state = {
            id: game ? game.id : 'temp',
            name: game ? game.name : '',
            description: game ? game.description : '',
            rating: game ? game.rating : 1,
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });

    };

    handleApiUpdate = (create, update) => {
        this.state.id === 'temp' ? create({
            name: this.state.name,
            description: this.state.description,
            rating: this.state.rating,
        }) : update(this.state)
    };

    render() {
        const {classes, setSelected, selected, isSelected, api} = this.props;
        return (
            <ListItem className={classes.root}>
                <Grid container justify='space-between' alignItems='center'
                      style={{borderBottom: '2px solid #000000', paddingBottom: 10}}>
                    <Grid item xs={10} container direction='column' justify='flex-start'>
                        {
                            isSelected ? (
                                <Grid item xs={12}>
                                    <form className={classes.container} noValidate autoComplete="off">
                                        <TextField
                                            required
                                            label={'Name'}
                                            value={this.state.name}
                                            onChange={this.handleChange('name')}
                                            style={{
                                                marginRight: 20,
                                                width: '70%',
                                            }}
                                            margin="dense"/>
                                        <TextField
                                            id="game-rating"
                                            required
                                            select
                                            label="Rating"
                                            value={this.state.rating}
                                            onChange={this.handleChange('rating')}
                                            style={{
                                                marginRight: 20,
                                                width: '20%',
                                            }}
                                            margin="dense"
                                            SelectProps={{
                                                native: true,
                                            }}>
                                            {[1, 2, 3, 4, 5].map(option => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </TextField>
                                        <TextField
                                            label='Description'
                                            required
                                            value={this.state.description}
                                            onChange={this.handleChange('description')}
                                            multiline
                                            fullWidth
                                            margin='dense'
                                        />
                                    </form>
                                </Grid>
                            ) : (
                                <React.Fragment>
                                    <Typography variant='title' gutterBottom>
                                        {this.state.name}
                                    </Typography>
                                    <Typography variant='body1' paragraph>
                                        {this.state.description}
                                    </Typography>
                                    <Grid item xs={4}>
                                        {
                                            calcStars(this.state.rating)
                                        }
                                    </Grid>
                                </React.Fragment>
                            )
                        }
                    </Grid>
                    <Grid item xs={2} style={{marginLeft: 'auto', alignSelf: 'flex-start'}}>
                        <Grid container direction='column' alignItems='flex-end'>
                            {
                                isSelected ? (
                                    <Button style={{color: '#00FFBB'}}
                                       onClick={() => this.handleApiUpdate(api.create, api.update)}>
                                        <SaveIcon/>
                                    </Button>
                                ) : (
                                    (!isSelected && selected == null) &&
                                    <React.Fragment>
                                        <Button style={{marginBottom: 30}} onClick={() => api.delete(this.state.id)}>
                                            <RemoveIcon/>
                                        </Button>
                                        <Button style={{color: '#dd47ff'}} onClick={() => setSelected(this.state.id)}>
                                            <EditIcon/>
                                        </Button>
                                    </React.Fragment>
                                )
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </ListItem>
        );
    }
}

export default withStyles(styles)(GameListItem);