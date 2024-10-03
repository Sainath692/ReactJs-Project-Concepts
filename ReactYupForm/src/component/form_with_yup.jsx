import React, { useState } from "react";
import * as Yup from "yup";

const FormWithYup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    interests: [],
    birthDate: "",
  });

  const [errors, setErrors] = useState();

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is Required"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid Email Fromat"),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digit")
      .required(),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one symbol"
      )
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
    age: Yup.number()
      .typeError("Age must be a number")
      .min(18, "You must be at least 18 years old")
      .max(100, "You cannot be older than 100 years")
      .required("Age is required"),
    gender: Yup.string().required("Gender is required"),
    interests: Yup.array()
      .min(1, "Select at least one interest")
      .required("Select at least one interest"),
    birthDate: Yup.date().required("Date of birth is required"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (isValid) {
      console.log("Form Submitted", formData);
    } else {
      console.log("Form Validation Failed");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    let updateInterests = [...formData.interests];
    if (checked) {
      updateInterests.push(name);
    } else {
      updateInterests = updateInterests.filter((interest) => interest !== name);
    }
    setFormData({
      ...formData,
      interests: updateInterests,
    });
  };

  return (
    <>
      <h3 style={{ display: "flex", justifyContent: "center" }}>
        Form Validation With Yup
      </h3>
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <div>
            <label>First Name : </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              placeholder="Enter your first name"
              onChange={handleChange}
            />
            {errors?.firstName && (
              <div className="errors">{errors?.firstName} </div>
            )}
          </div>
          <div>
            <label>Last Name : </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              placeholder="Enter your last name"
              onChange={handleChange}
            />
            {errors?.lastName && (
              <div className="errors">{errors?.lastName} </div>
            )}
          </div>
          <div>
            <label>Email : </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Enter your email"
              onChange={handleChange}
            />
            {errors?.email && <div className="errors">{errors?.email} </div>}
          </div>
          <div>
            <label>Phone Number : </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              placeholder="Enter your phone number"
              onChange={handleChange}
            />
            {errors?.phoneNumber && (
              <div className="errors">{errors?.phoneNumber} </div>
            )}
          </div>
          <div>
            <label>Password : </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Enter your password"
              onChange={handleChange}
            />
            {errors?.password && (
              <div className="errors">{errors?.password} </div>
            )}
          </div>
          <div>
            <label>Confirm Password : </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Re-Enter your Password"
              onChange={handleChange}
            />
            {errors?.confirmPassword && (
              <div className="errors">{errors?.confirmPassword} </div>
            )}
          </div>
          <div>
            <label>Age : </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              placeholder="Enter your age"
              onChange={handleChange}
            />
            {errors?.age && <div className="errors">{errors?.age} </div>}
          </div>
          <div>
            <label>Gender : </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="male">Male</option>
              <option value="female"> Female</option>
              <option value="other"> Other</option>
            </select>
            {errors?.gender && <div className="errors">{errors?.gender} </div>}
          </div>
          <div>
            <label>Interest : </label>
            <label>
              <input
                type="checkbox"
                name="coding"
                value={formData.interests.includes("coding")}
                onChange={handleCheckboxChange}
              />
              Coding
            </label>
            <label>
              <input
                type="checkbox"
                name="sports"
                value={formData.interests.includes("sports")}
                onChange={handleCheckboxChange}
              />
              Sports
            </label>
            <label>
              <input
                type="checkbox"
                name="reading"
                value={formData.interests.includes("reading")}
                onChange={handleCheckboxChange}
              />
              Reading
            </label>
            {errors?.interests && (
              <div className="errors">{errors?.interests} </div>
            )}
          </div>
          <div>
            <label>Date Of Birth : </label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              placeholder="Re-Enter your date of birth"
              onChange={handleChange}
            />
            {errors?.birthDate && (
              <div className="errors">{errors?.birthDate} </div>
            )}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default FormWithYup;
