import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

function AuthProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      return;
    }

    async function getProfile() {
      try {
        const response = await fetch(
          "https://crud-mern-15iw.vercel.app/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const dataProfile = await response.json();

        if (response.ok) {
          setProfile(dataProfile);
        } else {
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    }

    getProfile();
  }, []);

  async function login(email, password) {
    try {
      const response = await fetch(
        "https://crud-mern-15iw.vercel.app/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        return data.message;
      }

      localStorage.setItem("token", data.token);

      console.log("Login berhasil");

      const token = localStorage.getItem("token");

      const responseProfile = await fetch("http://localhost:3000/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const dataProfile = await responseProfile.json();

      setProfile(dataProfile);

      console.log(dataProfile);
    } catch (error) {
      console.log(error);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setProfile(null);
  }

  return (
    <AuthContext.Provider value={{ profile, logout, login, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
