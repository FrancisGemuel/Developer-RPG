import { useState } from "react";
import { supabase } from "../services/supabase";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    //auth register
    const handleRegister = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });
        //handle error
        if (error) {
            setLoading(false);
            setError(error.message);
            return;
        }

        if (data.user) {
            const { error: profileError } = await supabase
                .from("profiles")
                .insert({
                    id: data.user.id,
                    username,
                    xp: 0,
                    level: 1,
                });

            if (profileError) {
                setError(profileError.message);
            }
        }

        setLoading(false);

        navigate("/");
    };
    //reDesign
    return (
        <div className="min-h-screen flex justify-center items-center">
            <form
                onSubmit={handleRegister}
                className="bg-slate-800 p-8 rounded-lg w-full max-w-md"
            >
                <h1 className="text-3xl font-bold mb-6 text-center">
                    Register
                </h1>

                {error && (
                    <p className="bg-red-500 p-2 rounded mb-4">
                        {error}
                    </p>
                )}

                <input
                    type="text"
                    placeholder="Username"
                    className="w-full p-3 rounded bg-slate-700 mb-4"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

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
                    className="w-full bg-green-600 p-3 rounded hover:bg-green-700"
                >
                    {loading ? "Creating..." : "Create Account"}
                </button>

                <p className="mt-4 text-center">
                    Already have an account?
                    <Link
                        to="/"
                        className="text-blue-400 ml-2"
                    >
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}