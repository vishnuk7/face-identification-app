import React, { Component } from 'react';
import Clarifai from "clarifai";

import './App.css';
import Particles from 'react-particles-js';
import Navigation from './components/navigation/Navigation';
import InputForm from './components/inputform/InputForm';
import Facerecognition from './components/facerecognition/Facerecognition';


//Clarifai
const app = new Clarifai.App({
  apiKey:"e3f9fbf91a3a40af909d158de2af8d63"
});

const particles = {
  particles: {
    number: {
      value: 300,
      density: {
        enable: true,
        value_area: 1000
      }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1
    },
  }
};

class App extends Component {
  state = {
    input:"",
    imageUrl:"",
    box:{}
  }

  
  calculateFaceLocation = data => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomCol: height - clarifaiFace.right_col * height
    };
  };

  displayFaceBox = box => {
    console.log(box);
    this.setState({ box: box });
  };


  onInputChange = (e)=>(this.setState({input:e.target.value}));

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response =>
        this.displayFaceBox(this.calculateFaceLocation(response))
      )
      .catch(err => console.log(err));
  };


  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particles} />
        <Navigation />
        <InputForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
         />
        <Facerecognition 
          box={this.state.box}
          imageUrl={this.state.imageUrl}
        />
      </div>
    );
  }
}

export default App;
