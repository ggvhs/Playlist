import { useState, useEffect } from "react";

import React from "react";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = () => {}

  return (
    <>
      <section>
        <h1>Register</h1>
        <p>Please create an account</p>
      </section>

      <section>
        <form>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            placeholder="Enter your name"
            onChange={onChange}
          />
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder="Enter your password"
            onChange={onChange}
          />
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder="Enter your name"
            onChange={onChange}
          />
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            placeholder="Enter your name"
            onChange={onChange}
          />
        </form>
      </section>
    </>
  );
}

export default Register;
