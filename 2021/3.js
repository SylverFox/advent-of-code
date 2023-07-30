export default function (input) {

    let gamma = '', epsilon = '';
    for (let b = 0; b < 12; b++) {
        const ones = input.filter(l => l[b] === '1').length;
        gamma += ones * 2 > input.length ? '1' : '0'
        epsilon += ones * 2 > input.length ? '0' : '1'
    }

    console.log('Part 1:', parseInt(gamma, 2) * parseInt(epsilon, 2));


    let o2 = '';
    let filtered = input.slice();
    for (let b = 0; b < 12 && filtered.length > 1; b++) {
        const ones = filtered.filter(l => l[b] === '1').length;
        const mostCommon = ones * 2 >= filtered.length ? '1' : '0'
        filtered = filtered.filter(l => l[b] === mostCommon)
    }
    o2 = filtered[0]

    let c02 = '';
    filtered = input.slice();
    for (let b = 0; b < 12 && filtered.length > 1; b++) {
        const ones = filtered.filter(l => l[b] === '1').length;
        const leastCommon = ones * 2 >= filtered.length ? '0' : '1'
        filtered = filtered.filter(l => l[b] === leastCommon)
    }
    c02 = filtered[0]

    console.log('Part 2:', parseInt(o2, 2) * parseInt(c02, 2));
}