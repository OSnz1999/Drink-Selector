'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`flex items-center justify-center ${className}`}
        >
            <Loader2 className={`${sizeClasses[size]} animate-spin text-orange-500`} />
        </motion.div>
    );
}

interface SkeletonProps {
    className?: string;
    variant?: 'text' | 'circular' | 'rectangular';
}

export function Skeleton({ className = '', variant = 'rectangular' }: SkeletonProps) {
    const variantClasses = {
        text: 'h-4 w-full rounded',
        circular: 'rounded-full',
        rectangular: 'rounded-lg',
    };

    return (
        <div
            className={`animate-pulse bg-slate-800/50 ${variantClasses[variant]} ${className}`}
        />
    );
}

export function CardSkeleton() {
    return (
        <div className="card p-4 space-y-3">
            <div className="flex items-center gap-3">
                <Skeleton variant="circular" className="w-12 h-12" />
                <div className="flex-1 space-y-2">
                    <Skeleton variant="text" className="w-3/4" />
                    <Skeleton variant="text" className="w-1/2" />
                </div>
            </div>
        </div>
    );
}
