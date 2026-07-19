import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { addXP } from "../services/xpService";
import { getProjects } from "../services/projectService";
import ProjectForm from "../components/ProjectForm";

export default function Dashboard() {
    const { user, profile } = useAuth();
    const [projects, setProjects] = useState([]);
    //loadprojects
    const loadProjects = async () => {
        if (!user) return;
        const { data } = await getProjects(user.id);
        setProjects(data || []);
    };
    //loadprojects
    useEffect(() => {
        loadProjects();
    }, [user]);

    const handleGainXP = async () => {
        if (!user) return;
        await addXP(user.id, 50);
        window.location.reload();
    };

    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold">
                Developer RPG
            </h1>

            {/* USER STATS */}
            <div className="mt-6 bg-slate-800 p-6 rounded">
                <h2 className="text-xl">
                    Welcome {profile?.username}
                </h2>

                <p>Level: {profile?.level}</p>
                <p>XP: {profile?.xp}</p>

                <p className="text-sm text-gray-400 mt-2">
                    Logged in as: {user?.email}
                </p>

                <button
                    onClick={handleGainXP}
                    className="mt-4 bg-green-600 px-4 py-2 rounded"
                >
                    +50 XP (Test Quest)
                </button>
            </div>

            {/* QUEST FORM */}
            <ProjectForm onProjectAdded={loadProjects} />

            {/* PROJECT LIST */}
            <div className="mt-6">
                <h2 className="text-xl mb-3">
                    Completed Quests
                </h2>

                {projects.map((p) => (
                    <div key={p.id} className="bg-slate-800 p-4 mb-2 rounded">
                        <h3 className="font-bold">{p.title}</h3>
                        <p className="text-sm text-gray-300">
                            {p.description}
                        </p>
                        <p className="text-green-400">
                            +{p.xp_reward} XP
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}