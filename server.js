const express = require('express')
const app = express();
var fs = require("fs");

var text = fs.readFileSync("example.txt", 'utf-8');
const port = 3000

function nthLeastMostCommon(string, amount,type) {
  var wordsArray = string.split(/\s/);
  var wordOccurrences = {}
  for (var i = 0; i < wordsArray.length; i++) {
      wordOccurrences[wordsArray[i]] = ( wordOccurrences[wordsArray[i]] || 0 ) + 1;
  }
  console.log(wordOccurrences);
  console.log(typeof wordOccurrences);
  var sortable = [];
  for (var vehicle in wordOccurrences) {
      sortable.push([vehicle, wordOccurrences[vehicle]]);
  }

  sortable.sort(function(a, b) {
      return a[1] - b[1];
  });
  if(type === "topmost"){
    sortable = sortable.slice(sortable.length - amount , sortable.length).reverse();
  }else{
    sortable = sortable.slice(0,amount-1)
  }
  return sortable;
}


app.get('/', (req, res) => {
  res.status(200).json("Working");
})

app.get('/totalwords', (req, res) => {
  res.status(200).json(text.split(" ").length);
})

app.get('/topmost', (req, res) => {

  res.status(200).json(nthLeastMostCommon(text,req.query.count,req.query.type));

})

app.get('/topleast', (req, res) => {

  res.status(200).json(nthLeastMostCommon(text,req.query.count,req.query.type));

})


app.get('/particularwordcount', (req, res) => {
  res.status(200).json(text.split(req.query.word).length - 1);
})

app.get('/numberofsentance', (req, res) => {
  
  const re = /[.!?]/;
  const numOfSentences = text.split(re);

  res.status(200).json(numOfSentences.length - 1);
})


// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})

