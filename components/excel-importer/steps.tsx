import React from 'react'

interface StepsProps {
  currentStep: number
  totalSteps: number
}

export function Steps({ currentStep, totalSteps }: StepsProps) {
  return (
    <div className="flex items-center space-x-4 mb-8">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <React.Fragment key={step}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-gray-200 text-gray-600'
            }`}
          >
            {step}
          </div>
          {step < totalSteps && (
            <div
              className={`flex-1 h-1 ${
                step < currentStep ? 'bg-primary' : 'bg-gray-200'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

