import React from 'react'

const Profile = ({ userData }) => {
  return (
    <div className="card">
      <h2>👤 Your Profile</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
        <div>
          <h3>📊 Stats</h3>
          <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
            <p><strong>Level:</strong> {userData.level}</p>
            <p><strong>XP:</strong> {userData.xp}</p>
            <p><strong>Streak:</strong> {userData.streak} days</p>
            <p><strong>Workouts:</strong> {userData.workoutsCompleted}</p>
            <p><strong>Total Weight:</strong> {userData.totalWeightLifted}kg</p>
          </div>
        </div>
        
        <div>
          <h3>🎯 Goals</h3>
          <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
            <p>🏋️‍♂️ <strong>Next Level:</strong> {100 - (userData.xp % 100)} XP needed</p>
            <p>🔥 <strong>7-Day Streak:</strong> {7 - userData.streak} days remaining</p>
            <p>💪 <strong>1 Ton Club:</strong> {1000 - userData.totalWeightLifted}kg remaining</p>
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <h3>🌟 Fitness Journey</h3>
        <p>Keep pushing! Every workout brings you closer to your goals.</p>
      </div>
    </div>
  )
}

export default Profile