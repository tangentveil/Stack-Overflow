import React from "react";
import axios from "axios";
import { useState } from "react";
import {app} from '../../firebase.config.js'
// import { getAuth } from "firebase/auth";

import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";

import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../../firebase.config";
import { RecaptchaVerifier, getAuth, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";

import "./Chat.css";


const Chat = () => {
  const auth = getAuth(app);
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  // console.log(prompt);
  // console.log(response);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post("http://localhost:5000/chat" ||
            `https://stackoverflow-server-9k5a.onrender.com/chat`, { prompt })
      .then((res) => {
        setLoading(false);
        setResponse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        localStorage.setItem("otpVerified", true);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  const user1 = localStorage.getItem("otpVerified")

  return (
    <>
      <div className="home-container-1">
        <div className="chat-container">
          <section className="section">
            <div>
              <Toaster toastOptions={{ duration: 4000 }} />
              <div id="recaptcha-container"></div>
              {user || user1 ? (
                <div className="form">
                  <div className="form-1">
                    <label>What do you want to ask?</label>
                    <form onSubmit={handleSubmit}>
                      <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                      />
                      <button type="submit" className="btn">
                        {loading && (
                          <CgSpinner size={20} className="mt-1 animate-spin" />
                        )}
                        <span>Submit</span>
                      </button>
                    </form>

                    <p>{response}</p>
                  </div>
                </div>
              ) : (
                <div className="form">
                  <div className="">
                    {showOTP ? (
                      <div className="otp">
                        <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                          <BsFillShieldLockFill size={30} />
                        </div>
                        <label
                          htmlFor="otp"
                          className="font-bold text-xl text-black text-center"
                        >
                          Enter your OTP
                        </label>
                        <OtpInput
                          value={otp}
                          onChange={setOtp}
                          OTPLength={6}
                          otpType="number"
                          disabled={false}
                          autoFocus
                          className="opt-container "
                        ></OtpInput>
                        <button onClick={onOTPVerify} className="btn otp-btn">
                          {loading && (
                            <CgSpinner
                              size={20}
                              className="mt-1 animate-spin"
                            />
                          )}
                          <span>Verify OTP</span>
                        </button>
                      </div>
                    ) : (
                      <div className="verify-number">
                        <div className="telephone-icon">
                          <BsTelephoneFill size={30} />
                        </div>
                        <label htmlFor="">Verify your phone number</label>
                        <PhoneInput
                          className="PhoneInput"
                          country={"in"}
                          value={ph}
                          onChange={setPh}
                        />
                        <button onClick={onSignup} className="btn">
                          {loading && (
                            <CgSpinner
                              size={20}
                              className="mt-1 animate-spin"
                            />
                          )}
                          <span>Send code via SMS</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Chat;
