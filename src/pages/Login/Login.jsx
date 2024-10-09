import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import Background from "../../components/Background/Background";
import Heading from "../../components/Heading/Heading";
import Container from "../../components/Auth/Container/Container";
import Input from "../../components/Auth/Input/Input";
import Divider from "../../components/Auth/Divider/Divider";
import AuthOptions from "../../components/Auth/AuthOptions/AuthOptions";
import Button from "../../components/Auth/Button/Button";

export default function Login() {
  const navigate = useNavigate();
  return (
    <Background>
      <Heading />
      <Container>
        <div className="signup">
          <h1>Login</h1>
          <Input label="Username" type="text" />
          <Input label="Password" type="password" />
          <Divider text="Login" />
          <div className="auth-options">
          <AuthOptions
            icon="fa-brands fa-google"
            authType="Login"
            authOption="Google"
          />
          <AuthOptions
            icon="fa-brands fa-github"
            authType="Login"
            authOption="Github"
          />
          </div>
          <Button text="Login" />
          <p>
            Don't have an account?{" "}
            <button className="nav-btn" onClick={() => navigate("/signup")}>Signup</button>
          </p>
        </div>
      </Container>
    </Background>
  );
}
