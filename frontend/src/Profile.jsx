import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import Buku from "./Dashboard";
import "./Dashboard.css";

function Profile({ children, setMessage, message, handleLogout }) {
  const { profile, logout } = useContext(AuthContext);

  return (
    profile && (
      <div className="dashboard-page">
        <div className="dashboard-wrapper">
          {/* Header Banner Profile */}
          <div className="profile-banner">
            <div className="profile-info">
              <h1 className="profile-name">{profile.data.nama}</h1>
              <p className="profile-email">{profile.data.email}</p>
            </div>

            <button
              className="logout-button"
              onClick={handleLogout || logout}
            >
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
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span>Logout</span>
            </button>
          </div>

          {children}

          {/* Buku Section */}
          <Buku setMessage={setMessage} message={message} />
        </div>
      </div>
    )
  );
}

export default Profile;
