import { useState } from "react";
import "../../../../styles/Auth.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { login } from "../../services/auth";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../../schema/auth";
import { LocalStorage } from "../../../../shared/services/local-storage";

function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, touchedFields },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);

    try {
      const response = await login(data);
      LocalStorage.setItem("token", response);

      setIsLoading(false);
      navigate("/app/dashboard");
    } catch (error: any) {
      setError("email", {
        type: "manual",
        message: error.response.data.message,
      });

      setIsLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="auth__title">Welcome to easygenerator</h1>
      <div className="auth__subtitle">It's good to see you again!</div>
      <div className="auth__subtitle">
        Type your login information, and we'll take you to your dashboard right
        away.
      </div>

      {/* Email Field */}
      <div className="form-field">
        <div className="form-field__label-wrapper">
          <label
            htmlFor="email"
            className="form-field__label form-field__label--required"
          >
            Email
          </label>
        </div>

        <div className="input">
          <input
            type="email"
            className="input__field"
            placeholder="Enter email address"
            id="email"
            {...register("email")}
          />

          {touchedFields.email && errors.email && (
            <span className="input__error">{errors.email.message}</span>
          )}
        </div>
      </div>

      {/* Password Field */}
      <div className="form-field">
        <div className="form-field__label-wrapper">
          <label
            htmlFor="password"
            className="form-field__label form-field__label--required"
          >
            Password
          </label>
        </div>

        <div className="input-password">
          <input
            type="password"
            className="input-password__field"
            placeholder="Enter email password"
            id="password"
            {...register("password")}
          />

          {touchedFields.password && errors.password && (
            <span className="input__error">{errors.password.message}</span>
          )}
        </div>
      </div>

      {/* Submit Button    */}
      <button
        type="submit"
        className="button button--primary"
        disabled={!isValid || isLoading}
      >
        Login
      </button>

      <div className="auth__note">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </form>
  );
}

export default Login;
