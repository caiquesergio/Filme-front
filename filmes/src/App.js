import React, { Component } from 'react';
import AppService from './service/index';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {withStyles} from '@material-ui/styles';
import './App.css';

const films = ['Toy Story 2', 'Creed', 'Hacksaw Ridge', 'Revenge of the Sith', 'Solo: A Star Wars Story', 'Rogue One: A Star Wars Story', 'The Empire Strikes Back',  'Return of the Jedi','The Force Awakens', 'The Last Jedi'];

const styles = theme => (({
  card: {
    maxWidth: 340,
  },
  media: {
    height: 0,
    paddingTop: '100.110%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',

  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },

}));

class App extends Component {
  state = {
    expanded: false,
    data: [],
    loading: true,
    email: '',
    password:'',
  }
 
  async componentDidMount(){
    await films.map(values => AppService.getFilm(values).then(data => {
      this.setState({ data: [ ...this.state.data, data],loading:false });
    }));
  }  

  handleExpandClick = ()=> {
    this.setState({ expanded: !this.state.expanded})
  } 
  
  render(){
    console.log(JSON.stringify(this.state.data))
    const { classes} = this.props
    return (

    <div>
    {
      this.state.data.map((value, index) => {
        return(  
        <Card className={classes.card}>
          <CardHeader
            action={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
            title={value.Title}
            subheader={value.Year}
          />
          <CardMedia
            className={classes.media}
            image={value.Poster} 
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
            <div> {value.Plot} </div>
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="Add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph></Typography>
              <Typography paragraph>
              <div> <b>Language</b> {value.Language} </div>
              </Typography>
              <Typography paragraph>
                <div> <b>Actors:</b> {value.Actors} </div>
              </Typography>
              <Typography paragraph>
                <div> <b>Genere:</b> {value.Genre} </div>
              </Typography>
              <Typography>
                <div> <b>Director:</b> {value.Director} </div> 
              </Typography>
            </CardContent>
          </Collapse>
          </Card>          
            );
          })            
        }
      </div>
    );
  }
}
export default withStyles(styles) (App);
