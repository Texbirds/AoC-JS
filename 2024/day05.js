function part1(input) {
    const sections = input.trim().split(/\r?\n\s*\r?\n/); // split into rules and updates part
    const rules = sections[0].trim().split('\n').map(rule => rule.split('|').map(Number)); // parse rules
    const updates = sections[1].trim().split('\n').map(line => line.split(',').map(Number)); // parse updates

    let total = 0;

    for (const update of updates) {
        // map for quick lookup
        const pageToIndex = new Map();
        update.forEach((num, idx) => pageToIndex.set(num, idx));

        let valid = true;

        // check if update is valid
        for (const [a, b] of rules) {
            if (pageToIndex.has(a) && pageToIndex.has(b)) {
                if (pageToIndex.get(a) >= pageToIndex.get(b)) {
                    valid = false;
                    break;
                }
            }
        }

        // if valid, get middle value and add to total
        if (valid) {
            const middleIndex = Math.floor(update.length / 2);
            total += update[middleIndex];
        }
    }

    return total;
}

function part2(input) {
    const [rulesSection, updatesSection] = input.trim().split(/\r?\n\s*\r?\n/);
    const rules = rulesSection.trim().split('\n').map(rule => rule.split('|').map(Number));
    const updates = updatesSection.trim().split('\n').map(line => line.split(',').map(Number));

    let total = 0;

    for (const update of updates) {
        // check if already valid
        const pageToIndex = new Map();
        update.forEach((num, idx) => pageToIndex.set(num, idx));

        let isValid = true;
        for (const [a, b] of rules) {
            if (pageToIndex.has(a) && pageToIndex.has(b)) {
                if (pageToIndex.get(a) >= pageToIndex.get(b)) {
                    isValid = false;
                    break;
                }
            }
        }

        if (isValid) continue; // skip updates that are already valid

        // sort invalid update using swap loop
        let changed = true;
        while (changed) {
            changed = false;
            const lookup = new Map();
            update.forEach((num, idx) => lookup.set(num, idx));

            for (const [a, b] of rules) {
                if (lookup.has(a) && lookup.has(b)) {
                    if (lookup.get(a) >= lookup.get(b)) {
                        const indexA = lookup.get(a);
                        const indexB = lookup.get(b);
                        [update[indexA], update[indexB]] = [update[indexB], update[indexA]];
                        changed = true;
                        break; // restart loop to avoid stale index map
                    }
                }
            }
        }

        // add middle value of corrected update
        const middleIndex = Math.floor(update.length / 2);
        total += update[middleIndex];
    }

    return total;
}

module.exports = { part1, part2 };