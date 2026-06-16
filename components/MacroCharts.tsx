'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'

interface MacroChartsProps {
  protein: number
  carbs: number
  fat: number
  goalCalories: number
}

export function MacroCharts({ protein, carbs, fat, goalCalories }: MacroChartsProps) {
  const macroData = [
    { name: 'Protein', value: Math.round((protein * 4) / goalCalories * 100), calories: protein * 4 },
    { name: 'Carbs', value: Math.round((carbs * 4) / goalCalories * 100), calories: carbs * 4 },
    { name: 'Fat', value: Math.round((fat * 9) / goalCalories * 100), calories: fat * 9 },
  ]

  const nutritionData = [
    { name: 'Protein', value: protein, unit: 'g' },
    { name: 'Carbs', value: carbs, unit: 'g' },
    { name: 'Fat', value: fat, unit: 'g' },
  ]

  const colors = ['#fbbf24', '#60a5fa', '#f87171']

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Macronutrient Distribution Pie Chart */}
      <div className="p-6 rounded-2xl border border-white/10 backdrop-blur-xl bg-white/5">
        <h3 className="text-lg font-semibold text-foreground mb-4">Macro Distribution (%)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={macroData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name} ${value}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {colors.map((color, index) => (
                <Cell key={`cell-${index}`} fill={color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(20, 20, 30, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
              }}
              formatter={(value: any) => `${value}%`}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Daily Nutrition Breakdown Bar Chart */}
      <div className="p-6 rounded-2xl border border-white/10 backdrop-blur-xl bg-white/5">
        <h3 className="text-lg font-semibold text-foreground mb-4">Daily Nutrition (grams)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={nutritionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
            <XAxis dataKey="name" stroke="rgba(255, 255, 255, 0.3)" />
            <YAxis stroke="rgba(255, 255, 255, 0.3)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(20, 20, 30, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
              }}
              formatter={(value: any) => [`${value}g`, 'Amount']}
            />
            <Bar dataKey="value" fill="#60a5fa" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
