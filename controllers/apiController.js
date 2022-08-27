const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { User, Blog, Comment } = require("./../models");
