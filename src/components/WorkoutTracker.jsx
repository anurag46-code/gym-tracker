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
      <h2>📝 Log Your Workout</h2>
      
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Workout Type:</label>
          <select 
            value={workout.type} 
            onChange={(e) => setWorkout(prev => ({ ...prev, type: e.target.value }))}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
            required
          >
            <option value="">Select workout type</option>
            {workoutTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Duration (minutes):</label>
          <input 
            type="number" 
            value={workout.duration} 
            onChange={(e) => setWorkout(prev => ({ ...prev, duration: e.target.value }))}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
            placeholder="e.g., 60"
            required
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3>Exercises:</h3>
            <button type="button" className="btn" onClick={addExercise} style={{ fontSize: '14px', padding: '8px 16px' }}>
              + Add Exercise
            </button>
          </div>
          
          {workout.exercises.map((exercise, index) => (
            <div key={index} style={{ 
              border: '1px solid #eee', 
              padding: '15px', 
              borderRadius: '8px', 
              marginBottom: '15px',
              background: '#f9f9f9'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr auto', gap: '10px', alignItems: 'end' }}>
                <div>
                  <label style={{ fontSize: '12px', display: 'block', marginBottom: '5px' }}>Exercise</label>
                  <input 
                    type="text" 
                    value={exercise.name} 
                    onChange={(e) => updateExercise(index, 'name', e.target.value)}
                    placeholder="e.g., Bench Press"
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                    required
                  />
                </div>
                
                <div>
                  <label style={{ fontSize: '12px', display: 'block', marginBottom: '5px' }}>Sets</label>
                  <input 
                    type="number" 
                    value={exercise.sets} 
                    onChange={(e) => updateExercise(index, 'sets', e.target.value)}
                    placeholder="3"
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                    required
                  />
                </div>
                
                <div>
                  <label style={{ fontSize: '12px', display: 'block', marginBottom: '5px' }}>Reps</label>
                  <input 
                    type="number" 
                    value={exercise.reps} 
                    onChange={(e) => updateExercise(index, 'reps', e.target.value)}
                    placeholder="10"
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                    required
                  />
                </div>
                
                <div>
                  <label style={{ fontSize: '12px', display: 'block', marginBottom: '5px' }}>Weight (kg)</label>
                  <input 
                    type="number" 
                    value={exercise.weight} 
                    onChange={(e) => updateExercise(index, 'weight', e.target.value)}
                    placeholder="50"
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                    required
                  />
                </div>
                
                <button 
                  type="button" 
                  onClick={() => removeExercise(index)}
                  style={{ 
                    background: '#ff6b6b', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px', 
                    padding: '8px',
                    cursor: 'pointer'
                  }}
                  disabled={workout.exercises.length <= 1}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Notes:</label>
          <textarea 
            value={workout.notes} 
            onChange={(e) => setWorkout(prev => ({ ...prev, notes: e.target.value }))}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', minHeight: '80px' }}
            placeholder="How did you feel? Any PRs?"
          />
        </div>

        {workout.exercises.length > 0 && (
          <div style={{ 
            background: '#e8f5e8', 
            padding: '15px', 
            borderRadius: '8px', 
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            <strong>Estimated Total Weight: {calculateTotalWeight()}kg</strong>
          </div>
        )}

        <button type="submit" className="btn" style={{ width: '100%', fontSize: '18px' }}>
          🎯 Complete Workout
        </button>
      </form>
    </div>
  )
}

export default WorkoutTracker