import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contactName:'',
      contactEmail:'',
      contactCompany:'',
      contactEnquiry:''
    };
  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  sendForm(e) { 
     e.preventDefault();
     this.props.firebase.database().ref().child('contact').push(this.state).key;
     this.props.showPopup('Su formulario fue enviado exitosamente!','Contacto')
  }

  render() {
  return (<div className="slide" >
          <div className="padd">

          <Grid item xs={10}>
            <Grid  container spacing={24}>
              <Grid item xs={12}>
                <h2>Contacto</h2>
              </Grid>
            </Grid>
            <form onSubmit={ this.sendForm.bind(this) }>
            <Grid  container spacing={24}>
              <Grid item xs={6}>
                <TextField value={this.state.contactName} onChange={this.handleChange} id="contactName" label="Nombre" fullWidth margin="normal" variant="outlined" required/>
              </Grid>
              <Grid item xs={6}>
                <TextField value={this.state.contactEmail} onChange={this.handleChange} id="contactEmail" label="Correo" fullWidth margin="normal" variant="outlined" type="email" autoComplete="email" required/>
              </Grid>
              <Grid item xs={12}>
                <TextField className="padd0" value={this.state.contactEnquiry} onChange={this.handleChange} id="contactEnquiry" label="Solicitud"  multiline rows="4" fullWidth margin="normal" variant="outlined" required/>
              </Grid>
              <Grid item xs={12} className="text-right">
                 <Button variant="extendedFab" type="submit" color="primary"> Enviar </Button>
              </Grid>
            </Grid>
            </form>
          </Grid>

          </div>
        </div>
        )}
}

export default Contact