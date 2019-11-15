"use strict";

const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const getAllChiles = function() {
	const params = {
		TableName: process.env.DYNAMODB_TABLE
	};

	return new Promise((res, rej) => {
		dynamoDb.scan(params, function(err, data) {
			if (err) {
				console.log("Error", err);
				rej(err);
			} else {
				res(data);
			}
		});
	});
};

const getChile = function(id) {
	const params = {
		TableName: process.env.DYNAMODB_TABLE,
		KeyConditionExpression: "id = :hkey",
		ExpressionAttributeValues: {
			":hkey": id
		}
	};

	return new Promise((res, rej) => {
		dynamoDb.query(params, function(err, data) {
			if (err) {
				console.log("Error", err);
				rej(err);
			} else {
				res(data);
			}
		});
	});
};

module.exports = {
	getAllChiles,
	getChile
};
