import React from 'react'

interface ScoreBadgeProps {
    score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
    // Determine badge style and text based on score
    let badgeColor = '';
    let textColor = '';
    let badgeText = '';

    if (score > 75) {
        badgeColor = 'bg-badge-green';
        textColor = 'text-green-600';
        badgeText = 'Strong';
    } else if (score > 49) {
        badgeColor = 'bg-badge-yellow';
        textColor = 'text-yellow-600';
        badgeText = 'Cool Start';
    } else {
        badgeColor = 'bg-badge-red';
        textColor = 'text-red-600';
        badgeText = 'Needs Work';
    }

    return (
        <div className={`inline-block px-3 py-1 rounded-full ${badgeColor}`}>
            <p className={`text-sm font-medium ${textColor}`}>{badgeText}</p>
        </div>
    )
}

export default ScoreBadge
