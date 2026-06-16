export type ActivityLevel = 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'athlete'
export type Goal = 'weight_loss' | 'maintenance' | 'weight_gain'
export type BMICategory = 'underweight' | 'normal' | 'overweight' | 'obese'

export interface UserData {
  age: number
  sex: 'male' | 'female'
  weight: number // in kg
  height: number // in cm
  activityLevel: ActivityLevel
}

export interface CalculationResults {
  maintenanceCalories: number
  goalCalories: number
  protein: number
  fat: number
  fiber: number
  carbs: number
  bmi: number
  bmiCategory: BMICategory
}

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  lightly_active: 1.375,
  moderately_active: 1.55,
  very_active: 1.725,
  athlete: 1.9,
}

export function calculateMaintenanceCalories(
  weight: number,
  activityLevel: ActivityLevel
): number {
  const baseCalories = weight * 24
  const multiplier = ACTIVITY_MULTIPLIERS[activityLevel]
  return Math.round(baseCalories * multiplier)
}

export function calculateGoalCalories(
  maintenanceCalories: number,
  goal: Goal
): number {
  switch (goal) {
    case 'weight_loss':
      return maintenanceCalories - 500
    case 'maintenance':
      return maintenanceCalories
    case 'weight_gain':
      return maintenanceCalories + 500
    default:
      return maintenanceCalories
  }
}

export function calculateMacros(
  weight: number,
  goalCalories: number
): { protein: number; fat: number; fiber: number; carbs: number } {
  const protein = Math.round(weight * 1.8)
  const fat = Math.round(weight * 0.7)
  const fiber = Math.round((weight / 100) * 14)

  const proteinCalories = protein * 4
  const fatCalories = fat * 9
  const remainingCalories = goalCalories - (proteinCalories + fatCalories)
  const carbs = Math.round(remainingCalories / 4)

  return {
    protein,
    fat,
    fiber,
    carbs: Math.max(carbs, 0),
  }
}

export function calculateBMI(weight: number, height: number): number {
  const heightInMeters = height / 100
  return Math.round((weight / (heightInMeters * heightInMeters)) * 10) / 10
}

export function getBMICategory(bmi: number): BMICategory {
  if (bmi < 18.5) return 'underweight'
  if (bmi < 25) return 'normal'
  if (bmi < 30) return 'overweight'
  return 'obese'
}

export function calculateAll(
  userData: UserData,
  goal: Goal
): CalculationResults {
  const maintenanceCalories = calculateMaintenanceCalories(
    userData.weight,
    userData.activityLevel
  )
  const goalCalories = calculateGoalCalories(maintenanceCalories, goal)
  const macros = calculateMacros(userData.weight, goalCalories)
  const bmi = calculateBMI(userData.weight, userData.height)
  const bmiCategory = getBMICategory(bmi)

  return {
    maintenanceCalories,
    goalCalories,
    ...macros,
    bmi,
    bmiCategory,
  }
}

export function getBMICategoryLabel(category: BMICategory): string {
  const labels: Record<BMICategory, string> = {
    underweight: 'Underweight',
    normal: 'Normal Weight',
    overweight: 'Overweight',
    obese: 'Obese',
  }
  return labels[category]
}

export function getBMICategoryColor(category: BMICategory): string {
  const colors: Record<BMICategory, string> = {
    underweight: 'from-blue-500 to-blue-400',
    normal: 'from-green-500 to-emerald-400',
    overweight: 'from-yellow-500 to-orange-400',
    obese: 'from-red-500 to-rose-400',
  }
  return colors[category]
}
