const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3001;

const db = require('./config/connection');
const routes = require('./routes');