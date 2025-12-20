// Design System Tokens
// Central source of truth for all design values

export const colors = {
    // Brand colors
    brand: {
        primary: '#f97316',      // Orange-500
        primaryDark: '#ea580c',  // Orange-600
        primaryLight: '#fb923c', // Orange-400
        accent: '#fbbf24',       // Amber-400
    },

    // Semantic colors
    background: {
        primary: '#020617',      // Slate-950
        secondary: '#0f172a',    // Slate-900
        tertiary: '#1e293b',     // Slate-800
        elevated: 'rgba(15, 23, 42, 0.96)',
    },

    text: {
        primary: '#f8fafc',      // Slate-50
        secondary: '#cbd5e1',    // Slate-300
        tertiary: '#94a3b8',     // Slate-400
        muted: '#64748b',        // Slate-500
    },

    border: {
        default: '#334155',      // Slate-700
        subtle: '#1e293b',       // Slate-800
        emphasis: '#475569',     // Slate-600
    },

    // Status colors
    status: {
        success: '#10b981',      // Green-500
        warning: '#f59e0b',      // Amber-500
        error: '#ef4444',        // Red-500
        info: '#3b82f6',         // Blue-500
    },

    // Interactive states
    interactive: {
        hover: 'rgba(249, 115, 22, 0.1)',
        active: 'rgba(249, 115, 22, 0.2)',
        focus: 'rgba(249, 115, 22, 0.3)',
    },
} as const;

export const spacing = {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
    '3xl': '4rem',    // 64px
    '4xl': '6rem',    // 96px
} as const;

export const borderRadius = {
    sm: '0.375rem',   // 6px
    md: '0.5rem',     // 8px
    lg: '0.75rem',    // 12px
    xl: '1rem',       // 16px
    '2xl': '1.5rem',  // 24px
    full: '9999px',
} as const;

export const typography = {
    fontFamily: {
        sans: 'var(--font-inter), system-ui, -apple-system, sans-serif',
        display: 'var(--font-playfair), Georgia, serif',
    },

    fontSize: {
        xs: '0.75rem',      // 12px
        sm: '0.875rem',     // 14px
        base: '1rem',       // 16px
        lg: '1.125rem',     // 18px
        xl: '1.25rem',      // 20px
        '2xl': '1.5rem',    // 24px
        '3xl': '1.875rem',  // 30px
        '4xl': '2.25rem',   // 36px
        '5xl': '3rem',      // 48px
        '6xl': '3.75rem',   // 60px
    },

    fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        black: '900',
    },

    lineHeight: {
        tight: '1.25',
        normal: '1.5',
        relaxed: '1.75',
    },
} as const;

export const shadows = {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    glow: '0 0 20px rgba(249, 115, 22, 0.3)',
    glowLg: '0 0 40px rgba(249, 115, 22, 0.4)',
} as const;

export const transitions = {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: '500ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;

export const breakpoints = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
} as const;

export const zIndex = {
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
    toast: 1080,
} as const;
