import './bootstrap.min.css';
import './App.css';
import EmotionTable from './EmotionTable.js';
import SentimentTable from './SentimentTable.js';
import EmotionUrlTable from './EmotionUrlTable.js';
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  state = {innercomp:<textarea rows="4" cols="50" id="textinput"/>,
            mode: "text",
          sentimentOutput:[],
          sentiment:true
        }
  
  renderTextArea = ()=>{
    document.getElementById("textinput").value = "";
    if(this.state.mode === "url") {
      this.setState({innercomp:<textarea rows="4" cols="50" id="textinput"/>,
      mode: "text",
      sentimentOutput:[],
      sentiment:true
    })
    } 
  }

  renderTextBox = ()=>{
    document.getElementById("textinput").value = "";
    if(this.state.mode === "text") {
      this.setState({innercomp:<textarea rows="1" cols="50" id="textinput"/>,
      mode: "url",
      sentimentOutput:[],
      sentiment:true
    })
    }
  }

  sendForSentimentAnalysis = () => {
    this.setState({sentiment:true});
    let ret = "";
    let url = ".";

    if(this.state.mode === "url") {
      url = url+"/url/sentiment?url="+document.getElementById("textinput").value;

    } else {
      url = url+"/text/sentiment?text="+document.getElementById("textinput").value;
    }
    ret = axios.get(url);
    ret.then((response)=>{
        if(this.state.mode === 'url')
        {
            console.log("This is data  - ",response.data)
            console.log("This is data 1 - ",response.data.keywords)
             this.setState({sentimentOutput:<SentimentTable emotions={response.data}/>});
        }
        else
        {
                //  Include code here to check the sentiment and fomrat the data accordingly
                //   console.log("Response sentiment - ",response.data)
                this.setState({sentimentOutput:JSON.stringify(response.data[0])});
                //   console.log("Response sentiment 2- ",response.data[0].label)
                let output = response.data[0].label;
                if(response.data[0].label === "positive") {
                    output = <div style={{color:"green",fontSize:20}}>{response.data[0].label}</div>
                } else if (response.data[0].label === "negative"){
                    output = <div style={{color:"red",fontSize:20}}>{response.data[0].label}</div>
                } else {
                    output = <div style={{color:"orange",fontSize:20}}>{response.data[0].label}</div>
                }
                this.setState({sentimentOutput:output});
        }
     
    });
  }

  sendForEmotionAnalysis = () => {
    this.setState({sentiment:false});
    let ret = "";
    let url = ".";
    if(this.state.mode === "url") {
      url = url+"/url/emotion?url="+document.getElementById("textinput").value;
    } else {
      url = url+"/text/emotion/?text="+document.getElementById("textinput").value;
    }
    ret = axios.get(url);

    ret.then((response)=>{
         if(this.state.mode === 'url')
        {
             console.log("Response 1234 - ",response.data)
              this.setState({sentimentOutput:<EmotionUrlTable emotions={response.data}/>});
        }
        else
        {

        }
    console.log("Response 1 - ",response.data.emotion)
      this.setState({sentimentOutput:<EmotionTable emotions={response.data.emotion.targets}/>});
  });
  }
  

  render() {
    return ( 
      <>
        <title>Sentiment Analyzer</title> 
      <div className="App">
      <button className="btn btn-info" onClick={this.renderTextArea}>Text</button>
        <button className="btn btn-dark"  onClick={this.renderTextBox}>URL</button>
        <br/><br/>
        {this.state.innercomp}
        <br/>
        <button className="btn-primary" onClick={this.sendForSentimentAnalysis}>Analyze Sentiment</button>
        <button className="btn-primary" onClick={this.sendForEmotionAnalysis}>Analyze Emotion</button>
        <br/>
            {this.state.sentimentOutput}
      </div>
      </>
    );
    }
}

export default App;