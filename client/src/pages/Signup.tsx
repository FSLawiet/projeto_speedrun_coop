// RegisterScreen.js
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//import Error from '../components/Error'
import { registerUser } from "../features/user/userActions";
import { AppDispatch } from "../store/Store";

export const Signup = () => {
  const { loading, userInfo, error, success } = useSelector(
    (state: any) => state.user
  );
  const dispatch = useDispatch<AppDispatch>();

  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    // redirect user to login page if registration was successful
    if (success) navigate("/login");
    // redirect authenticated user to profile screen
    if (userInfo) navigate("/");
  }, [navigate, userInfo, success]);

  const submitForm = (data: FieldValues) => {
    // check if passwords match
    if (data.pwd !== data.confirmPassword) {
      alert("Password mismatch");
      return;
    }
    // transform email string to lowercase to avoid case sensitivity issues during login
    data.email = data.email.toLowerCase();

    dispatch(registerUser(data));
  };
  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {/* render error message with Error component, if any */}
      {/*error && <Error>{error}</Error>*/}
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          className="form-input"
          {...register("firstName")}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          className="form-input"
          {...register("lastName")}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="userName">User Name</label>
        <input
          type="text"
          className="form-input"
          {...register("userName")}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-input"
          {...register("email")}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-input"
          {...register("pwd")}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Confirm Password</label>
        <input
          type="password"
          className="form-input"
          {...register("confirmPassword")}
          required
        />
      </div>
      <button type="submit" className="button" disabled={loading}>
        Register
      </button>
    </form>
  );
};
