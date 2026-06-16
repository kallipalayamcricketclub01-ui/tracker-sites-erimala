'use client'

import { useEffect, useRef } from 'react'

interface StatCardProps {
  label: string
  value: number | string
  unit?: string
  icon?: string
  gradient?: string
  animationDelay?: number
}

export function StatCard({ label, value, unit = '', icon, gradient = 'from-primary to-accent', animationDelay = 0 }: StatCardProps) {
  const valueRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof value === 'number' && valueRef.current) {
      const numericValue = value
      const duration = 1000
      const startTime = Date.now()

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const currentValue = Math.round(numericValue * progress)

        if (valueRef.current) {
          valueRef.current.textContent = currentValue.toString()
        }

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      animate()
    }
  }, [value])

  return (
    <div
      className="p-6 rounded-2xl border border-white/10 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 group backdrop-blur-xl bg-white/5"
      style={{
        animation: `fadeInUp 0.6s ease-out ${animationDelay}s both`,
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground font-medium">{label}</p>
        </div>
        {icon && <div className="text-2xl">{icon}</div>}
      </div>

      <div className="flex items-baseline gap-2">
        <div ref={valueRef} className={`text-4xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
          {typeof value === 'string' ? value : value}
        </div>
        {unit && <span className="text-lg text-muted-foreground font-semibold">{unit}</span>}
      </div>

      <div className={`mt-4 h-1 bg-gradient-to-r ${gradient} rounded-full opacity-30 group-hover:opacity-60 transition-opacity`}></div>
    </div>
  )
}
