"use client";

import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface SessionState {
  user: {
    email: string;
  };
  token: string;
}

const UserContext = createContext<{
  session: SessionState | null;
  setSession: React.Dispatch<React.SetStateAction<SessionState | null>>;
}>({
  session: null,
  setSession: () => {},
});

const UserProvider = ({ children }: any) => {
  const [session, setSession] = useState<SessionState | null>(null);

  useEffect(() => {
    let userauth = window.localStorage.getItem("userauth");

    if (userauth) {
      setSession(JSON.parse(userauth));
    }
  }, []);

  const router = useRouter();

  let userauth =
    typeof window !== "undefined"
      ? window.localStorage.getItem("userauth")
      : null;

  const token = userauth ? JSON.parse(userauth).token : null;

  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  axios.defaults.withCredentials = true;

  useEffect(() => {
    // Add a response interceptor
    axios.interceptors.response.use(
      function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      },
      function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        let res = error.response;
        if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
          setSession(null);
          window.localStorage.removeItem("userauth");
          router.push("/signin");
        }
      }
    );
  }, [router]);

  return (
    <UserContext.Provider value={{ session, setSession }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
