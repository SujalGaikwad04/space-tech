import { useState } from 'react';
import './RankProgressionModal.css';
import { RANKS } from '../../utils/rankUtils';

const RankProgressionModal = ({ isOpen, onClose, currentLevel, currentXP }) => {
    if (!isOpen) return null;

    // Rank badge emojis - getting more impressive with higher ranks
    const rankBadges = {
        1: '🎓', // Trainee - graduation cap
        2: '🔍', // Explorer - magnifying glass
        3: '🧭', // Navigator - compass
        4: '✈️', // Pilot - airplane
        5: '⚡', // Specialist - lightning
        6: '👑', // Commander - crown
        7: '🔬', // Scientist Chief Commander - microscope
        8: '💫', // Stellar Expert - dizzy star
        9: '🚀', // Fleet Captain - rocket
        10: '🌟' // Mission Director - glowing star
    };

    // XP required for each level
    const getXPForLevel = (level) => (level - 1) * 50;
    const getXPToNextLevel = (level) => level * 50;

    return (
        <div className="rank-modal-overlay" onClick={onClose}>
            <div className="rank-modal-container" onClick={(e) => e.stopPropagation()}>
                <button className="rank-modal-close" onClick={onClose}>✕</button>

                <div className="rank-modal-header">
                    <h2 className="rank-modal-title">Your Rank Journey</h2>
                    <p className="rank-modal-subtitle">
                        Current Rank: <span className="current-rank-highlight">{RANKS[currentLevel || 1]}</span>
                    </p>
                    <div className="rank-xp-display">
                        <span className="xp-amount">{currentXP || 0} XP</span>
                        <span className="xp-separator">•</span>
                        <span className="xp-next">
                            {currentLevel < 10 ? `${getXPToNextLevel(currentLevel) - (currentXP || 0)} XP to ${RANKS[(currentLevel || 1) + 1]}` : 'Max Rank Achieved!'}
                        </span>
                    </div>
                </div>

                <div className="rank-progression-scroll">
                    <div className="rank-cards-container">
                        {Object.entries(RANKS).map(([level, rankName]) => {
                            const lvl = parseInt(level);
                            const isUnlocked = currentLevel >= lvl;
                            const isCurrent = currentLevel === lvl;
                            const xpRequired = getXPForLevel(lvl);
                            const xpToNext = getXPToNextLevel(lvl);

                            return (
                                <div
                                    key={level}
                                    className={`rank-card ${isUnlocked ? 'unlocked' : 'locked'} ${isCurrent ? 'current' : ''} rank-tier-${lvl}`}
                                >
                                    <div className="rank-card-badge">
                                        <div className="badge-circle">
                                            <span className="badge-emoji">{rankBadges[lvl]}</span>
                                        </div>
                                        {isCurrent && <div className="current-indicator">CURRENT</div>}
                                    </div>

                                    <div className="rank-card-content">
                                        <div className="rank-level">Level {level}</div>
                                        <h3 className="rank-name">{rankName}</h3>
                                        <div className="rank-xp-info">
                                            {lvl === 1 ? (
                                                <span>Starting Rank</span>
                                            ) : (
                                                <span>{xpRequired} - {xpToNext - 1} XP</span>
                                            )}
                                        </div>
                                    </div>

                                    {!isUnlocked && (
                                        <div className="rank-lock-overlay">
                                            <span className="lock-icon">🔒</span>
                                        </div>
                                    )}

                                    {isUnlocked && !isCurrent && (
                                        <div className="rank-unlocked-check">✓</div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="rank-modal-footer">
                    <div className="progress-bar-container">
                        <div className="progress-bar-label">
                            <span>Overall Progress</span>
                            <span>{Math.min(Math.round(((currentLevel - 1) / 9) * 100), 100)}%</span>
                        </div>
                        <div className="progress-bar-track">
                            <div
                                className="progress-bar-fill"
                                style={{ width: `${Math.min(((currentLevel - 1) / 9) * 100, 100)}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RankProgressionModal;
