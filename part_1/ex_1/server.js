const express = require('express');
const fs = require('fs');
const config = require('../../config');

const app = express();

app.listen(config.app.port)