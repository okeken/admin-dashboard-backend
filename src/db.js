const { faker } = require("@faker-js/faker");
const fs = require("fs");

// sample brand list
const brandList = [
  {
    id: 1,
    name: "Unbranded",
  },
  {
    id: 2,
    name: "Handmade",
  },
  {
    id: 3,
    name: "Recycled",
  },
  {
    id: 4,
    name: "Bespoke",
  },
  {
    id: 5,
    name: "Small",
  },
  {
    id: 6,
    name: "Generic",
  },
  {
    id: 7,
    name: "Intelligent",
  },
  {
    id: 8,
    name: "Licensed",
  },
  {
    id: 9,
    name: "Oriental",
  },
  {
    id: 10,
    name: "Sleek",
  },
  {
    id: 11,
    name: "Luxurious",
  },
  {
    id: 12,
    name: "Gorgeous",
  },
  {
    id: 13,
    name: "Refined",
  },
  {
    id: 14,
    name: "Awesome",
  },
  {
    id: 15,
    name: "Practical",
  },
  {
    id: 16,
    name: "Electronic",
  },
  {
    id: 17,
    name: "Fantastic",
  },
  {
    id: 18,
    name: "Modern",
  },
  {
    id: 19,
    name: "Handcrafted",
  },
  {
    id: 20,
    name: "Tasty",
  },
];

// Get content from file
const filePath = process.cwd() + "//src/db.json";
var contents = fs.readFileSync(filePath);
// Define to JSON type
var jsonContent = JSON.parse(contents);

const products = () => {
  const product = [];
  for (let i = 0; i < 2000; i++) {
    const title = faker.commerce.product();
    const price = faker.commerce.price();
    const description = faker.commerce.productDescription();
    const image = faker.image.image();

    const chosenBrand = Math.floor(
      Math.random() * (brandList?.length ?? 10 + 1)
    );
    const brand = brandList[chosenBrand]; // pick a random brand from the brands array with  ranging from 0 to the length of the brands array
    const brandName = (id) => brandList.find((brand) => brand.id === id)?.name;
    product.push({
      id: i + 1,
      title,
      price,
      description,
      image,
      brandId: brand.id,
      brandName: brandName(brand.id),
    });
  }
  return product;
};

const users = () => {
  const user = [];
  // Create 50 users
  for (let i = 0; i < 50; i++) {
    const name = faker.name.firstName();
    const email = faker.internet.email();
    const address = faker.address.streetAddress();
    const city = faker.address.city();
    const state = faker.address.state();
    const zip = faker.address.zipCode();
    const phone = faker.phone.number();
    const country = faker.address.country();
    user.push({
      id: i + 1,
      name,
      email,
      phone,
      address: `${address} ${city}, ${state} ${zip} ${country}`,
    });
  }

  return user;
};

const orders = () => {
  const order = [];

  // create 300 orders
  for (let i = 0; i < 500; i++) {
    const customerId = faker.datatype.number({ min: 1, max: 50 });
    const productId = faker.datatype.number({ min: 1, max: 2000 });
    const quantity = faker.datatype.number({ min: 1, max: 10 });
    const price = faker.commerce.price();
    order.push({
      id: i + 1,
      customerId,
      productId,
      quantity,
      price,
      total: price * quantity,
    });
  }

  return order;
};

const modified = {
  ...jsonContent,
  brands: brandList,
  customers: users(),
  orders: orders(),
  products: products(),
};

// write to a new file named 2pac.txt
fs.writeFile(filePath, JSON.stringify(modified, null, 2), (err) => {
  // throws an error, you could also catch it here
  if (err) throw err;
});

module.exports = () => {
  const data = {
    products: products(),
    customers: users(),
    orders: orders(),
    brands: brandList,
  };
  return data;
};
