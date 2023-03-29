import React, { useEffect } from "react";
import { useState } from "react";
import LeftSidebar from "../../components/LeftSidebar";
import Plans from "./Plans";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Payment.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "../../actions/currentUser";
const Payment = () => {
  const dispatch = useDispatch();
  const stripePromise = loadStripe(
    "pk_test_51MkL9hSI12B6tnh4vc1PefQeqBBzJrU6XIJK3f8PhSjmeWIR5c4Tn7RRLy7fMmXZXem5dEYnGw2rRe4eubrxD1ol00prZTNk1G"
  );

  const [plan, setPlan] = useState(0);

  const plans = (data) => {
    setPlan(data);
  };

  // useEffect(()=>{
  //   dispatch(setCurrentUser());
  // },[dispatch])

  var user = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate();

  const redirect = () => {
    alert("login or singin to ask a question");
    navigate("/Auth");
  };

  // useEffect(() => {
  //   navigate("/Auth");
  // }, []);

  const successMessage = () => {
    return (
      <div className="success-msg">
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          className="bi bi-check2"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
          />
        </svg>
        <div className="title">Payment Successful</div>
      </div>
    );
  };

  const [paymentCompleted, setPaymentCompleted] = useState(false);

  return (
    <>
      {user === null ? (
        redirect()
      ) : (
        <div className="home-container-1">
          <LeftSidebar></LeftSidebar>
          <div className="home-container-2">
            <div className="container">
              <div className="py-5 text-center">
                <h4>Payment Gateway</h4>
              </div>

              <div className="row s-box">
                {paymentCompleted ? (
                  successMessage()
                ) : (
                  <>
                    <div className="col-md-5 order-md-2 mb-4">
                      {<Plans plans={plans} />}
                    </div>
                    <div className="col-md-7 order-md-1">
                      <Elements stripe={stripePromise}>
                        <CheckoutForm
                          amount={plan}
                          setPaymentCompleted={setPaymentCompleted}
                        />
                      </Elements>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Payment;
