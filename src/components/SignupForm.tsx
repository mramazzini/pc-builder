"use client";
import { useState } from "react";
import { signup } from "../lib/actions/db/auth/signup.actions";
import { AuthResult } from "../lib/utils/types";

const SignupForm = () => {
  const [error, setError] = useState("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const err = await signup({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        confirmPassword: formData.get("confirmPassword") as string,
      });

      if (err != AuthResult.Success) {
        console.log(err);

        setError(err);
        return;
      }

      setError("");

      // Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (error: any) {
      console.log(error);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <form className="card-body" onSubmit={handleSubmit}>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          placeholder="Email"
          className="input input-info"
          name="email"
          required
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          placeholder="Password"
          className="input input-info"
          name="password"
          required
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Confirm Password</span>
        </label>
        <input
          type="password"
          placeholder="Confirm Password"
          className="input input-info"
          name="confirmPassword"
          required
        />
      </div>
      <div className="divider"></div>
      {error && <div className="text-red-500">{error}</div>}
      <div className="form-control mt-6">
        <button className="btn btn-primary" type="submit">
          Create your account
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
