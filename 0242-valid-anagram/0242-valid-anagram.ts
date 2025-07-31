function isAnagram(s: string, t: string): boolean {
    if (s.length !== t.length) return false;

    const count = new Map<string, number>();

    for (const ch of s) {
        count.set(ch, (count.get(ch) ?? 0) + 1);
    }

    for (const ch of t) {
        if (!count.has(ch)) return false;
        count.set(ch, count.get(ch) - 1);
        if (count.get(ch) < 0) return false;
    }

    return true;
};