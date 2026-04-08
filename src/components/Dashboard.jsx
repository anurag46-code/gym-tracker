import React from 'react'

const Dashboard = ({ userData, motivation }) => {
  const xpToNextLevel = userData.xp % 100
  
  return (
    <div>
      <div className="card text-center">
        <h2 style={{ marginBottom: '8px' }}>Welcome back, {userData.name}! 👋</h2>
        <p style={{ fontSize: '1.1em', color: 'var(--text-secondary)', marginBottom: '32px' }}>
          Level {userData.level} • {userData.xp} XP
        </p>
        
        <div className="grid grid-4">
          <div className="stat-card">
            <div className="stat-number">{userData.streak}</div>
            <div className="stat-label">🔥 Streak Days</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-number">{userData.workoutsCompleted}</div>
            <div className="stat-label">💪 Workouts</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-number">{userData.totalWeightLifted}</div>
            <div className="stat-label">🏋️ Total KG</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-number">{userData.level}</div>
            <div className="stat-label">⭐ Level</div>
          </div>
        </div>
      </div>

      <div className="motivation-card">
        <h3 style={{ marginBottom: '16px', fontSize: '1.4em' }}>💬 Daily Motivation</h3>
        <p style={{ fontSize: '1.2em', lineHeight: '1.6' }}>"{motivation}"</p>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: '24px' }}>📈 Progress Overview</h3>
        <div className="form-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'center' }}>
            <span className="form-label">Next Level Progress</span>
            <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
              {xpToNextLevel}/100 XP
            </span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${xpToNextLevel}%` }}
            ></div>
          </div>
        </div>
        
        <div className="grid grid-2" style={{ marginTop: '24px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2em', fontWeight: '700', marginBottom: '8px' }}>
              {100 - xpToNextLevel}
            </div>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              XP to Next Level
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2em', fontWeight: '700', marginBottom: '8px' }}>
              {Math.floor(userData.xp / 100)}
            </div>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              Levels Completed
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard