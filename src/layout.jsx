import { useContext } from "react";
import Auth from "./auth";
import { AppContext } from "./App";
import { Link, Outlet } from "react-router-dom";
import { supabase } from "./utils/supabaseClient";

export default function Layout() {
  let { user } = useContext(AppContext);

  function signOut() {
    supabase.auth.signOut();
  }

  return (
    <div className="min-h-screen flex flex-col bg-base-300">
      <div className="border-b p-5 space-x-2 flex items-center">
        <div>
          <Link to="/" className="btn btn-ghost font-bold">
            btree
          </Link>
        </div>
        <div className="flex-grow">
          <Link to="/about" className="btn btn-ghost btn-sm">
            About Us
          </Link>
        </div>
        {user && (
          <div>
            <button onClick={signOut} className="btn btn-sm btn-error">
              Sign Out
            </button>
          </div>
        )}
      </div>
      <div className="p-5 flex-grow bg-neutral">
        {user ? <Outlet /> : <Auth />}
      </div>
    </div>
  );
}
