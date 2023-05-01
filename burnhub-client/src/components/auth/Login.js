import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { emailAuth } from "../helpers/emailAuth";
import { googleAuth } from "../helpers/googleAuth";

export const Login = () => {
    const [login, setLogin] = useState({
        email: "",
        password: "",
    })
    const navigate = useNavigate();

    const updateLogin = (evt) => {
        const copy = { ...login };
        copy[evt.target.id] = evt.target.value;
        setLogin(copy);
    }

    // Login With Email & Password
    const onSubmitLoginEmail = async (e) => {
        e.preventDefault();
        emailAuth.signIn(login, navigate);
    }

    // Login with Google
    const onSubmitLoginGoogle = async () => {
        googleAuth.signInRegister(navigate);
    }

    return <main className="flex flex-col justify-center items-center">
        <section>
            <form className="form--login" onSubmit={onSubmitLoginEmail}>
                <fieldset>
                    <input
                        type="email"
                        value={login.email}
                        id="email"
                        onChange={(evt) => updateLogin(evt)}
                        className="border text-center"
                        placeholder="email address"
                        required
                        autoFocus
                    />
                </fieldset>
                <fieldset>
                    <input
                        type="password"
                        value={login.password}
                        id="password"
                        onChange={(evt) => updateLogin(evt)}
                        className="border text-center"
                        placeholder="password"
                        required
                        autoFocus
                    />
                </fieldset>
                <fieldset className="flex flex-col justify-center items-center">
                    <button type="submit" className="border border-black">Sign in</button>
                </fieldset>
            </form>
        </section>

        <span className="block">or</span>

        <button type="submit" className="border border-black" onClick={onSubmitLoginGoogle}>
        Login with Google
        </button>

        <section className="link--register">
            <span>Not a user yet? </span>
            <Link to="/register" className="underline">Click here to register</Link>
        </section>
    </main>
}