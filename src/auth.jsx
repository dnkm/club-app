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
      options: {
        data: {
          full_name: ev.target.full_name.value,
          grad_year: parseInt(ev.target.grad_year.value, 10),
        },
      },
    });

    if (error) setError(error.message);
  }

  return (
    <form onSubmit={signUp} className="flex-grow text-center space-y-5">
      <div className="font-bold text-xl">Register</div>
      <input
        className="input input-primary w-full"
        type="email"
        placeholder="email"
        name="email"
      />
      <input
        className="input input-primary w-full"
        type="password"
        placeholder="password"
        name="password"
      />
      <input
        className="input input-primary w-full"
        type="text"
        placeholder="Full Name"
        name="full_name"
      />
      <select
        name="grad_year"
        className="select select-primary w-full"
      >
        {new Array(6).fill(undefined).map((_, i) => (
          <option key={i} value={new Date().getFullYear() + i}>
            {new Date().getFullYear() + i} ({12 - i}th grade)
          </option>
        ))}
      </select>
      <button className="btn btn-sm btn-primary btn-outline w-full">
        Sign Up
      </button>
      {error && <div className="text-error">{error.message}</div>}
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
    <form onSubmit={signIn} className="flex-grow text-center space-y-5">
      <div className="font-bold text-xl">Sign In</div>
      <input
        className="input input-primary w-full"
        type="email"
        placeholder="email"
        htmlFor="email"
        name="email"
      />
      <input
        className="input input-primary w-full"
        type="password"
        placeholder="password"
        htmlFor="password"
        name="password"
      />
      <button className="btn btn-sm btn-primary btn-outline w-full">
        Sign In
      </button>
      {error && <div className="text-error">{error.message}</div>}
    </form>
  );
}
