function isAnagram(s: string, t: string): boolean {
    if (s.length !== t.length) return false;
    const base = new Map()
    s.split('').forEach(char => {
        base.has(char) ? base.set(char, base.get(char) + 1) : base.set(char, 1)
    })

    t.split('').forEach(char => {
      if (base.has(char)) {
        base.set(char, base.get(char) - 1)
      }
    })

    let result = true;
    for (const value of base.values()) {
        if (value > 0) {
            result = false
        }
    }

    return result
};