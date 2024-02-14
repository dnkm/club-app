import { useState } from "react";
import { supabase } from "./utils/supabaseClient";

export default function Auth() {
  return (
    <div className="bg-base-100 p-5 rounded flex w-full">
      <SignUp />
      <div className="divider divider-horizontal divider-primary" />
      <SignIn />
    </div>
  );
}

function SignUp() {
  let [error, setError] = useState(null);

  async function signUp(ev) {
    ev.preventDefault();
    setError(null);

    let { error } = await supabase.auth.signUp({
      email: ev.target.email.value,
      password: ev.target.password.value,
    });

    if (error) setError(error.message);
  }

  return (
    <form onSubmit={signUp} className="flex-grow text-center">
      <div className="font-bold text-xl">Register</div>
      <input
        className="input input-primary w-full my-5"
        type="email"
        placeholder="email"
        htmlFor="email"
        id="email"
      />
      <br />
      <input
        className="input input-primary w-full mb-5"
        type="password"
        placeholder="password"
        htmlFor="password"
        id="password"
      />
      <br />
      <button className="btn btn-sm btn-primary btn-outline w-full">
        Sign Up
      </button>
      {error && <div className="text-error mt-5">{error.message}</div>}
    </form>
  );
}

function SignIn() {
  let [error, setError] = useState(null);
  async function signIn(ev) {
    ev.preventDefault();
    setError(null);

    let { error } = await supabase.auth.signInWithPassword({
      email: ev.target.email.value,
      password: ev.target.password.value,
    });

    if (error) setError(error.message);
  }

  return (
    <form onSubmit={signIn} className="flex-grow text-center">
      <div className="font-bold text-xl">Sign In</div>
      <input
        className="input input-primary w-full my-5"
        type="email"
        placeholder="email"
        htmlFor="email"
        id="email"
      />
      <br />
      <input
        className="input input-primary w-full mb-5"
        type="password"
        placeholder="password"
        htmlFor="password"
        id="password"
      />
      <br />
      <button className="btn btn-sm btn-primary btn-outline w-full">
        Sign In
      </button>
      {error && <div className="text-error mt-5">{error.message}</div>}
    </form>
  );
}
