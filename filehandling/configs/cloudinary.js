const cloudinary = require("cloudinary").v2;

exports.cloudinaryConnect = () => {
  cloudinary.config({
    cloud_name: "dwefpckto",
    api_key: "463728395437836",
    api_secret: "4lQwi5Rt-7dgkj7BvyflA9zAYkk",
  });
};
