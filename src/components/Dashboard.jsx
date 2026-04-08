import React from 'react'

const Dashboard = ({ userData, motivation }) => {
  return (
    <div>
      <div className="card" style={{ textAlign: 'center' }}>
        <h2>Welcome back, {userData.name}! 👋</h2>
        <p style={{ fontSize: '1.1em', marginBottom: '20px' }}>Level {userData.level} • {userData.xp} XP</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '30px' }}>
          <div className="card" style={{ background: 'linear-gradient(45deg, #667eea, #764ba2)', color: 'white' }}>
            <h3>🔥 Streak</h3>
            <p style={{ fontSize: '2em', fontWeight: 'bold' }}>{userData.streak} days</p>
          </div>
          
          <div className="card" style={{ background: 'linear-gradient(45deg, #ff6b6b, #ffd93d)', color: 'white' }}>
            <h3>💪 Workouts</h3>
            <p style={{ fontSize: '2em', fontWeight: 'bold' }}>{userData.workoutsCompleted}</p>
          </div>
          
          <div className="card" style={{ background: 'linear-gradient(45deg, #4ecdc4, #44a08d)', color: 'white' }}>
            <h3>🏋️ Weight</h3>
            <p style={{ fontSize: '2em', fontWeight: 'bold' }}>{userData.totalWeightLifted}kg</p>
          </div>
          
          <div className="card" style={{ background: 'linear-gradient(45deg, #fdbb2d, #22c1c3)', color: 'white' }}>
            <h3>⭐ Level</h3>
            <p style={{ fontSize: '2em', fontWeight: 'bold' }}>{userData.level}</p>
          </div>
        </div>
      </div>

      <div className="motivation-card">
        <h3>💬 Daily Motivation</h3>
        <p style={{ fontSize: '1.3em', marginTop: '15px' }}>"{motivation}"</p>
      </div>

      <div className="card">
        <h3>📈 Progress Overview</h3>
        <div style={{ marginTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span>Next Level:</span>
            <span>{userData.xp % 100}/100 XP</span>
          </div>
          <div style={{ 
            width: '100%', 
            height: '20px', 
            background: '#e0e0e0', 
            borderRadius: '10px',
            overflow: 'hidden'
          }}>
            <div style={{ 
              width: `${(userData.xp % 100)}%`, 
              height: '100%', 
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              transition: 'width 0.3s'
            }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard