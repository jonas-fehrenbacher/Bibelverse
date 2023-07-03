export function assert(condition: any, message: any): void {
    if (!condition) {
        throw message || "Assertion failed";
    }
}