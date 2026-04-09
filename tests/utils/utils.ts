import * as testData from '../data/testData.json';

export function sortByKey<T, K extends keyof T>(dataArray: T[], key: K, order: 'asc' | 'desc' =  'asc'): T[] {
    return dataArray.sort((a, b) => {
        const valA = a[key];
        const valB = b[key];

        // Handle different data types
        if (typeof valA === 'string' && typeof valB === 'string') {
            // Use localeCompare for reliable string sorting
            return order === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }

        // Default comparison for numbers, boolean or dates
        if (valA < valB) return order == 'asc' ? -1 : 1;
        if (valA > valB) return order == 'asc' ? 1 : -1;
        return 0;
    });
}