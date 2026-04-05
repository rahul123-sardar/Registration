import React from "react";
import { Formik } from "formik";
import "./FormikPost.css";
import axios from "axios";
import cors from "cors";

export default function FormikPost() {


 
  return (
    <Formik
      initialValues={{
        fullName: "",
        email: "",
        password: "",
        gender: "",
        address: "",
        phone: "",
      }}
      validate={(values) => {
        const userData = {
  fullName: values.fullName,
  email: values.email,
  password: values.password,
  gender: values.gender,
  address: values.address,
  phone: values.phone
};

        axios.post("http://localhost:5000/api/register", userData)
  .then(res => console.log(res.data))
  .catch(err => console.error(err.response ? err.response.data : err));
        const errors = {};

        if (!values.fullName) {
          errors.fullName = "Full name is required";
        }

        if (!values.email) {
          errors.email = "Email is required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }

        if (!values.password) {
          errors.password = "Password is required";
        } else if (values.password.length < 6) {
          errors.password = "Minimum 6 characters";
        }

        if (!values.gender) {
          errors.gender = "Please select gender";
        }

        if (!values.address) {
          errors.address = "Address is required";
        }

        if (!values.phone) {
          errors.phone = "Phone number is required";
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        console.log(values);
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
        resetForm();
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <div className="form-container">
          <h1>Registration Form</h1>

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.fullName}
              />
              {errors.fullName && touched.fullName && (
                <div className="error">{errors.fullName}</div>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && (
                <div className="error">{errors.email}</div>
              )}
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && (
                <div className="error">{errors.password}</div>
              )}
            </div>

            {/* Gender */}
            <div className="form-group gender-group">
              <label>Gender</label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={handleChange}
                  checked={values.gender === "male"}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={handleChange}
                  checked={values.gender === "female"}
                />
                Female
              </label>
              {errors.gender && touched.gender && (
                <div className="error">{errors.gender}</div>
              )}
            </div>

            {/* Address */}
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
              />
              {errors.address && touched.address && (
                <div className="error">{errors.address}</div>
              )}
            </div>

            {/* Phone */}
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
              />
              {errors.phone && touched.phone && (
                <div className="error">{errors.phone}</div>
              )}
            </div>

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        </div>
      )}
    </Formik>
  );
}
