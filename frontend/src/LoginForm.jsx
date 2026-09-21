import { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginForm.css";

function LoginForm({ login, onChange, onSubmit, message }) {
  const [showPassword, setShowPassword] = useState(false);
  const msgLower = message?.toLowerCase() || "";
  const isSuccess =
    msgLower.includes("berhasil") ||
    msgLower.includes("success") ||
    msgLower.includes("succes");

  return (
    <div className="login-page-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>

        {message && (
          <div className={`login-message ${isSuccess ? "success" : "error"}`}>
            {message}
          </div>
        )}

        <form className="login-form" onSubmit={onSubmit}>
          <div className="input-group-wrapper">
            <label className="input-label" htmlFor="email">
              Email
            </label>
            <div className="input-box">
              <span className="input-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </span>
              <input
                id="email"
                type="email"
                name="email"
                className="input-field"
                placeholder="Enter your email"
                value={login.email}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="input-group-wrapper">
            <label className="input-label" htmlFor="password">
              Password
            </label>
            <div className="input-box">
              <span className="input-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                className="input-field"
                placeholder="••••••••"
                value={login.password}
                onChange={onChange}
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                    <line x1="2" x2="22" y1="2" y2="22" />
                  </svg>
                ) : (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button type="submit" className="login-submit-btn">
            <span>Login</span>
          </button>
        </form>

        <div className="login-footer">
          Don't have an account?{" "}
          <Link to="/register" className="login-footer-link">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
