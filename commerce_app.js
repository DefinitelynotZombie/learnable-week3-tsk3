const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const products = [
  { id: 1, name: "Laptop", price: 999.99 },
  { id: 2, name: "Headphones", price: 49.99 },
  { id: 3, name: "Mouse", price: 19.99 },
];

const shoppingCart = [];

function displayProducts() {
  console.log("Available Products:");
  products.forEach((product) => {
    console.log(`[${product.id}] ${product.name} - $${product.price}`);
  });
  console.log();
}

function addToCart(productId, quantity) {
  const product = products.find((p) => p.id === productId);

  if (product) {
    shoppingCart.push({ product, quantity });
    console.log("Product added to cart!");
  } else {
    console.log("Invalid product ID.");
  }
}

function viewCart() {
  console.log("Shopping Cart:");
  shoppingCart.forEach((item) => {
    console.log(`${item.product.name} - Quantity: ${item.quantity}`);
  });
  console.log(`Total: $${getTotal()}`);
}

function getTotal() {
  return shoppingCart.reduce((total, item) => total + item.product.price * item.quantity, 0);
}

function main() {
  console.log("Welcome to the E-Commerce Console App!");

    // Display instructions
    console.log("Instructions:");
    console.log("1. View Products");
    console.log("2. Add to Cart");
    console.log("3. View Cart");
    console.log("4. Checkout");
    console.log("5. Exit");

  // Using the `rl` interface for user input
  rl.on('line', (line) => {
    switch (line.trim()) {
      case '1':
        displayProducts();
        break;

      case '2':
        rl.question("Enter the product ID: ", (productId) => {
          rl.question("Enter the quantity: ", (quantity) => {
            addToCart(parseInt(productId, 10), parseInt(quantity, 10));
            rl.prompt();
          });
        });
        break;

      case '3':
        viewCart();
        break;

      case '4':
        console.log("Thank you for shopping with us!");
        rl.close();
        break;

      case '5':
        // Continue the loop for other cases
        rl.prompt();
        break;

      default:
        console.log("Invalid choice. Please enter a number between 1 and 5.");
        rl.prompt();
    }
  });

  // Display the initial prompt
  rl.prompt();
}

main();
