export function getXpForLevel(level) {
    return level * 100;
}

export function calculateLevel(xp) {
    let level = 1;
    let required = 100;

    while (xp >= required) {
        level++;
        required = level * 100;
    }

    return level;
}

export function getProgress(xp, level) {
    const currentLevelXP = (level - 1) * 100;
    const nextLevelXP = level * 100;

    const progressXP = xp - currentLevelXP;
    const neededXP = nextLevelXP - currentLevelXP;

    return {
        progressXP,
        neededXP,
        percent: Math.min((progressXP / neededXP) * 100, 100),
    };
}