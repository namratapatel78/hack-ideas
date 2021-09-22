import './Login.css';
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const inputRef = useRef("");
  const history = useHistory();
  const loginHandler = (event) => {
    event.preventDefault();
    if (inputRef.current.value) {
      localStorage.setItem('employeeId', inputRef.current.value)
      history.push('/home')
    }
  }

  return <section className="login-section">
    <div>Login</div>
    <form className="login-form" onSubmit={loginHandler}>
      <div className="input-div"> Employee ID: </div>
      <input ref={inputRef}/>
      <button type="submit" className="btn">Login</button>
    </form>
  </section>
}

export default Login