import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function FormPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    countryCode: "+91",
    country: "",
    city: "",
    pan: "",
    aadhaar: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false); // Button state

  // Update form values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "pan" ? value.toUpperCase() : value // PAN always uppercase
    }));
  };

  // Validation function
  const validate = () => {
    const err = {};

    if (!form.firstName) err.firstName = "First Name required";
    if (!form.lastName) err.lastName = "Last Name required";
    if (!form.username) err.username = "Username required";
    if (!/\S+@\S+\.\S+/.test(form.email)) err.email = "Invalid email";
    if (form.password.length < 6) err.password = "Password min 6 characters";
    if (!form.phone) err.phone = "Phone required";
    if (!form.country) err.country = "Country required";
    if (!form.city) err.city = "City required";

    // PAN: 5 letters + 4 digits + 1 letter
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.pan)) err.pan = "Invalid PAN";

    // Aadhaar: exactly 12 digits
    if (!/^\d{12}$/.test(form.aadhaar))
      err.aadhaar = "Invalid Aadhaar";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // Enable/Disable submit button dynamically
  useEffect(() => {
    const valid =
      form.firstName &&
      form.lastName &&
      form.username &&
      /\S+@\S+\.\S+/.test(form.email) &&
      form.password.length >= 6 &&
      form.phone &&
      form.country &&
      form.city &&
      /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.pan) &&
      /^\d{12}$/.test(form.aadhaar);

    setIsValid(valid);
  }, [form]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate("/details", { state: form });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Registration Form</h2>

      {[
        ["firstName", "First Name"],
        ["lastName", "Last Name"],
        ["username", "Username"],
        ["email", "Email"],
        ["country", "Country"],
        ["city", "City"],
        ["pan", "PAN"],
        ["aadhaar", "Aadhaar"]
      ].map(([name, label]) => (
        <div key={name}>
          <input
            name={name}
            placeholder={label}
            value={form[name]}
            onChange={handleChange}
            className={errors[name] ? "error" : ""}
          />
          {errors[name] && <small>{errors[name]}</small>}
        </div>
      ))}

      {/* Password */}
      <div>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className={errors.password ? "error" : ""}
        />
        <button
          type="button"
          className="show-btn"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
        {errors.password && <small>{errors.password}</small>}
      </div>

      {/* Phone */}
      <div className="phone">
        <input
          name="countryCode"
          value={form.countryCode}
          onChange={handleChange}
        />
        <input
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className={errors.phone ? "error" : ""}
        />
      </div>
      {errors.phone && <small>{errors.phone}</small>}

      {/* Submit Button */}
      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
}
