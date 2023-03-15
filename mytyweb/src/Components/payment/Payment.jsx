import axios from "axios";
import React from "react";
// import { useHistory } from "react-router-dom";
import apis from "../../constants/apis";
import { selectUser } from "../../store/authSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import Loader from "../Loader";

import classes from "./Payment.module.css"

function loadRazorpayScript() {
  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.async = true;
  document.body.appendChild(script);
}

function getPaymentOptions(order, callback) {
  return {
    key: process.env.REACT_APP_RAZORPAY_KEY,
    amount: order.amount,
    currency: order.currency,
    name: "Myty",
    description: "Payment for Myty",
    order_id: order.id,
    image: "https://myty.in/favicon.png",
    handler: async function (response) {
      try {
        console.log("Success", response);

        const verificationRes = await axios.post(
          apis.paymentVerifyResponse,
          response
        );

        if (verificationRes.status === 200) {
          console.log("Payment Verified");
          console.log(verificationRes.data);
          callback({ ...response, appliedAt: new Date().toISOString() });
        }
      } catch (error) {
        if (error.response.status === 400) {
          console.log(error.response.data);
        }
      }
    },
    prefill: {
      name: "",
      email: "",
      contact: "",
    },
    notes: {
      address: "Some address maybe office",
      purpose: "Payment for myty subscription plan",
    },
  };
}

export default function PaymentButton({ label, plan, callback, display }) {
  const User = useSelector(selectUser);
  // const history = useHistory();

  const [loading, setLoading] = useState(false);

  async function makePayment() {
    loadRazorpayScript();

    try {
      const order = (await axios.get(apis.paymentCreateOrder(plan))).data;
      // console.log(order);

      const options = getPaymentOptions(order, callback);
      // console.log(options);

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      razorpay.on("payment.failed", function (response) {
        console.log("Failed", response);
      });
    } catch (error) {
      if (error.response.status === 404) {
        console.log("Plan not Provided");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        className={classes.button}
        style={{display: display}}
        disabled={User?.plan === plan || loading}
        onClick={() => {
          setLoading(true);
          makePayment();
        }}
      >
        {loading ? (
          <span>
            <Loader />
          </span>
        ) : (
          <span>{label}</span>
        )}
      </button>
    </div>
  );
}
