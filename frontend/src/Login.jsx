import LoginForm from "./LoginForm";

function Login({ login, onChange, onSubmit, message }) {
  return (
    <LoginForm
      login={login}
      onChange={onChange}
      onSubmit={onSubmit}
      message={message}
    ></LoginForm>
  );
}

export default Login;
