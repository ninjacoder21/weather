import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Button from 'material-ui/Button';

class App extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.loadScript = this.loadScript.bind(this);
    this.state = {
      city: 'San Mateo US'
    }
  }

  componentWillMount(){
    console.log(' loaind... :');
    this.loadScript({
      src: 'https://maps.googleapis.com/maps/api/js?sensor=false',
      id: 'script-mapsjs-core',
      callback: () => this.setState({mapsjsCoreLoaded: true})
    });
    console.log(' mapsjsCoreLoaded :'+this.state.mapsjsCoreLoaded);
  }

  handleChange(evnt) {
    evnt.preventDefault();
    this.setState({ [evnt.target.name] : evnt.target.value });
  }

  loadScript( {src, id, callback} ) {
    if(id && document.getElementById(id)){
      return; // don't accidentally re-add
    }
    const script = document.createElement( 'script' );
    if(callback){
      script.onload = callback;
    }
    if(id){
      script.setAttribute( 'id', id );
    }
    script.setAttribute( 'src', src );
    document.body.appendChild( script );
   
  }

  getGeoCode = (evnt) => {
    evnt.preventDefault();
    var geocoder =  new window.google.maps.Geocoder();
    geocoder.geocode( { 'address': this.state.city}, function(results, status) {
      if (status == window.google.maps.GeocoderStatus.OK) {
        alert("location : " + results[0].geometry.location.lat() + " " +results[0].geometry.location.lng()); 
      } else {
        alert("Something got wrong " + status);
      }
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Weather Information for {this.state.city}</h1>
        </header>
        <div className="App-intro">
          <div>
            <FormControl >
              <InputLabel htmlFor="name-simple">Please search City</InputLabel>
              <Input id="name-simple" value={this.state.city}  name="city" onChange={this.handleChange} />
            </FormControl>
             <Button variant="raised" color="default" onClick={this.getGeoCode} className="Weather-Button" >
               Get Weather Info
             </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
