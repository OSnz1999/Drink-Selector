'use client';

import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from './Input';

interface SearchBarProps {
    placeholder?: string;
    onSearch: (query: string) => void;
    className?: string;
}

export function SearchBar({ placeholder = 'Search...', onSearch, className = '' }: SearchBarProps) {
    const [query, setQuery] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value);
    };

    const handleClear = () => {
        setQuery('');
        onSearch('');
    };

    return (
        <div className={`relative ${className}`}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder={placeholder}
                className="pl-10 pr-10"
            />
            {query && (
                <button
                    onClick={handleClear}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                    <X className="w-4 h-4" />
                </button>
            )}
        </div>
    );
}

// Hook for search functionality
export function useSearch<T>(
    items: T[],
    searchFields: (keyof T)[],
    query: string
): T[] {
    return useMemo(() => {
        if (!query.trim()) return items;

        const lowerQuery = query.toLowerCase();
        return items.filter(item =>
            searchFields.some(field => {
                const value = item[field];
                if (typeof value === 'string') {
                    return value.toLowerCase().includes(lowerQuery);
                }
                return false;
            })
        );
    }, [items, searchFields, query]);
}
