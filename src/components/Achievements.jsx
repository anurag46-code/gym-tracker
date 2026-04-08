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
      <div className="card" style={{ textAlign: 'center' }}>
        <h2>🏆 Achievements</h2>
        <p style={{ fontSize: '1.1em', marginBottom: '20px' }}>
          Unlocked: {achievements.length} / {allAchievements.length}
        </p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '20px',
          marginTop: '20px'
        }}>
          {allAchievements.map(achievement => (
            <div 
              key={achievement.id}
              className="card" 
              style={{ 
                background: achievement.locked ? '#f0f0f0' : 'linear-gradient(45deg, #667eea, #764ba2)',
                color: achievement.locked ? '#666' : 'white',
                opacity: achievement.locked ? 0.7 : 1,
                position: 'relative'
              }}
            >
              {achievement.locked && (
                <div style={{ 
                  position: 'absolute', 
                  top: '10px', 
                  right: '10px', 
                  fontSize: '1.5em',
                  opacity: 0.3
                }}>
                  🔒
                </div>
              )}
              
              <div style={{ fontSize: '3em', marginBottom: '10px' }}>
                {achievement.badge}
              </div>
              
              <h3 style={{ marginBottom: '10px' }}>{achievement.name}</h3>
              <p style={{ fontSize: '0.9em', opacity: 0.9 }}>{achievement.description}</p>
              
              {!achievement.locked && (
                <div style={{ 
                  marginTop: '15px', 
                  padding: '5px 10px', 
                  background: 'rgba(255,255,255,0.2)', 
                  borderRadius: '10px',
                  fontSize: '0.8em'
                }}>
                  Unlocked! 🎉
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {achievements.length > 0 && (
        <div className="card" style={{ background: 'linear-gradient(45deg, #ffd93d, #ff6b6b)', color: 'white' }}>
          <h3>🎯 Your Progress</h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '15px' }}>
            {achievements.map(achievement => (
              <span key={achievement.id} className="badge" style={{ background: 'white', color: '#333' }}>
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