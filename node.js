const express = require('express')
const app = express()
const port = 3000
const fetchDataForAllYears = require("./scripts/fetch")
var cors = require('cors')

app.use(cors())

const githubRequest = (url, name) => {
  return new Promise((resolve, reject) => {
    fetch(url.replace("$name$", name))
      .then((response) => response.json())
      .then((data) => {
        let MyDate = new Date();
        let MyDateString;
                
        MyDateString = MyDate.getFullYear() + '-' + ('0' + (MyDate.getMonth() + 1)).slice(-2) + "-" + ('0' + MyDate.getDate()).slice(-2);
        
        data.contributions.forEach((contribution, index) => {
          if(contribution.date == MyDateString){
            resolve(data.contributions.slice(index, index + 30))
          }
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

app.get('/:name', async (req, res) => {

  let contributions = await githubRequest(
    `https://github-contributions.vercel.app/api/v1/$name$`,
    req.params.name
  );
  
  res.json(contributions);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})