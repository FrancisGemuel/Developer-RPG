import { supabase } from "./supabase";
// should be in the backend
// GET PROFILE
export async function getProfile(userId) {
    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

    return { data, error };
}

// CREATE PROFILE (safe fallback) // rethink?
export async function createProfile(user) {
    const { data, error } = await supabase
        .from("profiles")
        .insert({
            id: user.id,
            username: user.email.split("@")[0],
            xp: 0,
            level: 1,
        });

    return { data, error };
}