"use strict";

const _ = require("lodash");
const { getAllChiles } = require("../util/dynamo-queries");

module.exports.getByIndex = async (event, context) => {
	try {
		const getRes = await getAllChiles();
		const chiles = getRes.Items;
		console.log("chiles", chiles);

		const sortedChiles = _.orderBy(chiles, "middle");
		const indexChile = sortedChiles[event.pathParameters.index];

		if (!indexChile) {
			indexChile = sortedChiles[sortedChiles.length - 1];
			// throw "you're too hot!";
		}

		return {
			statusCode: 200,
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": process.env.ORIGIN
			},
			body: JSON.stringify(indexChile)
		};
	} catch (err) {
		console.log(err);
		return {
			statusCode: 400,
			headers: {
				"Content-Type": "text/plain",
				"Access-Control-Allow-Origin": process.env.ORIGIN
			},
			body: JSON.stringify({ error: err })
		};
	}
};
