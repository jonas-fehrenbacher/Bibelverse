/*export*/ function assert(condition: any, message: any) {
    if (!condition) {
        throw message || "Assertion failed";
    }
}