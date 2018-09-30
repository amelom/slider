import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import SvgIcon from '@material-ui/core/SvgIcon'

class Register extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      registerEmail:'',
      registerPassword:'',
      registerCel:'',
      registerPasswordRetipe:'',
      registerName:'',
      registerGender:'',
      value: 'female',
      checkedB: false,
      confirmPss:''
    }
  }
handleChangeCheck = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleChangeC = event => {
   
    if (event.target.value!=this.state.registerPassword) {
      this.setState({
        confirmPss:'Las contraseñas no coinciden'
      });
    }else{
      this.setState({
        confirmPss:''
      });
    }

    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleChangeop = event => {
    this.setState({ value: event.target.value });
  };

  createUser(e) { 
    e.preventDefault();
    this.props.firebase.auth()
    .createUserWithEmailAndPassword(this.state.registerEmail,this.state.registerPassword)
    .catch((error) => {  this.props.showPopup(error.message,'Error de registro') })
  }

  signOut(){
    this.props.firebase.auth()
    .signOut()
    .then(() => { this.setState({ oauth:false }); }) 
  }

  render() {

  return( <div className="slide" >
  			<div className="padd">
        <div>
        {!this.props.oauth &&
          <div>
          <Grid item xs={10}>
            <Grid  container spacing={24}>
              <Grid item xs={12}>
                <h2>Registro</h2>
              </Grid>
            </Grid>
            <form onSubmit={ this.createUser.bind(this) }>
            <Grid  container spacing={24}>
              <Grid item xs={6}>
                <TextField value={this.state.registerName} onChange={this.handleChange} id="registerName" label="Nombre" fullWidth margin="normal" variant="outlined" required/>
              </Grid>
              <Grid item xs={6}>
                <TextField value={this.state.registerEmail} onChange={this.handleChange} id="registerEmail" label="Correo" fullWidth margin="normal" variant="outlined" type="email" required/>
              </Grid>
              <Grid item xs={6}>
                <TextField value={this.state.registerPassword} onChange={this.handleChange} id="registerPassword" label="Contraseña" fullWidth margin="normal" variant="outlined" type="password" required/>
              </Grid>
              <Grid item xs={6}>
                <TextField value={this.state.registerPasswordRetipe} onChange={this.handleChangeC} id="registerPasswordRetipe" label="Repite Contraseña" fullWidth margin="normal" variant="outlined" helperText={this.state.confirmPss} type="password" required/>
              </Grid>
              <Grid item xs={6}>
                <TextField value={this.state.registerCel} onChange={this.handleChange} id="registerCel" label="Celular" fullWidth margin="normal" variant="outlined" />
              </Grid>
             <Grid item xs={6}>
                <FormControl component="fieldset" >
                  <FormLabel component="legend">Genero</FormLabel>
                  <RadioGroup
                    aria-label="Gender"
                    name="gender1"
                    value={this.state.value}
                    onChange={this.handleChangeop}
                  >
                    <FormControlLabel value="female" control={<Radio color="primary"/>} label="Female" />
                    <FormControlLabel value="male" control={<Radio color="primary"/>} label="Male" />
                  
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} className="text-center">
                   <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.checkedB}
                        onChange={this.handleChangeCheck('checkedB')}
                        value="checkedB"
                        color="primary"
                        required
                      />
                    }
                    label="Acepto terminos y condiciones"
                  />
                
              </Grid>
              <Grid item xs={12} className="text-right">
                   <Button variant="extendedFab" type="submit" color="primary"> Enviar </Button>
              </Grid>
            </Grid>
            </form>
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
             
            <div><br/><br/>Ha iniciado sesión como : <br/> <strong>{this.props.userAauth}</strong> , <br/> Para realizar un nuevo registro cierre sesión</div>         
          </Paper>
          </Grid>
        }
      </div>
          </div>
  		</div>
    );
  }
}

export default Register