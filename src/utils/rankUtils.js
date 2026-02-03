// Rank system utility functions
// Maps level numbers to rank names

export const RANKS = {
    1: "Trainee",
    2: "Explorer",
    3: "Navigator",
    4: "Pilot",
    5: "Specialist",
    6: "Commander",
    7: "Scientist Chief Commander",
    8: "Stellar Expert",
    9: "Fleet Captain",
    10: "Mission Director"
};

/**
 * Get rank name from level number
 * @param {number} level - The user's level (1-10+)
 * @returns {string} - The rank name
 */
export const getRankName = (level) => {
    if (!level || level < 1) return RANKS[1];
    if (level > 10) return RANKS[10]; // Cap at highest rank
    return RANKS[level] || RANKS[1];
};

/**
 * Get next rank name
 * @param {number} currentLevel - The user's current level
 * @returns {string} - The next rank name
 */
export const getNextRankName = (currentLevel) => {
    const nextLevel = Math.min((currentLevel || 1) + 1, 10);
    return getRankName(nextLevel);
};

/**
 * Get rank with level display (e.g., "Explorer (Level 2)")
 * @param {number} level - The user's level
 * @returns {string} - Formatted rank with level
 */
export const getRankWithLevel = (level) => {
    const rankName = getRankName(level);
    return `${rankName} (Level ${level || 1})`;
};
