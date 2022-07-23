import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LogIn.scss";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase-config";

export default function LogIn(props) {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(false);

  const navigation = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user; //can get output of loging detailes
        console.log(user);
        props.isSuccess(true);
        navigation("/home");
      })
      .catch((error) => {
        const errorCode = error.code; //that return error code
        // const errorMessage = error.message; //this return error msg
        console.log(errorCode);
        setError(true);
      });
  };

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <h2>LOGIN</h2>

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter Email"
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter Password"
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <code style={{ color: "red" }}>
          {error ? "Email or Password Wrong" : ""}
        </code>

        <button type="submit">LOGIN</button>
        <br />
      </form>
    </div>
  );
}
