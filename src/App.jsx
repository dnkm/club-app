import { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AboutUs from "./about";
import UserHome from "./home";
import Layout from "./layout";
import "./styles.css";
import { supabase } from "./utils/supabaseClient";

export const AppContext = createContext(null);

export default function App() {
  let [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        // signed in
        setUser(session.user);
      } else {
        // singed out
        setUser(null);
      }
    });
  }, []);

  return (
    <div>
      <AppContext.Provider value={{ user }}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<UserHome />} />
            <Route path="/about" element={<AboutUs />} />
          </Route>
        </Routes>
      </AppContext.Provider>
    </div>
  );
}


