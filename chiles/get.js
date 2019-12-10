"use strict";

const { getChile } = require("../util/dynamo-queries");
const { getImageUrl } = require("../util/helpers");

module.exports.get = async (event, context) => {
  try {
    const getRes = await getChile(event.pathParameters.id);
    const chile = getRes.Items[0];

    if (!chile) {
      throw "invalid chile";
    }

    chile.imageUrl = getImageUrl(chile.name);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": process.env.ORIGIN
      },
      body: JSON.stringify(chile)
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
