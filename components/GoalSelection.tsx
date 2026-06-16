'use client'

import { Goal } from '@/lib/calculations'
import { Button } from '@/components/ui/button'

interface GoalSelectionProps {
  onSelect: (goal: Goal) => void
  selectedGoal?: Goal

  weight: number
  height: number
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

function getRecommendedGoal(
  weight: number,
  height: number,
  
): Goal {
  const bmi =
    weight / ((height / 100) ** 2)

  if (bmi < 18.5) return 'weight_gain'
  if (bmi > 25) return 'weight_loss'

  return 'maintenance'
}

export function GoalSelection({ onSelect, selectedGoal,  weight,
  height, }: GoalSelectionProps) {
    console.log({
  weight,
  height,
  bmi: weight / ((height / 100) ** 2)
})
    const recommendedGoal =
  getRecommendedGoal(weight, height)
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8 rounded-2xl border border-primary/20 bg-primary/5 backdrop-blur-xl p-6 text-center">
  <p className="text-sm text-muted-foreground mb-2">
    Recommended Goal
  </p>

  <h2 className="text-3xl font-bold text-primary">
    {recommendedGoal === 'weight_loss' && 'Weight Loss'}
    {recommendedGoal === 'maintenance' && 'Maintenance'}
    {recommendedGoal === 'weight_gain' && 'Weight Gain'}
  </h2>
</div>
<div className="mb-8 text-center">
  <p className="text-sm text-muted-foreground">
    Based on your health profile
  </p>

  <h2 className="text-3xl font-bold text-primary mt-2">
    Recommended: {
      recommendedGoal === 'weight_loss'
        ? 'Weight Loss'
        : recommendedGoal === 'weight_gain'
        ? 'Weight Gain'
        : 'Maintenance'
    }
  </h2>
</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {GOALS.map((goal) => (
          <button
            key={goal.value}
            onClick={() => onSelect(goal.value)}
className={`relative p-8 rounded-2xl border-2 transition-all duration-300 text-left group backdrop-blur-xl bg-white/5 ${              selectedGoal === goal.value
                ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                : 'border-white/10 hover:border-primary/50'
            }`}
          >
            {recommendedGoal === goal.value && (
  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
    Recommended
  </div>
)}
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
