/**
 * Helper function to check if a file matches allowed extensions
 * @param {string} filename - The filename to check
 * @param {string[]} allowedExtensions - Array of glob patterns (e.g. ["*.txt", "*.md"])
 * @returns {boolean} - True if file matches any extension or if no extensions specified
 */
export function matchesAllowedExtension(filename, allowedExtensions) {
    // If no file extensions are specified, allow all files
    if (!allowedExtensions || allowedExtensions.length === 0) {
        return true;
    }
    
    // Convert glob patterns to regex patterns
    const patterns = allowedExtensions.map(pattern => {
        // Escape special regex characters except * and ?
        const escapedPattern = pattern
            .replace(/[.+^${}()|[\]\\]/g, '\\$&')
            .replace(/\*/g, '.*')
            .replace(/\?/g, '.');
        return new RegExp(`^${escapedPattern}$`, 'i');
    });
    
    // Check if the filename matches any pattern
    return patterns.some(pattern => pattern.test(filename));
}