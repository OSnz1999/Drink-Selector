'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
    current: number;
    total: number;
    className?: string;
}

export function ProgressBar({ current, total, className = '' }: ProgressBarProps) {
    const percentage = (current / total) * 100;

    return (
        <div className={`space-y-2 ${className}`}>
            <div className="flex justify-between text-sm text-slate-400">
                <span>Step {current} of {total}</span>
                <span>{Math.round(percentage)}%</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-orange-500 to-amber-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                />
            </div>
        </div>
    );
}

interface StepIndicatorProps {
    steps: string[];
    currentStep: number;
    className?: string;
}

export function StepIndicator({ steps, currentStep, className = '' }: StepIndicatorProps) {
    return (
        <div className={`flex items-center justify-between ${className}`}>
            {steps.map((step, index) => {
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;

                return (
                    <div key={step} className="flex items-center flex-1">
                        <div className="flex flex-col items-center gap-2 flex-1">
                            <motion.div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${isActive
                                        ? 'bg-orange-500 text-white'
                                        : isCompleted
                                            ? 'bg-orange-500/20 text-orange-400'
                                            : 'bg-slate-800 text-slate-500'
                                    }`}
                                initial={false}
                                animate={{
                                    scale: isActive ? 1.1 : 1,
                                }}
                            >
                                {index + 1}
                            </motion.div>
                            <span
                                className={`text-xs ${isActive ? 'text-orange-400 font-medium' : 'text-slate-500'
                                    }`}
                            >
                                {step}
                            </span>
                        </div>
                        {index < steps.length - 1 && (
                            <div className="h-0.5 flex-1 bg-slate-800 mx-2">
                                <motion.div
                                    className="h-full bg-orange-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: isCompleted ? '100%' : '0%' }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
