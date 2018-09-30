import React from 'react'
import Button from '@material-ui/core/Button';

class Popup extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <h1 className="text-center">{this.props.text}</h1>
          <div>{this.props.message}
            <br/>
            <br/>
          </div>
          <Button onClick={this.props.closePopup} variant="contained" color="primary" >
            Aceptar
          </Button>
        </div>
      </div>
    );
  }
}

export default Popup