'use client'

import { Goal } from '@/lib/calculations'
import { Button } from '@/components/ui/button'

interface GoalSelectionProps {
  onSelect: (goal: Goal) => void
  selectedGoal?: Goal
}

const GOALS: { value: Goal; title: string; description: string; icon: string; color: string }[] = [
  {
    value: 'weight_loss',
    title: 'Weight Loss',
    description: 'Reduce body fat while maintaining muscle. Create a calorie deficit through diet and exercise.',
    icon: '↓',
    color: 'from-blue-500 to-cyan-400',
  },
  {
    value: 'maintenance',
    title: 'Maintenance',
    description: 'Maintain your current body weight. Balance calorie intake with your activity level.',
    icon: '⚖️',
    color: 'from-emerald-500 to-green-400',
  },
  {
    value: 'weight_gain',
    title: 'Weight Gain',
    description: 'Increase muscle mass and body weight. Create a calorie surplus with strength training.',
    icon: '↑',
    color: 'from-orange-500 to-red-400',
  },
]

export function GoalSelection({ onSelect, selectedGoal }: GoalSelectionProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {GOALS.map((goal) => (
          <button
            key={goal.value}
            onClick={() => onSelect(goal.value)}
            className={`p-8 rounded-2xl border-2 transition-all duration-300 text-left group backdrop-blur-xl bg-white/5 ${
              selectedGoal === goal.value
                ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                : 'border-white/10 hover:border-primary/50'
            }`}
          >
            <div className={`text-5xl mb-4 font-bold bg-gradient-to-r ${goal.color} bg-clip-text text-transparent`}>
              {goal.icon}
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">{goal.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{goal.description}</p>

            {selectedGoal === goal.value && (
              <div className="mt-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-xs font-semibold text-primary">Selected</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {selectedGoal && (
        <div className="mt-8 flex justify-center">
          <Button className="px-8 py-3 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold rounded-lg transition-all">
            Calculate Results
          </Button>
        </div>
      )}
    </div>
  )
}
