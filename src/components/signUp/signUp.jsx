import React, { Component } from "react";

import { auth, createUserProfileDocument } from "../../firebase/firebaseUtil.js";

import FormInput from "components/form-input/formInput";
import CustomButton from "components/customButton/customButton";
import "./signUp.scss";

class signin extends Component {
  state = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: " ",
  };

  handleSubmit = async (event) => {
      event.preventDefault();
      
      const { displayName, email, password, confirmPassword } = this.state;

      if (password !== confirmPassword) {
          alert("Passwords don't match");
          return;

      }
      try {
          const { user } = await auth.createUserWithEmailAndPassword(email, password);
          await createUserProfileDocument(user, { displayName })
          
          this.setState({
            displayName: "",
            email: "",
            password: "",
            confirmPassword: " ",
          });
      } catch (error) {
          console.error(error)
      }
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
    });
  };

    render() {
      const { displayName, email, password, confirmPassword} = this.state
    return (
      <div className="sign-in">
        <h2>I do not have an account</h2>
        <span>Sign up with your email and password</span>

        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            name="displayName"
            type="text"
            value={displayName}
            handleChange={this.handleChange}
            label="Display Name"
            required
          />
          <FormInput
            name="email"
            type="email"
            value={email}
            handleChange={this.handleChange}
            label="Email"
            required
          />
          <FormInput
            name="password"
            type="password"
            value={password}
            handleChange={this.handleChange}
            label="Password"
            required
          />
          <FormInput
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            handleChange={this.handleChange}
            label="Confirm Password"
            required
          />
          <div className="buttons">
            <CustomButton type="submit"> SIGNUP</CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default signin;