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
  // Load data from localStorage on initial render
  const loadFromStorage = (key, defaultValue) => {
    try {
      const item = localStorage.getItem(`gym-tracker-${key}`)
      return item ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  }

  const [currentView, setCurrentView] = useState('dashboard')
  const [userData, setUserData] = useState(() => loadFromStorage('userData', {
    name: 'XD',
    level: 1,
    xp: 0,
    streak: 0,
    workoutsCompleted: 0,
    totalWeightLifted: 0
  }))
  const [workouts, setWorkouts] = useState(() => loadFromStorage('workouts', []))
  const [achievements, setAchievements] = useState(() => loadFromStorage('achievements', []))

  const getDailyMotivation = () => {
    const today = new Date().toDateString()
    const dayIndex = today.split('').reduce((a, b) => a + b.charCodeAt(0), 0) % motivationQuotes.length
    return motivationQuotes[dayIndex]
  }

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('gym-tracker-userData', JSON.stringify(userData))
  }, [userData])

  useEffect(() => {
    localStorage.setItem('gym-tracker-workouts', JSON.stringify(workouts))
  }, [workouts])

  useEffect(() => {
    localStorage.setItem('gym-tracker-achievements', JSON.stringify(achievements))
  }, [achievements])

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

  // Reset streak if user hasn't worked out today
  useEffect(() => {
    const today = new Date().toDateString()
    const lastWorkoutDate = workouts.length > 0 
      ? new Date(workouts[workouts.length - 1].date).toDateString()
      : null
    
    if (lastWorkoutDate !== today && userData.streak > 0) {
      setUserData(prev => ({ ...prev, streak: 0 }))
    }
  }, [workouts, userData.streak])

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
      
      <div style={{ textAlign: 'center', marginTop: '30px', fontSize: '0.8em', color: 'rgba(255,255,255,0.6)' }}>
        <button 
          onClick={() => {
            if (confirm('Are you sure you want to reset all data? This cannot be undone!')) {
              localStorage.removeItem('gym-tracker-userData')
              localStorage.removeItem('gym-tracker-workouts')
              localStorage.removeItem('gym-tracker-achievements')
              window.location.reload()
            }
          }}
          style={{ 
            background: 'rgba(255,255,255,0.1)', 
            color: 'rgba(255,255,255,0.7)', 
            border: 'none', 
            padding: '5px 10px', 
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          🔄 Reset Data
        </button>
      </div>
    </div>
  )
}

export default App