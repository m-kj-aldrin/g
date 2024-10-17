export function randInt(a, b) {
    const v = Math.random() * (b - a + 1) + a;
    return Math.floor(v);
}

export function randFloat(a, b) {
    const v = Math.random() * (b - a) + a;
    return v;
}
