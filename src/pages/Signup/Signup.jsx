import React from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import Background from "../../components/Background/Background";
import Heading from "../../components/Heading/Heading";
import Container from "../../components/Auth/Container/Container";
import Input from "../../components/Auth/Input/Input";
import Divider from "../../components/Auth/Divider/Divider";
import AuthOptions from "../../components/Auth/AuthOptions/AuthOptions";
import Button from "../../components/Auth/Button/Button";

export default function Signup() {
  const navigate = useNavigate();
  return (
    <Background>
      <Heading />
      <Container>
        <div className="signup">
          <h1>Signup</h1>
          <Input label="Email" type="email" />
          <Input label="Username" type="text" />
          <Input label="Password" type="password" />
          <Divider text="Signup" />
          <div className="auth-options">
            <AuthOptions
              icon="fa-brands fa-google"
              authType="Signup"
              authOption="Google"
            />
            <AuthOptions
              icon="fa-brands fa-github"
              authType="Signup"
              authOption="Github"
            /></div>
          <Button text="Signup" />
          <p>
            Already have an account?{" "}
            <button className="nav-btn" onClick={() => navigate("/login")}>Login</button>
          </p>
        </div>
      </Container>
    </Background>
  );
}
