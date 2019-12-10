"use strict";

const _ = require("lodash");
const { getAllChiles } = require("../util/dynamo-queries");
const { getImageUrl } = require("../util/helpers");

module.exports.list = async (event, context) => {
  try {
    const getRes = await getAllChiles();
    const chiles = getRes.Items;
    console.log("chiles", chiles);

    const sortedChiles = _.orderBy(chiles, "middle").map(chile => {
      chile.imageUrl = getImageUrl(chile.name);
      return chile;
    });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": process.env.ORIGIN
      },
      body: JSON.stringify(sortedChiles)
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
