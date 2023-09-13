import { useState, useEffect } from "react";

import React from "react";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const {  email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,

    }))
  }

  const onSubmit = (e) =>{
    e.preventDefault()
  }

  return (
    <>
      <section>
        <h1>Login</h1>
        <p>Login and build you playlist</p>
      </section>

      <section>
        <form onSubmit={onSubmit}>
          <div>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={onChange}
          />
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={onChange}
          />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
