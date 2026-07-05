import { useState } from "react";
import { supabase } from "../services/supabase";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    //Handle Login
    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");
        //supabase auth
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        setLoading(false);

        if (error) {
            setError(error.message);
            return;
        }
        //refactor nav maybe?
        navigate("/dashboard");
    };
    //redesign
    return (
        <div className="min-h-screen flex justify-center items-center">
            <form
                onSubmit={handleLogin}
                className="bg-slate-800 p-8 rounded-lg w-full max-w-md"
            >
                <h1 className="text-3xl font-bold mb-6 text-center">
                    Login
                </h1>

                {error && (
                    <p className="bg-red-500 p-2 rounded mb-4">
                        {error}
                    </p>
                )}

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 rounded bg-slate-700 mb-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 rounded bg-slate-700 mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    disabled={loading}
                    className="w-full bg-blue-600 p-3 rounded hover:bg-blue-700"
                >
                    {loading ? "Logging In..." : "Login"}
                </button>

                <p className="mt-4 text-center">
                    No account?
                    <Link
                        to="/register"
                        className="text-blue-400 ml-2"
                    >
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
}