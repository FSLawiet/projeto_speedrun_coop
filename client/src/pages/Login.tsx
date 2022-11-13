// Login.js
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../features/user/userActions";
import { AppDispatch } from "../store/Store";

export const Login = () => {
  const { loading, error } = useSelector((state: any) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const { register, handleSubmit } = useForm();

  const submitForm = (data: FieldValues) => {
    dispatch(userLogin(data));
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
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
          {...register("password")}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="time_limit">Lembre-me por 30 dias</label>
        <input
          type="checkbox"
          className="form-input"
          {...register("time_limit")}
          required
        />
      </div>
      <button type="submit" className="button" disabled={loading}>
        Login
      </button>
    </form>
  );
};
