const express = require('express');
const cors = require('cors');
const { default: axios } = require('axios');
const app = express();

  app.use(cors());
  app.get('/search', (req, res) => {
     const search = req.query.search;

    axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json',{
      params: {
        query:`restaurants ${search}`,
        key:'myApiKey'
      }
    }).then(response=>{
      var result = response.data.results;
      var loclist = [];
      if(result.length>0){
        for(let loc of result){
          console.log(loc.geometry.location);
          loclist.push(loc.geometry.location)
        }
      }
      // var json = JSON.stringify(loclist);
      res.send({code:200,result:loclist});
    }).catch(err=>{
      res.send({code:500,result:`${err}`});
    });

  });

 


  console.log(`api start at http://localhost:3000/`);



  app.listen(3000);