import React, {useState} from "react";
import logo from './logo.svg';
import './App.css';
import VoiceVisualizer from "./voiceVisualizer";
import VoiceAssistant from "./voiceAssistant";

import path from 'path'


function App() {
    
    const [isStarted, setIsStarted] = useState(false)
    const voiceVisualizer = new VoiceVisualizer()
    const voiceAssistant = new VoiceAssistant()
    
    const changeModeAssistant = async (event)=>{
        if(!isStarted){
            
            await voiceAssistant.startAssistant()
            
            console.log(path.resolve('./'))
            
            await voiceVisualizer.startVisualization()
            setIsStarted(true)
            console.log('started')
            event.target.disabled = true
        }else {
        
            voiceVisualizer.stopVisualization()
            setIsStarted(false)
            console.log('stopped')
        }
    }
    
  return (
    <div className="App">
      
      <div id={'top-container'}>
        <h1 id={'title'}>Voice Assistant</h1>
        <button
            id={'start-btn'}
            className={'simple-btn'}
            onClick={changeModeAssistant}
        >Start Listening</button>
      </div>
      
      <div id={'visualizer-container'}>
        <canvas id={'output'} width={'250'} height={"200"}></canvas>
        <h2 id={'word-preview'}></h2>
        <h3 id={'search-result'}></h3>
      </div>
    </div>
  );
}

export default App;
