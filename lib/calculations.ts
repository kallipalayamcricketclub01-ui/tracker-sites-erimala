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
  bmr: number
  tdee: number
  waterIntake: number
  idealWeight: number
  weightDifference: number
  stepGoal: string
  exerciseRecommendation: string[]
}

export function calculateBMR(
  weight: number,
  height: number,
  age: number,
  sex: 'male' | 'female'
): number {
  if (sex === 'male') {
    return Math.round(
      10 * weight +
      6.25 * height -
      5 * age +
      5
    )
  }

  return Math.round(
    10 * weight +
    6.25 * height -
    5 * age -
    161
  )
}

export function calculateWaterIntake(
  weight: number
): number {
  return Math.round((weight * 35) / 100) / 10
}

export function calculateIdealWeight(
  height: number
): number {
  const heightMeters = height / 100

  return Math.round(
    22 * heightMeters * heightMeters
  )
}

export function calculateWeightDifference(
  currentWeight: number,
  idealWeight: number
): number {
  return Math.round(
    Math.abs(currentWeight - idealWeight)
  )
}

export function getStepGoal(
  goal: Goal
): string {
  switch (goal) {
    case 'weight_loss':
      return '10,000 - 12,000'

    case 'maintenance':
      return '8,000 - 10,000'

    case 'weight_gain':
      return '6,000 - 8,000'
  }
}

export function getExerciseRecommendation(
  goal: Goal
): string[] {
  switch (goal) {
    case 'weight_loss':
      return [
        '10,000+ daily steps',
        'Strength training 3-4x/week',
        'Cardio 2-3x/week',
      ]

    case 'maintenance':
      return [
        '8,000+ daily steps',
        'Strength training 3x/week',
        'Active lifestyle',
      ]

    case 'weight_gain':
      return [
        'Strength training 4-5x/week',
        'Progressive overload',
        'Limit excessive cardio',
      ]
  }
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
const bmi = calculateBMI(
  userData.weight,
  userData.height
)

const bmiCategory =
  getBMICategory(bmi)
  const bmr = calculateBMR(
  userData.weight,
  userData.height,
  userData.age,
  userData.sex
)

const tdee = maintenanceCalories

const waterIntake =
  calculateWaterIntake(
    userData.weight
  )

const idealWeight =
  calculateIdealWeight(
    userData.height
  )

const weightDifference =
  calculateWeightDifference(
    userData.weight,
    idealWeight
  )

const stepGoal =
  getStepGoal(goal)

const exerciseRecommendation =
  getExerciseRecommendation(goal)

  return {
  maintenanceCalories,
  goalCalories,

  ...macros,

  bmi,
  bmiCategory,

  bmr,
  tdee,

  waterIntake,

  idealWeight,
  weightDifference,

  stepGoal,
  exerciseRecommendation,
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
