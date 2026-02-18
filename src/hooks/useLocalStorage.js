import { useState, useEffect } from 'react';

/**
 * useLocalStorage — custom hook for persisting state in browser localStorage.
 * Reads from localStorage on mount, and writes on every state change.
 * Handles corrupted/missing storage gracefully by falling back to initialValue.
 *
 * @param {string} key - The localStorage key
 * @param {*} initialValue - Default value when key doesn't exist or is corrupted
 * @returns {[*, Function]} - [storedValue, setValue]
 */
function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // Handle corrupted JSON or storage errors gracefully
            console.warn(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            // Handle quota exceeded or write errors
            console.warn(`Error writing localStorage key "${key}":`, error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}

export default useLocalStorage;
