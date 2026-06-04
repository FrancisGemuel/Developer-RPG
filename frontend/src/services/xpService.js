import { supabase } from "./supabase";
import { calculateLevel } from "../utils/xpEngine";

// ADD XP TO USER
export async function addXP(userId, amount) {
    // 1. Get current profile
    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

    if (!profile) return;

    // 2. Update XP
    const newXP = profile.xp + amount;

    // 3. Recalculate level
    const newLevel = calculateLevel(newXP);

    // 4. Save back to DB
    const { data, error } = await supabase
        .from("profiles")
        .update({
            xp: newXP,
            level: newLevel,
        })
        .eq("id", userId);

    return { data, error };
}