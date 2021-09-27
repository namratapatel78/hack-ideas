import { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Context from "../../context";
import "./Login.css";

const Login = () => {
  const context = useContext(Context);
  const inputRef = useRef("");
  const history = useHistory();
  const [error, setError] = useState("");

  const loginHandler = (event) => {
    event.preventDefault();
    if (inputRef.current.value) {
      localStorage.setItem("employeeId", inputRef.current.value);
      context.setUserLoggedIn(true);
      history.push("/home");
    } else {
      setError("Please enter employee id to login");
    }
  };

  return (
    <section className='login-section'>
      <div>Login</div>
      <form className='login-form' onSubmit={loginHandler}>
        <div className='form-div'>
          <div className='input-div'> Employee ID: </div>
          <input ref={inputRef} />
        </div>
        <div className='error-div'>{error}</div>
        <button type='submit' className='btn'>
          Login
        </button>
      </form>
    </section>
  );
};

export default Login;
