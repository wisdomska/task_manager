import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import useLocalStorage from '../hooks/useLocalStorage';

describe('useLocalStorage', () => {
    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear();
        vi.restoreAllMocks();
    });

    it('returns initial value when localStorage is empty', () => {
        const { result } = renderHook(() => useLocalStorage('testKey', []));
        expect(result.current[0]).toEqual([]);
    });

    it('reads existing value from localStorage', () => {
        const existingData = [{ id: '1', title: 'Saved Task' }];
        localStorage.setItem('testKey', JSON.stringify(existingData));

        const { result } = renderHook(() => useLocalStorage('testKey', []));
        expect(result.current[0]).toEqual(existingData);
    });

    it('writes value to localStorage when state changes', () => {
        const { result } = renderHook(() => useLocalStorage('testKey', []));

        act(() => {
            result.current[1]([{ id: '1', title: 'New Task' }]);
        });

        const stored = JSON.parse(localStorage.getItem('testKey'));
        expect(stored).toEqual([{ id: '1', title: 'New Task' }]);
    });

    it('handles corrupted localStorage data gracefully', () => {
        localStorage.setItem('testKey', 'not-valid-json{{{');

        const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => { });
        const { result } = renderHook(() => useLocalStorage('testKey', 'fallback'));

        expect(result.current[0]).toBe('fallback');
        consoleSpy.mockRestore();
    });

    it('persists data across re-renders', () => {
        const { result, rerender } = renderHook(() => useLocalStorage('testKey', []));

        act(() => {
            result.current[1]([{ id: '1', title: 'Persistent' }]);
        });

        rerender();
        expect(result.current[0]).toEqual([{ id: '1', title: 'Persistent' }]);
    });
});
