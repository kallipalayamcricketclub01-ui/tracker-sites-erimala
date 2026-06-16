# Health & Nutrition Calculator

A modern, production-ready web application for calculating personalized daily nutrition requirements and macronutrient recommendations based on user health goals.

## Overview

This application provides a complete health and nutrition calculation system featuring:
- **Personal Information Form**: Collects age, sex, weight, height, and activity level with form validation
- **Goal Selection**: Choose between weight loss, maintenance, or weight gain goals
- **Automatic Calculations**: Real-time computation of daily calories, macronutrients, BMI, and personalized recommendations
- **Interactive Dashboard**: Animated stat cards with count-up animations and detailed metrics display
- **Data Visualizations**: Macronutrient distribution charts and daily nutrition breakdowns using Recharts
- **Recommendations**: Dynamic, goal-specific recommendations for achieving health objectives
- **Export & Print**: Save results as PDF or CSV, print reports for offline reference
- **Data Persistence**: Automatic localStorage support to save the latest calculation

## Technology Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with custom glassmorphism utilities
- **UI Components**: shadcn/ui with custom styling
- **Charting**: Recharts for data visualization
- **Export**: jsPDF, html2canvas, and html2pdf-pro for document generation

## App Flow

### Step 1: Personal Information
Users provide their biometric data:
- Age (18-120 years)
- Sex (Male/Female)
- Weight (kg)
- Height (cm)
- Activity Level (Sedentary to Athlete)

All inputs include validation with error messages.

### Step 2: Goal Selection
Select from three comprehensive health goals:
- **Weight Loss**: Create a 500 calorie deficit for fat loss while maintaining muscle
- **Maintenance**: Keep body weight stable with balanced nutrition
- **Weight Gain**: Build muscle mass with a 500 calorie surplus

### Step 3: Results Dashboard
Displays personalized metrics including:
- Daily caloric needs
- Protein, carbohydrate, fat, and fiber targets
- BMI and health classification
- Visual charts showing macro distribution
- Tailored recommendations based on selected goal

## Calculation Methods

All calculations are implemented in TypeScript without external dependencies:

### Maintenance Calories
```
maintenanceCalories = (weight × 24) × activityMultiplier
```

Activity Multipliers:
- Sedentary: 1.2
- Lightly Active: 1.375
- Moderately Active: 1.55
- Very Active: 1.725
- Athlete: 1.9

### Goal Calories
- Weight Loss: maintenanceCalories - 500
- Maintenance: maintenanceCalories
- Weight Gain: maintenanceCalories + 500

### Macronutrients
- **Protein**: weight × 1.8 (g)
- **Fat**: weight × 0.7 (g)
- **Fiber**: (weight / 100) × 14 (g)
- **Carbs**: (goalCalories - proteinCalories - fatCalories) / 4 (g)

### BMI & Classification
```
BMI = weight / (height/100)²
```

Categories:
- Underweight: < 18.5
- Normal: 18.5 - 24.9
- Overweight: 25 - 29.9
- Obese: ≥ 30

## Design Features

### Glassmorphism
- Frosted glass effect with backdrop blur
- Semi-transparent backgrounds with refined borders
- Modern, premium appearance inspired by Apple Health and MyFitnessPal

### Dark Mode
- Deep charcoal background (oklch(0.08 0 0))
- Vibrant blue primary color (oklch(0.65 0.25 264))
- Warm orange accent (oklch(0.68 0.28 45))
- Optimized contrast for readability

### Animations
- Fade-in-up animations for page transitions
- Count-up animations for numerical metrics
- Smooth hover effects and transitions
- Slide-in animations for recommendations

### Responsive Design
- Mobile-first approach
- Adaptive grid layouts
- Touch-friendly form inputs
- Responsive typography and spacing

## Project Structure

```
app/
├── page.tsx              # Main application logic and state
├── layout.tsx            # Root layout with metadata
└── globals.css           # Global styles and animations

components/
├── PersonalInfoForm.tsx  # Multi-field form with validation
├── GoalSelection.tsx     # Goal selection cards
├── StatCard.tsx          # Animated metric display card
├── MacroCharts.tsx       # Recharts visualizations
├── Recommendations.tsx   # Goal-specific recommendations

lib/
├── calculations.ts       # All calculation logic
└── export.ts            # PDF/CSV export and localStorage
```

## Features

### Form Validation
- Age range: 18-120 years
- Weight range: 30-300 kg
- Height range: 100-250 cm
- Real-time error messages

### Data Persistence
- Automatically saves latest calculation to localStorage
- Loads previous data on page refresh
- One-click reset to clear all data

### Export Options
- **PDF Export**: Download visual report with all metrics and charts
- **Print**: Direct print-to-paper for offline records
- **CSV Export**: Structured data export for spreadsheet applications

### Responsive Charts
- **Macro Distribution**: Pie chart showing protein, carb, and fat percentages
- **Daily Breakdown**: Bar chart displaying gram amounts of each macronutrient
- Interactive tooltips and legends

## Performance Optimizations

- Server-side calculation processing
- Efficient animation using CSS keyframes
- Optimized Recharts components with responsive sizing
- Minimal re-renders through React hooks
- Lazy-loaded chart components

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Modern mobile browsers

## Getting Started

### Installation

```bash
# Clone the repository
git clone <repo-url>

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open http://localhost:3000
```

### Production Build

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## Environment Setup

No external API keys or environment variables are required. The application runs entirely on the frontend with all calculations performed client-side.

## Code Quality

- TypeScript strict mode enabled
- ESLint configured for Next.js
- Components follow React best practices
- Semantic HTML and ARIA labels for accessibility
- CSS organized with Tailwind design tokens

## Future Enhancements

- User authentication for cloud-based saved plans
- Meal planning integration
- Exercise logging and tracking
- Progress visualization over time
- Push notifications for daily reminders
- API integration with fitness trackers
- Multi-language support

## Troubleshooting

### Data not persisting
- Check if localStorage is enabled in browser settings
- Clear browser cache and reload

### Charts not rendering
- Ensure window size is adequate (mobile-responsive)
- Check browser console for errors

### Calculations seem incorrect
- Verify all input fields are within valid ranges
- Ensure activity level is correctly selected

## License

MIT License - Feel free to use and modify

## Support

For issues, questions, or suggestions, please create an issue or contact support.

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Author**: Health Calculator Team
