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
        resolve(data);
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