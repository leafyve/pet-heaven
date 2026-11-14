import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { AppProvider, useApp } from "./context";
import { Header, Footer } from "./components";
import {
  Home,
  Directory,
  About,
  Contact,
  Auth,
  Application,
  Care,
  Community,
  Credits,
  NotFound,
} from "./pages";
import "./styles.css";
function App() {
  const [hash, setHash] = useState(() => window.location.hash.slice(1) || "/");
  const { notice } = useApp();
  useEffect(() => {
    const fn = () => setHash(window.location.hash.slice(1) || "/");
    window.addEventListener("hashchange", fn);
    return () => window.removeEventListener("hashchange", fn);
  }, []);
  const [route, query = ""] = hash.split("?");
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${route === "/" ? "A little love. A new beginning." : route.split("/")[1].replace(/^./, (c) => c.toUpperCase())} | Pet Heaven`;
    document.querySelector("main")?.focus({ preventScroll: true });
  }, [hash]);
  const next = new URLSearchParams(query).get("next") || "/pets";
  let page;
  switch (route) {
    case "/":
      page = <Home />;
      break;
    case "/pets":
      page = <Directory />;
      break;
    case "/saved":
      page = <Directory savedOnly />;
      break;
    case "/about":
      page = <About />;
      break;
    case "/contact":
      page = <Contact />;
      break;
    case "/care":
      page = <Care />;
      break;
    case "/community":
      page = <Community />;
      break;
    case "/credits":
      page = <Credits />;
      break;
    case "/login":
      page = <Auth mode="login" next={next} />;
      break;
    case "/signup":
      page = <Auth mode="signup" next={next} />;
      break;
    case "/release":
      page = <Application kind="Release" />;
      break;
    default:
      page = route.startsWith("/adopt/") ? (
        <Application kind="Adoption" petId={route.split("/")[2]} />
      ) : (
        <NotFound />
      );
  }
  return (
    <>
      <a
        className="skip"
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          document.querySelector("main")?.focus();
        }}
      >
        Skip to content
      </a>
      <Header route={route} />
      {notice && (
        <p className="notice" role="status">
          {notice}
        </p>
      )}
      <main id="main" tabIndex="-1" key={route}>
        {page}
      </main>
      <Footer />
    </>
  );
}
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
);
