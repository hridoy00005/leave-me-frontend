const express = require("express");
const path = require("path");
const compression = require("compression");

const app = express();
app.use(compression());
app.use(express.static(path.join(__dirname, "build")));

app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// setup server
const PORT = process.env.PORT || 5010;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));