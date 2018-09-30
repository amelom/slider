import React from 'react';

class Menu extends React.Component {
  constructor(props) {
    super(props);  
  }

  render() {
    return (
	    <div  className="li" onClick={this.props.goToSlide()}>
	  		{this.props.text}
	    </div>
	  );
	}
}

export default Menu;