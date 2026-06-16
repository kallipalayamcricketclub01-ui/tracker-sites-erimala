'use client'

import { useState, useEffect } from 'react'
import { PersonalInfoForm } from '@/components/PersonalInfoForm'
import { GoalSelection } from '@/components/GoalSelection'
import { StatCard } from '@/components/StatCard'
import { MacroCharts } from '@/components/MacroCharts'
import { Recommendations } from '@/components/Recommendations'
import { Button } from '@/components/ui/button'
import { UserData, Goal, CalculationResults, calculateAll, getBMICategoryLabel } from '@/lib/calculations'
import { exportToPDF, printResults, saveToLocalStorage, loadFromLocalStorage, generateCSV, downloadCSV } from '@/lib/export'

type Step = 'personal_info' | 'goal_selection' | 'results'

export default function Home() {
  const [step, setStep] = useState<Step>('personal_info')
  const [userData, setUserData] = useState<UserData | null>(null)
  const [goal, setGoal] = useState<Goal | undefined>()
  const [results, setResults] = useState<CalculationResults | null>(null)
  const [isExporting, setIsExporting] = useState(false)

  // Load saved data on mount
  useEffect(() => {
    const savedData = loadFromLocalStorage()

    if (
      savedData &&
      savedData.results?.bmr !== undefined &&
      savedData.results?.waterIntake !== undefined
    ) {
      setUserData(savedData.userData)
      setGoal(savedData.goal)
      setResults(savedData.results)
      setStep('results')
    }
  }, [])

  const handlePersonalInfoSubmit = (data: UserData) => {
    setUserData(data)
    setStep('goal_selection')
  }

  const handleGoalSelect = (selectedGoal: Goal) => {
    setGoal(selectedGoal)
  }

  const handleCalculate = () => {
    if (userData && goal) {
      const calculatedResults = calculateAll(userData, goal)
      setResults(calculatedResults)
      saveToLocalStorage(userData, goal, calculatedResults)
      setStep('results')
    }
  }

  const handleRecalculate = () => {
    setStep('personal_info')
    setUserData(null)
    setGoal(undefined)
    setResults(null)
  }

  const handleReset = () => {
    setStep('personal_info')
    setUserData(null)
    setGoal(undefined)
    setResults(null)
    localStorage.removeItem('health-calculator-latest')
  }

  const handleExportPDF = async () => {
    try {
      setIsExporting(true)
      await exportToPDF(userData!, goal!, results!, 'results-dashboard')
    } catch (error) {
      console.error('Export failed:', error)
      alert('Failed to export PDF. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  const handlePrint = () => {
    try {
      printResults('results-dashboard')
    } catch (error) {
      console.error('Print failed:', error)
      alert('Failed to print. Please try again.')
    }
  }

  const handleDownloadCSV = () => {
    const csv = generateCSV(userData!, goal!, results!)
    downloadCSV(csv)
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5"></div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-16">
        {/* Header */}
        <div className="mb-12 md:mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 gradient-text">Health & Nutrition Calculator</h1>
          <p className="text-muted-foreground text-lg">Get personalized daily nutrition recommendations based on your goals</p>
        </div>

        {/* Step Indicator */}
        {step !== 'results' && (
          <div className="flex justify-center gap-2 mb-12">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all backdrop-blur-xl bg-white/5 border ${step === 'personal_info' ? 'border-primary bg-primary/20' : 'border-white/10'}`}>
              1
            </div>
            <div className="w-8 h-0.5 bg-white/10 mt-5"></div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all backdrop-blur-xl bg-white/5 border ${step === 'goal_selection' ? 'border-primary bg-primary/20' : 'border-white/10'}`}>
              2
            </div>
            <div className="w-8 h-0.5 bg-white/10 mt-5"></div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold backdrop-blur-xl bg-white/5 border border-white/10 opacity-50">
              3
            </div>
          </div>
        )}

        {/* Content */}
        <div className="animate-fadeInUp">
          {step === 'personal_info' && <PersonalInfoForm onSubmit={handlePersonalInfoSubmit} initialData={userData || undefined} />}

          {step === 'goal_selection' && (
            <div>
{userData && (
  <GoalSelection
    onSelect={handleGoalSelect}
    selectedGoal={goal}
    weight={userData.weight}
    height={userData.height}
  />
)}
              {goal && (
                <div className="mt-8 flex justify-center">
                  <Button
                    onClick={handleCalculate}
                    className="px-8 py-3 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold rounded-lg transition-all"
                  >
                    Calculate Results
                  </Button>
                </div>
              )}
            </div>
          )}

          {step === 'results' && results && (
              <div id="results-dashboard" className="space-y-8">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

  {/* Nutrition */}
  <StatCard
    label="Daily Calories"
    value={results.goalCalories}
    unit="kcal"
    icon="🔥"
    gradient="from-orange-500 to-red-400"
    animationDelay={0}
  />

  <StatCard
    label="Protein"
    value={results.protein}
    unit="g"
    icon="💪"
    gradient="from-yellow-500 to-orange-400"
    animationDelay={0.1}
  />

  <StatCard
    label="Carbohydrates"
    value={results.carbs}
    unit="g"
    icon="🌾"
    gradient="from-green-500 to-emerald-400"
    animationDelay={0.2}
  />

  <StatCard
    label="Fat"
    value={results.fat}
    unit="g"
    icon="🥑"
    gradient="from-blue-500 to-cyan-400"
    animationDelay={0.3}
  />

  <StatCard
    label="Fiber"
    value={results.fiber}
    unit="g"
    icon="🥗"
    gradient="from-purple-500 to-pink-400"
    animationDelay={0.4}
  />

  <StatCard
    label="Water Intake"
    value={results.waterIntake}
    unit="L"
    icon="💧"
    gradient="from-cyan-500 to-blue-400"
    animationDelay={0.5}
  />

  {/* Metabolism */}
  <StatCard
    label="BMR"
    value={results.bmr}
    unit="kcal"
    icon="🫀"
    gradient="from-red-500 to-pink-400"
    animationDelay={0.6}
  />

  <StatCard
    label="TDEE"
    value={results.tdee}
    unit="kcal"
    icon="🏃"
    gradient="from-orange-500 to-yellow-400"
    animationDelay={0.7}
  />

  <StatCard
    label="BMI"
    value={results.bmi}
    unit="kg/m²"
    icon="⚖️"
    gradient={
      results.bmiCategory === 'normal'
        ? 'from-green-500 to-emerald-400'
        : results.bmiCategory === 'underweight'
        ? 'from-blue-500 to-cyan-400'
        : results.bmiCategory === 'overweight'
        ? 'from-yellow-500 to-orange-400'
        : 'from-red-500 to-rose-400'
    }
    animationDelay={0.8}
  />

  {/* Goals */}
  <StatCard
    label="Ideal Weight"
    value={results.idealWeight}
    unit="kg"
    icon="🎯"
    gradient="from-green-500 to-emerald-400"
    animationDelay={0.9}
  />

  <StatCard
    label="Weight Difference"
    value={results.weightDifference}
    unit="kg"
    icon="📉"
    gradient="from-purple-500 to-pink-400"
    animationDelay={1.0}
  />

  <StatCard
    label="Daily Step Goal"
    value={results.stepGoal}
    icon="👣"
    gradient="from-indigo-500 to-blue-400"
    animationDelay={1.1}
  />

</div>
              {/* BMI Info Card */}
              <div className="p-6 rounded-2xl border border-white/10 backdrop-blur-xl bg-white/5 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
                <h3 className="text-lg font-semibold text-foreground mb-2">BMI Classification</h3>
                <p className="text-xl font-bold text-foreground mb-1">
                  {getBMICategoryLabel(results.bmiCategory)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {results.bmiCategory === 'underweight' && 'Your BMI is below the normal range. Consider consulting with a healthcare provider.'}
                  {results.bmiCategory === 'normal' && 'Your BMI is in the healthy range. Keep maintaining your current lifestyle!'}
                  {results.bmiCategory === 'overweight' && 'Your BMI is above the normal range. Focus on nutrition and exercise.'}
                  {results.bmiCategory === 'obese' && 'Your BMI is significantly above normal. Consider consulting with a healthcare provider.'}
                </p>
              </div>
              <div className="p-6 rounded-2xl border border-white/10 backdrop-blur-xl bg-white/5">
  <h3 className="text-lg font-semibold mb-4">
    Recommended Exercise Plan
  </h3>

  <div className="space-y-2">
    {results.exerciseRecommendation?.map((item, index) => (
      <div
        key={index}
        className="flex items-center gap-3"
      >
        <span className="text-green-400">✓</span>
        <span>{item}</span>
      </div>
    ))}
  </div>
</div>

              {/* Charts */}
              <MacroCharts protein={results.protein} carbs={results.carbs} fat={results.fat} goalCalories={results.goalCalories} />

              {/* Recommendations */}
              <Recommendations goal={goal!} />

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-center pt-4">
                <Button onClick={handleRecalculate} variant="outline" className="backdrop-blur-xl bg-white/5 border-white/20 hover:border-primary/50">
                  Recalculate
                </Button>
                <Button onClick={handleExportPDF} disabled={isExporting} className="backdrop-blur-xl bg-white/5 border-white/20 hover:bg-primary/20">
                  {isExporting ? 'Exporting...' : 'Export PDF'}
                </Button>
                <Button onClick={handlePrint} className="backdrop-blur-xl bg-white/5 border-white/20 hover:bg-primary/20">
                  Print Report
                </Button>
                <Button onClick={handleDownloadCSV} className="backdrop-blur-xl bg-white/5 border-white/20 hover:bg-primary/20">
                  Download CSV
                </Button>
                <Button onClick={handleReset} variant="destructive" className="backdrop-blur-xl bg-white/5 border-destructive/20 hover:border-destructive/50">
                  Reset All
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
    
  )
}
