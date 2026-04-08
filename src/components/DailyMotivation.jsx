import React from 'react'

const DailyMotivation = ({ quote }) => {
  return (
    <div className="motivation-card">
      <h3>💬 Daily Motivation</h3>
      <p style={{ fontSize: '1.3em', marginTop: '15px' }}>"{quote}"</p>
    </div>
  )
}

export default DailyMotivation