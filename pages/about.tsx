import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";
import LoginForm from "../components/loginForm";

export default function About() {
  const [token, setToken] = useState<string>(null);
  const [user, setUser] = useState<{ name: string; email: string }>(null);
  const [error, setError] = useState<{ name: string; message: string }>(null);

  useState<{ email: string; password: string }>(null);

  const login = async (email: string, password: string) => {
    console.log(email, password);
    const body = { email, password };

    return axios
      .post("http://localhost:3000/api/auth", {
        email: email,
        password: password
      })
      .then((response) => {
        if (response.data.success && response.data.success == true)
          setToken(response.data.data.token);
        else {
          setError(response.data.errors[0]);
        }
      })
      .catch((err) => {
        setError(err);
      });
  };

  useEffect(() => {
    if (token)
      axios
        .get("http://localhost:3000/api/whoami", {
          headers: {
            Authorization: token
          }
        })
        .then((res) => {
          setUser({
            name: res.data.data.user.name,
            email: res.data.data.user.email
          });
        })
        .catch((err) => {
          setError({
            name: err.name as unknown as string,
            message: err.message as unknown as string
          });
          console.log(err);
        });
  }, [token]);

  return (
    <div>
      <LoginForm login={login} />
      {!user
        ? "Waiting for user to login!"
        : `Name: ${user.name}, email: ${user.email}`}
      {error ? `Error occured: ${error.name} - ${error.message}` : ""}
    </div>
  );
}
