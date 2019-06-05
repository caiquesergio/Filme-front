import React, { Component } from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {withStyles} from '@material-ui/styles';
import Login from './login';
import './cards.css';

const styles = theme => (({
  card: {
    marginBottom: 20,
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

class Cards extends Component {
  state = {
    expanded: false,
    data: [],
    modal: false
  }

  handleExpandClick = ()=> {
    this.setState({ expanded: !this.state.expanded})
  }
  
  validate=()=>{
    this.setState({ modal: !this.state.modal });
  }
  
  render(){
    const { classes, data, session } = this.props
    return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', padding: '20px'}}>
    {
      data.map((value, index) => {
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
            <IconButton aria-label="Add to favorites" onClick={() => this.validate(session)}>
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
        <Login open={this.state.modal} />
      </div>
    );
  }
}
export default withStyles(styles)(Cards);
