import { useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import Context from "../../context";
import "./Login.css";

const Login = () => {
  const context = useContext(Context);
  const inputRef = useRef("");
  const history = useHistory();

  const loginHandler = (event) => {
    event.preventDefault();
    if (inputRef.current.value) {
      localStorage.setItem("employeeId", inputRef.current.value);
      context.setUserLoggedIn(true);
      history.push("/home");
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
        <button type='submit' className='btn'>
          Login
        </button>
      </form>
    </section>
  );
};

export default Login;
