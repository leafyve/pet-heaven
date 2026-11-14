import React, { createContext, useContext, useState } from "react";
const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);
function read(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}
export function AppProvider({ children }) {
  const [user, setUser] = useState(null),
    [accounts, setAccounts] = useState([]),
    [saved, setSaved] = useState(() => read("ph-saved", [])),
    [feedback, setFeedback] = useState(() => read("ph-feedback", [])),
    [notice, setNotice] = useState("");
  function persist(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      setNotice(
        "Browser storage is unavailable. Changes will last for this visit only.",
      );
    }
  }
  function toggleSaved(id) {
    setSaved((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];
      persist("ph-saved", next);
      return next;
    });
  }
  // Demo credentials stay in React memory only; this is not production authentication.
  function register(v) {
    if (accounts.some((a) => a.email === v.email.toLowerCase()))
      return "This email is already registered. Please log in.";
    const next = {
      name: v.name,
      email: v.email.toLowerCase(),
      password: v.password,
    };
    setAccounts((a) => [...a, next]);
    setUser({ name: next.name, email: next.email });
    return null;
  }
  function login(v) {
    const a = accounts.find(
      (a) => a.email === v.email.toLowerCase() && a.password === v.password,
    );
    if (!a)
      return "Email or password does not match. Register first in this browser visit.";
    setUser({ name: a.name, email: a.email });
    return null;
  }
  function addFeedback(v) {
    const row = {
      id: Date.now(),
      name: user.name,
      rating: v.rating,
      text: v.text,
    };
    setFeedback((prev) => {
      const next = [row, ...prev];
      persist("ph-feedback", next);
      return next;
    });
  }
  return (
    <AppContext.Provider
      value={{
        user,
        register,
        login,
        logout: () => setUser(null),
        saved,
        toggleSaved,
        feedback,
        addFeedback,
        notice,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
