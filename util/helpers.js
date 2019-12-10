const BASE_URL = "https://odyssy-assets.s3.amazonaws.com/chiles/";

const getImageUrl = name => {
  return `${BASE_URL}${name
    .replace(/ /g, "-")
    .replace(/'/g, "")
    .toLowerCase()}.png`;
};

module.exports = {
  getImageUrl
};
