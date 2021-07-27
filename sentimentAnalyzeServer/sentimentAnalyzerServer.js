const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = new express();
function getNLUInstance(){
    let api_key=process.env.API_KEY;
    let api_url=process.env.API_URL;
    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2020-08-01',
    authenticator: new IamAuthenticator({
        apikey: api_key,
    }),
    serviceUrl: api_url,
    });
    return naturalLanguageUnderstanding;
}
app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
naturalLanguageUnderstanding = getNLUInstance()
console.log("Url - ",req.query)
const analyzeParams = {
  'url':req.query.url,
  'features': {
    'keywords': {
      'emotion': true,
    }
  }
};
    naturalLanguageUnderstanding.analyze(analyzeParams)
    .then(analysisResults => {
        return res.send(JSON.stringify(analysisResults.result, null, 2));
    })
    .catch(err => {
        console.log('error:', err);
        return res.send(err)
        
    });
    
});

app.get("/url/sentiment", (req,res) => {
naturalLanguageUnderstanding = getNLUInstance()
console.log("Url - ",req.query)
const analyzeParams = {
  'url': req.query.url,
  'features': {
    'keywords': {
      'sentiment': true,
    }
  }
};

 naturalLanguageUnderstanding.analyze(analyzeParams)
    .then(analysisResults => {
        return res.send(JSON.stringify(analysisResults.result, null, 2));
    })
    .catch(err => {
        console.log('error:', err);
        return res.send(err)
        
    });
});

app.get("/text/emotion", (req,res) => {
    naturalLanguageUnderstanding = getNLUInstance()
    const analyzeParams = {
  'text':req.query.text,
  'features': {
    'emotion': {
     'document':false,
      'targets': [
        req.query.text,
      ]
    }
  },
  'language':'en'
};
    naturalLanguageUnderstanding.analyze(analyzeParams)
    .then(analysisResults => {
        return res.send(JSON.stringify(analysisResults.result, null, 2));
    })
    .catch(err => {
        console.log('error:', err);
        return res.send(err)
        
    });
});

app.get("/text/sentiment", (req,res) => {
naturalLanguageUnderstanding = getNLUInstance()
const analyzeParams = {
  'text':req.query.text,
  'features': {
    'sentiment': {
     'document':false,
      'targets': [
        req.query.text,
      ]
    }
  },
  'language':'en'
};
     naturalLanguageUnderstanding.analyze(analyzeParams)
    .then(analysisResults => {
        return res.send(JSON.stringify(analysisResults.result.sentiment.targets, null, 2));
    })
    .catch(err => {
        console.log('error:', err);
        return res.send(err)
        
    });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})
