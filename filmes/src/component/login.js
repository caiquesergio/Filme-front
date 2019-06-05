import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Cadastro from './cadastro';
import Service from '../service/index';

const styles = theme => ({
  paper: {
    position: 'absolute',
    left:'47%',
    top:'40%',
    margin:'-200px',
    width: theme.spacing.unit * 50,
    backgroundColor: 'white',
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class SimpleModal extends React.Component {
  state = {
    login: '',
    password: '',
    cadastro: false,
    logado: false
  }

  handleLogin=async()=>{
    const values = { email: this.state.login, password: this.state.password };
    Service.postAuth(values)
    .then(response => {
      this.setState({logado: response.data.logado})
    })
    .catch(err =>  console.log(err));
  }
  
  handleCadastro=()=>{
    this.setState({ cadastro: !this.state.cadastro });
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const isOpen = this.state.logado ? false :this.props.open
    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={isOpen}
        >
          <div className={classes.paper}>
            {!this.state.cadastro ?
              <div>
                <TextField
                id="outlined-email-input"
                label="Login"
                name="user"
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                value={this.state.login}
                onChange={this.handleChange('login')}
              />
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                value={this.state.password}
                onChange={this.handleChange('password')}
              />
              <div>
                <Button onClick={this.handleLogin}>Login</Button>
                <Button onClick={this.handleCadastro}>Cadastrar</Button>
                <SimpleModalWrapped />
              </div> 
              </div>
              : 
              <Cadastro action={this.handleCadastro}/>
            }
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;