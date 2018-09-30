import React, { Component } from 'react'
import Contact from '../pages/Contact'
import Register from '../pages/Register'
import Login from '../pages/Login'
import LeftArrow from './LeftArrow'
import RightArrow from './RightArrow'
import * as firebase from 'firebase'
import Popup from '../modal/Popup'


var config = {
    apiKey: "AIzaSyDA1rZcd7tMB1DWrpRCtOS9iiOm0zrhfwo",
    authDomain: "proyectovml-31d0d.firebaseapp.com",
    databaseURL: "https://proyectovml-31d0d.firebaseio.com",
    projectId: "proyectovml-31d0d",
    storageBucket: "proyectovml-31d0d.appspot.com",
    messagingSenderId: "179860595553"
};
firebase.initializeApp(config);

export default class Slider extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pages: ['Login', 'Registro', 'Contacto'],
      currentIndex: 0,
      translateValue: 0,
      showPopup: false,
      messageError:'',
      titlePop:'',
      userAauth:'',
      oauth:false,
    }
  }
  async  componentWillMount(){

   firebase.auth().onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ oauth:true,userAauth:authUser.email })
        : this.setState({ oauth: false });
    });
  }

  goToPrevSlide = () => {
    if(this.state.currentIndex === 0 ) {
      return this.setState({
        currentIndex: this.state.pages.length - 1,
        translateValue: -this.slideWidth()*(this.state.pages.length - 1)
      })
    }
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex - 1,
      translateValue: prevState.translateValue + (this.slideWidth())
    }));
  }
  
   goToNextSlide = () => {
    if(this.state.currentIndex === this.state.pages.length - 1) {
      return this.setState({
        currentIndex: 0,
        translateValue: 0
      })
    }
    
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1,
      translateValue: prevState.translateValue + -(this.slideWidth())
    }));
  }

  goToSlide(i) { 

    if(i === this.state.currentIndex) return

    if(i > this.state.currentIndex){
      this.setState(prevState => ({
        currentIndex: i,
        translateValue: -(i * this.slideWidth())
      }));
    }else{
      this.setState(prevState => ({
        currentIndex: i,
        translateValue: prevState.translateValue + ((this.state.currentIndex - i) * (this.slideWidth()))
      }));
    }
  }

  slideWidth = () => {
     return document.querySelector('.slide').clientWidth
  }

  togglePopup(){
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  showPopup = (msm,title) => {

      this.setState({
          showPopup: true,
          errorMessage:msm,
          titlePop:title
      });
  }
  isActive(value){
    return 'btn '+((value===this.state.currentIndex) ?'active':'default');
  }
  render() {
    return (
       
        <div className="slider">

          <div className="slider-wrapper gray"
            style={{
              transform: `translateX(${this.state.translateValue}px)`,
              transition: 'transform ease-out 0.45s'
            }}>
              <Login showPopup={this.showPopup} firebase = {firebase} userAauth={this.state.userAauth} oauth={this.state.oauth} />
              
              
              <Register showPopup={this.showPopup} firebase = {firebase} userAauth={this.state.userAauth} oauth={this.state.oauth} />
              <Contact showPopup={this.showPopup} firebase = {firebase}/>
              
          </div>
        
           
               
          {this.state.showPopup ? 
          <Popup
            text={this.state.titlePop}
            message={this.state.errorMessage}
            closePopup={this.togglePopup.bind(this)}
          />
          : null
        }
        <div className="navi-right">
          <div className="menu-m">
            {
                this.state.pages.map((page,i) => {
                    return( <li key={page} className={this.isActive(i)} onClick={this.goToSlide.bind(this,i)}>{page}</li>)
                })
            }
            </div>
            <LeftArrow  goToPrevSlide={this.goToPrevSlide} />
            <RightArrow  goToNextSlide={this.goToNextSlide} />
        </div>
        </div>
      
    );
  }
}