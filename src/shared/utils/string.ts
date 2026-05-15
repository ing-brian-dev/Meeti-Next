
export function pluralize(word: string, count: number): string {
    if (count === 1) return word;
    const lastChar = word[word.length - 1].toLowerCase();
    if(['a','e','i','o','u'].includes(lastChar)) {
        return word + 's';
    }
    return word + 'es'
}