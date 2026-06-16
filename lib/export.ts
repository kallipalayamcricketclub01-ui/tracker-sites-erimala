import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { CalculationResults, Goal, UserData, getBMICategoryLabel } from '@/lib/calculations'

export async function exportToPDF(
  userData: UserData,
  goal: Goal,
  results: CalculationResults,
  elementId: string
) {
  try {
    const element = document.getElementById(elementId)
    if (!element) throw new Error('Element not found')

    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#0a0a0a',
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')

    const imgWidth = 210
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)

    // Add metadata
    pdf.setProperties({
      title: 'Health & Nutrition Calculator Results',
      author: 'Health Calculator',
      subject: 'Personalized Nutrition Plan',
    })

    pdf.save(`nutrition-plan-${new Date().toISOString().split('T')[0]}.pdf`)
  } catch (error) {
    console.error('PDF export failed:', error)
    throw error
  }
}

export function printResults(elementId: string) {
  try {
    const element = document.getElementById(elementId)
    if (!element) throw new Error('Element not found')

    const printWindow = window.open('', '_blank')
    if (!printWindow) throw new Error('Print window could not be opened')

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Health & Nutrition Calculator - Results</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              background: #0a0a0a;
              color: #fafafa;
              padding: 20px;
            }
            @media print {
              body {
                background: white;
                color: black;
              }
              .no-print {
                display: none;
              }
            }
            .container {
              max-width: 900px;
              margin: 0 auto;
            }
            h1 {
              font-size: 28px;
              margin-bottom: 10px;
              margin-top: 20px;
            }
            .content {
              ${element.innerHTML}
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Health & Nutrition Calculator Results</h1>
            <p>Generated on: ${new Date().toLocaleDateString()}</p>
            <div class="content">
              ${element.innerHTML}
            </div>
          </div>
          <script>
            window.addEventListener('load', () => {
              window.print();
              window.close();
            });
          </script>
        </body>
      </html>
    `)
    printWindow.document.close()
  } catch (error) {
    console.error('Print failed:', error)
    throw error
  }
}

export function saveToLocalStorage(
  userData: UserData,
  goal: Goal,
  results: CalculationResults
) {
  const data = {
    userData,
    goal,
    results,
    timestamp: new Date().toISOString(),
  }
  localStorage.setItem('health-calculator-latest', JSON.stringify(data))
}

export function loadFromLocalStorage() {
  try {
    const data = localStorage.getItem('health-calculator-latest')
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}

export function generateCSV(
  userData: UserData,
  goal: Goal,
  results: CalculationResults
): string {
  const goalLabel = {
    weight_loss: 'Weight Loss',
    maintenance: 'Maintenance',
    weight_gain: 'Weight Gain',
  }

  const csv = `Health & Nutrition Calculator Results
Generated: ${new Date().toLocaleString()}

PERSONAL INFORMATION
Age,${userData.age}
Sex,${userData.sex}
Weight (kg),${userData.weight}
Height (cm),${userData.height}
Activity Level,${userData.activityLevel}
Goal,${goalLabel[goal]}

DAILY NUTRITION
Daily Calories,${results.goalCalories}
Protein (g),${results.protein}
Carbohydrates (g),${results.carbs}
Fat (g),${results.fat}
Fiber (g),${results.fiber}

HEALTH METRICS
BMI,${results.bmi}
BMI Category,${getBMICategoryLabel(results.bmiCategory)}
`

  return csv
}

export function downloadCSV(csv: string) {
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `nutrition-data-${new Date().toISOString().split('T')[0]}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}
