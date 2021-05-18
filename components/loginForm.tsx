import { ChangeEvent, useState } from "react";

const LoginForm = ({ login }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const updateValue = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.type) {
      case "text":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
    }
  };

  return (
    <form>
      <div>
        <label>Email: </label>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateValue}
        />
      </div>

      <div>
        <label>Password: </label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={updateValue}
        />
      </div>
      <div>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            login(email, password);
            setEmail("");
            setPassword("");
          }}
        >
          Login
        </button>
        <button type="reset">Reset</button>
      </div>
    </form>
  );
};

export default LoginForm;
