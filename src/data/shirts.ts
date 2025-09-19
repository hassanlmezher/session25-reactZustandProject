export type Shirt = {
  id: string;
  brand: string;
  name: string;
  size: string;
  color: string;
  price: number;
  imageUrl: string;
};

const brands = ["nike", "adidas", "apple", "newbalance", "puma", "uniqlo"];
const sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];
const colors = [
  "black",
  "white",
  "red",
  "yellow",
  "green",
  "blue",
  "purple",
  "darkblue",
  "orange",
  "cyan",
];

let idCounter = 1;
const shirts: Shirt[] = [];

brands.forEach((brand) => {
  sizes.forEach((size, index) => {
    shirts.push({
      id: `${brand}-${idCounter}`,
      brand,
      name: `${brand} Shirt ${idCounter}`,
      size,
      color: colors[index],
      price: Math.floor(Math.random() * 50) + 20,
      imageUrl: `/images/shirts/${brand.toLowerCase()}-${idCounter}.jpg`,
    });
    idCounter++;
  });

  for (let i = sizes.length; i < 10; i++) {
    shirts.push({
      id: `${brand}-${idCounter}`,
      brand,
      name: `${brand} Shirt ${idCounter}`,
      size: sizes[i % sizes.length],
      color: colors[i],
      price: Math.floor(Math.random() * 50) + 20,
      imageUrl: `/images/shirts/${brand.toLowerCase()}-${idCounter}.jpg`,
    });
    idCounter++;
  }
});

export default shirts;