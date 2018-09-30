import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import SvgIcon from '@material-ui/core/SvgIcon'

class Login extends React.Component {

constructor(props) {
    super(props);
    this.state = {
      email:'',
      password:'',
      error:''
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  sendRequest(e) { 
     e.preventDefault();
    this.props.firebase.auth()
    .signInWithEmailAndPassword(this.state.email, this.state.password)
    .catch((error) => { this.props.showPopup(error.message,'Error de inicio de sesion') }) 
  }

  signOut(){
    this.props.firebase.auth()
    .signOut()
    .then(() => { this.setState({ oauth:false }); }) 
  }

   render() {

    return ( <div className="slide gray" >
  		<div className="padd">
      <div>
      {!this.props.oauth &&
        <div>
          <Grid  container spacing={24}>
        
          <Grid item xs={4} className="ma">
            <Paper className="padd ">
            <Grid  container spacing={24}>
              <Grid item xs={12} className="text-center">
                <h2>Login</h2>
              </Grid>
            </Grid>
            <form onSubmit={ this.sendRequest.bind(this) }>
              <Grid  container spacing={24}>
                <Grid item xs={12}>
                  <TextField id="email" value={this.state.email} onChange={this.handleChange} label="Correo" fullWidth margin="normal" variant="outlined" required/>
                </Grid>
                <Grid item xs={12}>
                    <TextField value={this.state.password}  onChange={this.handleChange} id="password" label="Contraseña" fullWidth type="password" margin="normal" variant="outlined" required/>
                </Grid>
                 <Grid item xs={12} className="text-right">
                     <Button className="buttonC" variant="extendedFab" type="submit" color="primary"> Entrar </Button>
                </Grid>
              </Grid>
            </form>
            </Paper>
           </Grid>
          
           </Grid>

        </div>
        }
      </div>
      <div>
        {this.props.oauth &&
          <Grid item xs={4} className="ma">
          <Paper className="padd ">
            <Grid item xs={12} className="text-center">
              <Button  onClick={this.signOut.bind(this)} variant="fab" color="secondary" aria-label="Edit" >
              <SvgIcon >
                <path d="M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13" />
                </SvgIcon>
            </Button>
            </Grid>
             
            <div><br/><br/>Ha iniciado sesión como : <br/> <strong>{this.props.userAauth}</strong></div>         
          </Paper>
          </Grid>
        }
      </div>
      </div>
      
  </div>
  );
  }
}

export default Login