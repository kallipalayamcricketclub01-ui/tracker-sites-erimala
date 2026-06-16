'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { UserData, ActivityLevel } from '@/lib/calculations'

interface PersonalInfoFormProps {
  onSubmit: (data: UserData) => void
  initialData?: UserData
}

const ACTIVITY_LEVEL_OPTIONS: { value: ActivityLevel; label: string; description: string }[] = [
  { value: 'sedentary', label: 'Sedentary', description: 'Little to no exercise' },
  { value: 'lightly_active', label: 'Lightly Active', description: 'Exercise 1-3 days/week' },
  { value: 'moderately_active', label: 'Moderately Active', description: 'Exercise 4-5 days/week' },
  { value: 'very_active', label: 'Very Active', description: 'Exercise 6-7 days/week' },
  { value: 'athlete', label: 'Athlete', description: 'Intense daily exercise' },
]

export function PersonalInfoForm({ onSubmit, initialData }: PersonalInfoFormProps) {
  const [formData, setFormData] = useState<UserData>(
    initialData || {
      age: 30,
      sex: 'male',
      weight: 75,
      height: 175,
      activityLevel: 'moderately_active',
    }
  )

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (formData.age < 18 || formData.age > 120) {
      newErrors.age = 'Age must be between 18 and 120'
    }
    if (formData.weight < 30 || formData.weight > 300) {
      newErrors.weight = 'Weight must be between 30 and 300 kg'
    }
    if (formData.height < 100 || formData.height > 250) {
      newErrors.height = 'Height must be between 100 and 250 cm'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="space-y-8">
        {/* Age */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-foreground">Age</label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all backdrop-blur-xl"
            min="18"
            max="120"
          />
          {errors.age && <p className="text-destructive text-sm">{errors.age}</p>}
        </div>

        {/* Sex */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-foreground">Sex</label>
          <div className="flex gap-4">
            {['male', 'female'].map((sex) => (
              <label key={sex} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="sex"
                  value={sex}
                  checked={formData.sex === sex}
                  onChange={(e) => setFormData({ ...formData, sex: e.target.value as 'male' | 'female' })}
                  className="w-4 h-4"
                />
                <span className="text-foreground capitalize">{sex}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Weight */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-foreground">Weight (kg)</label>
          <input
            type="number"
            value={formData.weight}
            onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all backdrop-blur-xl"
            min="30"
            max="300"
            step="0.1"
          />
          {errors.weight && <p className="text-destructive text-sm">{errors.weight}</p>}
        </div>

        {/* Height */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-foreground">Height (cm)</label>
          <input
            type="number"
            value={formData.height}
            onChange={(e) => setFormData({ ...formData, height: parseFloat(e.target.value) })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all backdrop-blur-xl"
            min="100"
            max="250"
            step="0.1"
          />
          {errors.height && <p className="text-destructive text-sm">{errors.height}</p>}
        </div>

        {/* Activity Level */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-foreground">Activity Level</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ACTIVITY_LEVEL_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFormData({ ...formData, activityLevel: option.value })}
                className={`p-4 rounded-lg border-2 transition-all text-left backdrop-blur-xl ${
                  formData.activityLevel === option.value
                    ? 'border-primary bg-white/10 bg-opacity-10'
                    : 'border-white/10 bg-white/5 hover:border-primary/50 hover:bg-white/10'
                }`}
              >
                <div className="font-semibold text-foreground">{option.label}</div>
                <div className="text-xs text-muted-foreground">{option.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold rounded-lg transition-all"
        >
          Continue to Goal Selection
        </Button>
      </div>
    </form>
  )
}
