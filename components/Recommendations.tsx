'use client'

import { Goal } from '@/lib/calculations'

interface RecommendationsProps {
  goal: Goal
}

export function Recommendations({ goal }: RecommendationsProps) {
  const recommendations: Record<Goal, { title: string; items: string[] }> = {
    weight_loss: {
      title: 'Weight Loss Recommendations',
      items: [
        'Maintain a calorie deficit of 500 calories per day for steady fat loss',
        'Prioritize protein intake (1.8g per kg) to preserve muscle mass',
        'Incorporate cardio and strength training 4-5 times per week',
        'Track your food intake consistently to stay accountable',
        'Stay hydrated with 8-10 glasses of water daily',
        'Get 7-9 hours of quality sleep for optimal recovery',
        'Be patient and consistent - sustainable weight loss is 0.5-1kg per week',
      ],
    },
    maintenance: {
      title: 'Maintenance Recommendations',
      items: [
        'Eat at your calculated maintenance calories for energy balance',
        'Consume 1.8g of protein per kg of body weight daily',
        'Maintain consistent exercise habits to sustain fitness level',
        'Include regular strength training and cardio in your routine',
        'Monitor your weight weekly to ensure stability',
        'Eat a variety of nutrient-dense whole foods',
        'Allow flexibility in your diet for sustainable long-term adherence',
      ],
    },
    weight_gain: {
      title: 'Weight Gain Recommendations',
      items: [
        'Create a calorie surplus of 500 calories daily for muscle growth',
        'Consume 1.8g of protein per kg of body weight to support muscle building',
        'Focus on progressive strength training 5-6 times per week',
        'Eat calorie-dense foods like nuts, oils, and whole grains',
        'Schedule adequate rest days for muscle recovery and growth',
        'Track your strength progress to ensure effective workouts',
        'Aim for 1-2 kg of weight gain per month for optimal muscle development',
      ],
    },
  }

  const data = recommendations[goal]

  return (
    <div className="p-8 rounded-2xl border border-white/10 backdrop-blur-xl bg-white/5">
      <h2 className="text-2xl font-bold text-foreground mb-6 gradient-text">{data.title}</h2>

      <div className="space-y-4">
        {data.items.map((item, index) => (
          <div
            key={index}
            className="flex gap-4 p-4 rounded-lg bg-white/5 border border-white/5 hover:border-primary/30 transition-all"
            style={{
              animation: `slideInLeft 0.6s ease-out ${index * 0.1}s both`,
            }}
          >
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center font-bold text-sm text-primary-foreground">
              {index + 1}
            </div>
            <p className="text-foreground leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
