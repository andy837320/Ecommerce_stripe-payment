// sk_test_51LwRcAL5SMBYHMUzCvxs9e5TFcVVucPx2jewBU25uEGAKY1EJUyx1hmAbwjOt9THVhLkSBcqhBMXRu4IkNd1eJsI00Hndg0pG6;
// price_1LwRfKL5SMBYHMUzTlc3ailg;
// price_1LwRh4L5SMBYHMUz7w2B4i3V;
// price_1LwRi9L5SMBYHMUzOVu4fQzo;

const express = require("express");
var cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51LwRcAL5SMBYHMUzCvxs9e5TFcVVucPx2jewBU25uEGAKY1EJUyx1hmAbwjOt9THVhLkSBcqhBMXRu4IkNd1eJsI00Hndg0pG6"
);

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {
  /*
    req.body.items
    [
        {
            id: 1,
            quantity: 3
        }
    ]
    stripe wants
    [
        {
            price: 1,
            quantity: 3
        }
    ]
    */
  console.log(req.body);
  const items = req.body.items;
  let lineItems = [];
  items.forEach((item) => {
    lineItems.push({
      price: item.id,
      quantity: item.quantity,
    });
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/checkout-success",
    cancel_url: "http://localhost:3000/checkout-cancel",
  });

  res.send(
    JSON.stringify({
      url: session.url,
    })
  );
});

app.listen(3001, () => console.log("Listening on port 3001!"));
