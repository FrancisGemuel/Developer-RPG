import { supabase } from "./supabase";
import { addXP } from "./xpService";

// CREATE PROJECT (QUEST COMPLETION) // RETHINK
export async function createProject(userId, project) {
    // 1. Insert project into DB
    const { data, error } = await supabase
        .from("projects")
        .insert({
            user_id: userId,
            title: project.title,
            description: project.description,
            github_url: project.github_url,
            xp_reward: project.xp_reward || 100,
        })
        .select()
        .single();

    if (error) return { error };

    // 2. Give XP reward // OR SOMETHING
    await addXP(userId, project.xp_reward || 100);

    return { data };
}

// GET USER PROJECTS 
export async function getProjects(userId) {
    const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

    return { data, error };
}