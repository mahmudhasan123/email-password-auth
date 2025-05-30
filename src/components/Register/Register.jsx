import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../../firebase.init";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link } from "react-router";

const Register = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;
    console.log("terms", terms);

    setErrorMessage("");
    setSuccessMessage("");

    if (!terms) {
      setErrorMessage("Please select terms and conditions!");
      return;
    }

    // password validate
    const passwordRegExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (passwordRegExp.test(password) === false) {
      setErrorMessage(
        "Password must be more than 8 characters, including number, lowercase letter and uppercase letter!"
      );
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log("User Data: ", result);
        if (result) {
          // sent email verify mail
          sendEmailVerification(auth.currentUser).then(() => {
            setSuccessMessage("User created successfully!");
          });
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
        setErrorMessage(error.message);
      });
  };
  return (
    <div className="max-w-sm mx-auto mt-12">
      <h2 className="text-2xl font-bold mb-4">Create an Account</h2>
      {successMessage && (
        <p className="text-green-500 mb-3 font-bold">{successMessage}</p>
      )}
      <form className="space-y-4" onSubmit={handleRegister}>
        {/* Email field */}

        <label className="input validator join-item">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </g>
          </svg>
          <input type="email" name="email" placeholder="Email" />
        </label>

        <br />
        {/* Password field */}
        <label className="input validator">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
            </g>
          </svg>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
          />
          <button
            onClick={() => {
              setShowPassword(!showPassword);
            }}
            className="cursor-pointer"
          >
            {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
          </button>
        </label>

        <br />

        <div>
          <label className="label">
            <input type="checkbox" name="terms" className="checkbox" />
            Accept terms and conditions.
          </label>
        </div>

        {errorMessage && (
          <p className="text-red-500 font-bold">{errorMessage}</p>
        )}
        {/* Submit button */}
        <input className="btn btn-primary" type="submit" value="Submit" />
      </form>
      <p className="pt-2">
        Already have an account? Please{" "}
        <Link className="text-blue-500 underline font-bold" to="/login">
          Login!
        </Link>
      </p>
    </div>
  );
};

export default Register;
