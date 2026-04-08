import React from 'react'

const Achievements = ({ achievements }) => {
  const allAchievements = [
    { id: 'first-workout', name: 'First Workout!', description: 'Completed your first workout', badge: '🥇', locked: !achievements.find(a => a.id === 'first-workout') },
    { id: 'five-workouts', name: 'Consistency', description: 'Completed 5 workouts', badge: '🔥', locked: !achievements.find(a => a.id === 'five-workouts') },
    { id: 'one-ton', name: 'One Ton Club', description: 'Lifted 1000kg total', badge: '💪', locked: !achievements.find(a => a.id === 'one-ton') },
    { id: 'week-streak', name: '7-Day Streak', description: 'Workout streak of 7 days', badge: '⚡', locked: !achievements.find(a => a.id === 'week-streak') },
    { id: 'month-streak', name: 'Monthly Warrior', description: '30-day workout streak', badge: '🏆', locked: true },
    { id: 'five-k', name: '5K Club', description: 'Lifted 5000kg total', badge: '🚀', locked: true },
    { id: 'variety', name: 'Workout Variety', description: 'Tried all workout types', badge: '🌈', locked: true },
    { id: 'early-bird', name: 'Early Bird', description: 'Workout before 7 AM', badge: '🌅', locked: true }
  ]

  return (
    <div>
      <div className="card text-center">
        <h2 style={{ marginBottom: '16px' }}>🏆 Achievements</h2>
        <p style={{ fontSize: '1.1em', color: 'var(--text-secondary)', marginBottom: '32px' }}>
          Unlocked: {achievements.length} / {allAchievements.length}
        </p>
        
        <div className="grid grid-2">
          {allAchievements.map(achievement => (
            <div 
              key={achievement.id}
              className={`achievement-card ${achievement.locked ? 'locked' : ''}`}
            >
              {achievement.locked && (
                <div style={{ 
                  position: 'absolute', 
                  top: '16px', 
                  right: '16px', 
                  fontSize: '1.5em',
                  opacity: 0.5
                }}>
                  🔒
                </div>
              )}
              
              <div className="emoji">{achievement.badge}</div>
              
              <h3>{achievement.name}</h3>
              <p>{achievement.description}</p>
              
              {!achievement.locked && (
                <div className="badge" style={{ marginTop: '16px' }}>
                  🎉 Unlocked
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {achievements.length > 0 && (
        <div className="card" style={{ background: 'var(--secondary-gradient)', color: 'white' }}>
          <h3 style={{ marginBottom: '20px' }}>🎯 Your Progress</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {achievements.map(achievement => (
              <span key={achievement.id} className="badge" style={{ background: 'rgba(255,255,255,0.2)' }}>
                {achievement.badge} {achievement.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Achievements