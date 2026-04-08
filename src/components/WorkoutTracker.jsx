import React, { useState } from 'react'

const WorkoutTracker = ({ onAddWorkout }) => {
  const [workout, setWorkout] = useState({
    type: '',
    duration: '',
    exercises: [{ name: '', sets: '', reps: '', weight: '' }],
    notes: ''
  })

  const workoutTypes = ['Chest', 'Back', 'Legs', 'Arms', 'Shoulders', 'Cardio', 'Full Body', 'Other']

  const addExercise = () => {
    setWorkout(prev => ({
      ...prev,
      exercises: [...prev.exercises, { name: '', sets: '', reps: '', weight: '' }]
    }))
  }

  const updateExercise = (index, field, value) => {
    const newExercises = [...workout.exercises]
    newExercises[index][field] = value
    setWorkout(prev => ({ ...prev, exercises: newExercises }))
  }

  const removeExercise = (index) => {
    if (workout.exercises.length > 1) {
      const newExercises = workout.exercises.filter((_, i) => i !== index)
      setWorkout(prev => ({ ...prev, exercises: newExercises }))
    }
  }

  const calculateTotalWeight = () => {
    return workout.exercises.reduce((total, exercise) => {
      const sets = parseInt(exercise.sets) || 0
      const reps = parseInt(exercise.reps) || 0
      const weight = parseInt(exercise.weight) || 0
      return total + (sets * reps * weight)
    }, 0)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const totalWeight = calculateTotalWeight()
    const completedWorkout = {
      ...workout,
      totalWeight,
      date: new Date().toLocaleDateString()
    }
    
    onAddWorkout(completedWorkout)
    
    // Reset form
    setWorkout({
      type: '',
      duration: '',
      exercises: [{ name: '', sets: '', reps: '', weight: '' }],
      notes: ''
    })
    
    alert('Workout logged successfully! +50 XP earned! 🎉')
  }

  return (
    <div className="card">
      <h2 style={{ marginBottom: '24px' }}>📝 Log Your Workout</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-2">
          <div className="form-group">
            <label className="form-label">Workout Type</label>
            <select 
              value={workout.type} 
              onChange={(e) => setWorkout(prev => ({ ...prev, type: e.target.value }))}
              className="form-input"
              required
            >
              <option value="">Select workout type</option>
              {workoutTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Duration (minutes)</label>
            <input 
              type="number" 
              value={workout.duration} 
              onChange={(e) => setWorkout(prev => ({ ...prev, duration: e.target.value }))}
              className="form-input"
              placeholder="e.g., 60"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0 }}>Exercises</h3>
            <button type="button" className="btn" onClick={addExercise}>
              ➕ Add Exercise
            </button>
          </div>
          
          <div className="grid" style={{ gap: '16px' }}>
            {workout.exercises.map((exercise, index) => (
              <div key={index} className="card" style={{ padding: '20px', margin: 0 }}>
                <div className="grid grid-4" style={{ gap: '12px', alignItems: 'end' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Exercise</label>
                    <input 
                      type="text" 
                      value={exercise.name} 
                      onChange={(e) => updateExercise(index, 'name', e.target.value)}
                      className="form-input"
                      placeholder="e.g., Bench Press"
                      required
                    />
                  </div>
                  
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Sets</label>
                    <input 
                      type="number" 
                      value={exercise.sets} 
                      onChange={(e) => updateExercise(index, 'sets', e.target.value)}
                      className="form-input"
                      placeholder="3"
                      required
                    />
                  </div>
                  
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Reps</label>
                    <input 
                      type="number" 
                      value={exercise.reps} 
                      onChange={(e) => updateExercise(index, 'reps', e.target.value)}
                      className="form-input"
                      placeholder="10"
                      required
                    />
                  </div>
                  
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Weight (kg)</label>
                    <input 
                      type="number" 
                      value={exercise.weight} 
                      onChange={(e) => updateExercise(index, 'weight', e.target.value)}
                      className="form-input"
                      placeholder="50"
                      required
                    />
                  </div>
                  
                  <button 
                    type="button" 
                    onClick={() => removeExercise(index)}
                    className="btn"
                    style={{ 
                      background: '#ff6b6b',
                      minHeight: '44px',
                      padding: '8px'
                    }}
                    disabled={workout.exercises.length <= 1}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Notes</label>
          <textarea 
            value={workout.notes} 
            onChange={(e) => setWorkout(prev => ({ ...prev, notes: e.target.value }))}
            className="form-input"
            style={{ minHeight: '100px', resize: 'vertical' }}
            placeholder="How did you feel? Any PRs?"
          />
        </div>

        {workout.exercises.length > 0 && (
          <div className="card" style={{ 
            background: 'linear-gradient(45deg, #e8f5e8, #d4edda)',
            textAlign: 'center',
            marginBottom: '24px'
          }}>
            <strong style={{ fontSize: '1.1em' }}>Estimated Total Weight: {calculateTotalWeight()}kg</strong>
          </div>
        )}

        <button type="submit" className="btn" style={{ width: '100%', fontSize: '18px', minHeight: '52px' }}>
          🎯 Complete Workout
        </button>
      </form>
    </div>
  )
}

export default WorkoutTracker