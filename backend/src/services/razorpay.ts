import Razorpay from "razorpay";
import "dotenv/config"

//create payment instance
var instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

var options = {
  amount: 50000,  //Default currency is INR. Hence, 50000 refers to 50000 paise, so Rs. 500
  currency: "INR",
  receipt: "order_rcptid_11"
};
instance.orders.create(options, function(err, order) {
  console.log(order);
});