const express = require('express')
const app = express()
const contributions = require("./api/contributions");
var cors = require('cors')

app.use(cors())

app.use(express.json({ extended: false }));

app.use("/api/contributions", contributions);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));