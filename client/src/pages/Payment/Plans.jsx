import React, { useEffect, useState } from "react";

const Plans = (props) => {
  const [plan, setPlan] = useState(1000);

  // console.log("sdnfkjsdn")

  // props.plans(plan)   // revert back props -> created a function in parent

  useEffect(() => {
    props.plans(plan);
  }, [plan]);

  const handleClick = (e) => {
    e.preventDefault();
    const price = e.currentTarget.childNodes[1].textContent;
    // console.log(price)
    if (price === "₹0") setPlan(0);
    else if (price === "₹100") setPlan(100);
    else if (price === "₹1000") setPlan(1000);
  };
  // console.log(plan)

  return (
    <>
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-muted">Plans</span>
        <span
          className="badge badge-pill"
          style={{ backgroundColor: "#ef8236" }}
        >
          3
        </span>
      </h4>
      <ul className="list-group mb-3">
        <li className="list-group-item d-flex justify-content-between lh-condensed">
          <div>
            <h6 className="my-0">Free</h6>
            <small className="text-muted">post only 1 question a day</small>
          </div>
          <span className="text-muted">₹0</span>
        </li>

        <li
          className="list-group-item d-flex justify-content-between lh-condensed"
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        >
          <div>
            <h6 className="my-0">Silver</h6>
            <small className="text-muted">
              ₹100/month, post 5 questions a day
            </small>
          </div>
          <span className="text-muted">₹100</span>
        </li>

        <li
          className="list-group-item d-flex justify-content-between lh-condensed"
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        >
          <div>
            <h6 className="my-0">Gold</h6>
            <small className="text-muted">
              ₹1000/month post unlimited questions
            </small>
          </div>
          <span className="text-muted">₹1000</span>
        </li>
      </ul>
    </>
  );
};

export default Plans;
