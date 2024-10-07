import { useState } from "react";
import "../../../../styles/Auth.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signup } from "../../services/auth";
import { Link, useNavigate } from "react-router-dom";
import { signupSchema } from "../../schema/auth";
import { LocalStorage } from "../../../../shared/services/local-storage";

function Signup() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, touchedFields },
  } = useForm({
    resolver: yupResolver(signupSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);

    try {
      const response = await signup(data);
      LocalStorage.setItem("token", response);
      setIsLoading(false);

      navigate("/dashboard");
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
      <div className="auth__subtitle">
        Register your account by providing the below details.
      </div>

      {/* Full name Field */}
      <div className="form-field">
        <div className="form-field__label-wrapper">
          <label
            htmlFor="name"
            className="form-field__label form-field__label--required"
          >
            Full name
          </label>
        </div>

        <div className="input">
          <input
            type="text"
            className="input__field"
            placeholder="Enter your full name"
            id="name"
            {...register("name")}
          />

          {touchedFields.name && errors.name && (
            <span className="input__error">{errors.name.message}</span>
          )}
        </div>
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

      {/* Submit Button */}
      <button
        type="submit"
        className="button button--primary"
        disabled={!isValid || isLoading}
      >
        Signup
      </button>

      <div className="auth__note">
        Have an account? <Link to="/login">Login</Link>
      </div>
    </form>
  );
}

export default Signup;
