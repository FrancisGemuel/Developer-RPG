import { useState } from "react";
import { createProject } from "../services/projectService";
import { useAuth } from "../context/AuthContext";

export default function ProjectForm({ onProjectAdded }) {
    const { user } = useAuth();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [github, setGithub] = useState("");
    const [loading, setLoading] = useState(false);
    //submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        //create
        await createProject(user.id, {
            title,
            description,
            github_url: github,
            xp_reward: 100,
        });
        ///reset?
        setTitle("");
        setDescription("");
        setGithub("");

        setLoading(false);
        //rethink
        if (onProjectAdded) onProjectAdded();
    };

    // refactor add more
    return (
        <form
            onSubmit={handleSubmit}
            className="bg-slate-800 p-4 rounded mt-6"
        >
            <h2 className="text-xl mb-4">Add Project Quest</h2>
            //Project
            <input
                className="w-full p-2 mb-2 bg-slate-700"
                placeholder="Project Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            //description
            <textarea
                className="w-full p-2 mb-2 bg-slate-700"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            // github_url
            <input
                className="w-full p-2 mb-2 bg-slate-700"
                placeholder="GitHub URL"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
            />
            // submit
            <button
                disabled={loading}
                className="bg-blue-600 px-4 py-2 rounded"
            >
                {loading ? "Submitting..." : "Complete Quest (+100 XP)"}
            </button>
        </form>
    );
}