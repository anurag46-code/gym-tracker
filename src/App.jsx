import React, { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import WorkoutTracker from './components/WorkoutTracker'
import Achievements from './components/Achievements'
import Profile from './components/Profile'
import DailyMotivation from './components/DailyMotivation'

const motivationQuotes = [
  "The only bad workout is the one that didn't happen.",
  "Strength doesn't come from what you can do. It comes from overcoming the things you once thought you couldn't.",
  "Don't stop when you're tired. Stop when you're done.",
  "Your body can stand almost anything. It's your mind you have to convince.",
  "The hardest lift of all is lifting your butt off the couch.",
  "Excuses don't build muscle. Consistency does.",
  "Be stronger than your strongest excuse.",
  "Sweat is just fat crying.",
  "The pain you feel today will be the strength you feel tomorrow.",
  "A year from now you will wish you had started today."
]

function App() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [userData, setUserData] = useState({
    name: 'XD',
    level: 1,
    xp: 0,
    streak: 0,
    workoutsCompleted: 0,
    totalWeightLifted: 0
  })
  const [workouts, setWorkouts] = useState([])
  const [achievements, setAchievements] = useState([])

  const getDailyMotivation = () => {
    const today = new Date().toDateString()
    const dayIndex = today.split('').reduce((a, b) => a + b.charCodeAt(0), 0) % motivationQuotes.length
    return motivationQuotes[dayIndex]
  }

  const addWorkout = (workout) => {
    const newWorkouts = [...workouts, {
      ...workout,
      id: Date.now(),
      date: new Date().toISOString(),
      xpEarned: 50
    }]
    setWorkouts(newWorkouts)
    
    // Update user stats
    setUserData(prev => ({
      ...prev,
      xp: prev.xp + 50,
      workoutsCompleted: prev.workoutsCompleted + 1,
      totalWeightLifted: prev.totalWeightLifted + (workout.totalWeight || 0),
      streak: prev.streak + 1
    }))

    // Check for achievements
    checkAchievements(newWorkouts)
  }

  const checkAchievements = (workouts) => {
    const newAchievements = []
    const totalWorkouts = workouts.length
    const totalWeight = workouts.reduce((sum, w) => sum + (w.totalWeight || 0), 0)

    if (totalWorkouts >= 1 && !achievements.find(a => a.id === 'first-workout')) {
      newAchievements.push({ id: 'first-workout', name: 'First Workout!', description: 'Completed your first workout', badge: '🥇' })
    }
    if (totalWorkouts >= 5 && !achievements.find(a => a.id === 'five-workouts')) {
      newAchievements.push({ id: 'five-workouts', name: 'Consistency', description: 'Completed 5 workouts', badge: '🔥' })
    }
    if (totalWeight >= 1000 && !achievements.find(a => a.id === 'one-ton')) {
      newAchievements.push({ id: 'one-ton', name: 'One Ton Club', description: 'Lifted 1000kg total', badge: '💪' })
    }
    if (userData.streak >= 7 && !achievements.find(a => a.id === 'week-streak')) {
      newAchievements.push({ id: 'week-streak', name: '7-Day Streak', description: 'Workout streak of 7 days', badge: '⚡' })
    }

    if (newAchievements.length > 0) {
      setAchievements(prev => [...prev, ...newAchievements])
    }
  }

  useEffect(() => {
    // Level up logic
    const level = Math.floor(userData.xp / 100) + 1
    if (level > userData.level) {
      setUserData(prev => ({ ...prev, level }))
    }
  }, [userData.xp])

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard userData={userData} motivation={getDailyMotivation()} />
      case 'tracker':
        return <WorkoutTracker onAddWorkout={addWorkout} />
      case 'achievements':
        return <Achievements achievements={achievements} />
      case 'profile':
        return <Profile userData={userData} />
      default:
        return <Dashboard userData={userData} motivation={getDailyMotivation()} />
    }
  }

  return (
    <div className="container">
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: 'white', fontSize: '3em', marginBottom: '10px' }}>💪 Gym Tracker</h1>
        <p style={{ color: 'white', fontSize: '1.2em' }}>Level up your fitness journey!</p>
      </header>

      <nav style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
        {['dashboard', 'tracker', 'achievements', 'profile'].map(view => (
          <button
            key={view}
            className="btn"
            style={{ 
              background: currentView === view ? '#ff6b6b' : 'rgba(255,255,255,0.2)',
              fontSize: '14px',
              padding: '10px 20px'
            }}
            onClick={() => setCurrentView(view)}
          >
            {view.charAt(0).toUpperCase() + view.slice(1)}
          </button>
        ))}
      </nav>

      {renderView()}

      <DailyMotivation quote={getDailyMotivation()} />
    </div>
  )
}

export default App