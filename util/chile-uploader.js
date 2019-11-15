const axios = require("axios");
const chileData = require("../util/chile-data");

console.log(chileData);
console.log(chileData.chileData.length);

const chiles = chileData.chileData;

console.log("chiles", chiles);
console.log("chiles[0]", chiles[0]);

for (let i = 0; i < chiles.length; i++) {
	console.log("uploading", chiles[i]);
	axios
		.post(
			"https://o40i9v7tga.execute-api.us-east-1.amazonaws.com/dev/chiles",
			chiles[i]
		)
		.then(function(response) {
			console.log(response);
		})
		.catch(function(error) {
			console.log(error);
		});
}
