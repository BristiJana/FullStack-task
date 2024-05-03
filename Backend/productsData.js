const generateRandomString = (length) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
const generateProduct = (id) => ({
  id: id,
  name: "Product " + id,
  description: generateRandomString(50),
  price: Math.floor(Math.random() * 100) + 1,
  image: "https://cdn.pixabay.com/photo/2020/06/16/10/30/camera-5305154_640.jpg",
});

const products = [];
for (let i = 1; i <= 100; i++) {
  products.push(generateProduct(i));
}

module.exports = products;
