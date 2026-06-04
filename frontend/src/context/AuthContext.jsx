import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { getProfile, createProfile } from "../services/profile";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadProfile = async (user) => {
        let { data } = await getProfile(user.id);

        // If no profile exists → create it
        if (!data) {
            const created = await createProfile(user);

            if (created.error) {
                console.error(created.error);
            }

            const fresh = await getProfile(user.id);
            setProfile(fresh.data);
        } else {
            setProfile(data);
        }
    };

    useEffect(() => {
        supabase.auth.getSession().then(async ({ data }) => {
            const sessionUser = data.session?.user ?? null;

            setUser(sessionUser);

            if (sessionUser) {
                await loadProfile(sessionUser);
            }

            setLoading(false);
        });

        const { data: listener } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                const sessionUser = session?.user ?? null;

                setUser(sessionUser);

                if (sessionUser) {
                    await loadProfile(sessionUser);
                } else {
                    setProfile(null);
                }
            }
        );

        return () => listener.subscription.unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, profile }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);