import express from "express";
import cors from "cors";
const app = express();
const port = 3000;

app.use(cors());

const taxRate = 5;
const discountPercetage = 10;
const loyaltiRate = 2;

//  cart-total ✔
app.get("/cart-total", (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotalto = parseFloat(req.query.cartTotal);
  let newCartTotal = newItemPrice + cartTotalto;
  res.send(newCartTotal.toString());
});

// membership-discount ✔
function calculateTotalDiscount(cartTotal, membership) {
  if (membership === "true") {
    let discount = cartTotal * (discountPercetage / 100);
    let totalDiscount = cartTotal - discount;
    return totalDiscount.toString();
  } else {
    return "discount not applied";
  }
}

app.get("/membership-discount", (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let membership = req.query.isMember;

  res.send(calculateTotalDiscount(cartTotal, membership));
});

// calculate-tax ✔
app.get("/calculate-tax", (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  const tax = cartTotal * (taxRate / 100);
  res.send(`Tax applied: ${tax.toFixed(0).toString()}`);
});

// estimate-delivery ✔
function calculateShippingDistance(shippingMethod, distance) {
  let shippingDistance;
  if (shippingMethod === "standard") {
    shippingDistance = distance / 50;
    return shippingDistance;
  } else if (shippingMethod === "express") {
    shippingDistance = distance / 100;
    return shippingDistance;
  } else {
    return "invalid shipping method";
  }
}

app.get("/estimate-delivery", (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);

  res.send(calculateShippingDistance(shippingMethod, distance).toString());
});

// shipping-cost ✔
function calculateShippingCost(weight, distance) {
  let shippingCost = weight * distance * 0.1;
  return shippingCost;
}

app.get("/shipping-cost", (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);

  res.send(calculateShippingCost(weight, distance).toString());
});

// loyalty-points
app.get("/loyalty-points", (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyPoints = purchaseAmount * loyaltiRate;
  res.send(loyaltyPoints.toString());
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
