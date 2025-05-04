import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useRef, useState } from "react";
import { auth } from "../../../firebase.init";
import { Link } from "react-router";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const emailRef = useRef();

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    setErrorMessage("");
    setSuccessMessage("");

    if (!email) {
      setErrorMessage("Please enter the email!");
      return;
    }

    if (!password) {
      setErrorMessage("Please enter the password!");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        if (!result.user.emailVerified) {
          alert("Please verify your email!");
        } else {
          console.log("Result: ", result);
          setSuccessMessage("Login successfully!");
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
        setErrorMessage(error.message);
      });
  };

  const handleForgotPassword = () => {
    console.log(emailRef.current.value, "emailRef");
    const email = emailRef.current.value;

    setSuccessMessage('');
    setErrorMessage('');
    
    // sent password reset email
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setSuccessMessage("Password reset email sent successfully!");
      })
      .catch(() => {
        console.log("Error: ", error);
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto mt-12">
      <div className="card-body">
        <h1 className="text-2xl font-bold">Login now!</h1>
        {successMessage && (
          <p className="text-green-500 font-bold text-base">{successMessage}</p>
        )}
        <form onSubmit={handleLogin} className="fieldset">
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            ref={emailRef}
            className="input"
            placeholder="Email"
          />
          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Password"
          />
          <div onClick={handleForgotPassword}>
            <a className="link link-hover">Forgot password?</a>
          </div>
          {errorMessage && (
            <p className="text-red-500 font-bold text-base">{errorMessage}</p>
          )}
          <button className="btn btn-neutral mt-4">Login</button>
          <p className="text-base">
            {" "}
            New to this website? Please{" "}
            <Link className="text-blue-500 underline font-bold" to="/register">
              Sign Up!
            </Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
