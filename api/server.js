const express = require("express");

const acountRouter= require ("../account/acountRouter")
const server = express();

server.use(express.json());
server.use("/account",acountRouter);

server.get("/", (req, res) => {
	res.json({
		message: "Welcome to our API",
	})
})
// ******ERR****** 
server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong please try again",
	})
})

module.exports = server;
