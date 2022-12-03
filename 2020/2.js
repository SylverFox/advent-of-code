function isValid(pass) {
    const match = pass.match(/^(\d+)-(\d+) ([a-z]): (\w+)$/)
    const charCount = match[4].split('').filter(c => c === match[3]).length
    return charCount >= match[1] && charCount <= match[2];
}

function isValid2(pass) {
    const match = pass.match(/^(\d+)-(\d+) ([a-z]): (\w+)$/);
    return match[4][match[1] - 1] === match[3] ^ match[4][match[2] - 1] === match[3];
}


export default function (input) {
    console.log(input.filter(isValid).length)
    console.log(input.filter(isValid2).length)
}

