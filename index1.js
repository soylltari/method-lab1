const fs = require('fs');
const readline = require('readline');

function solveQuadratic(a, b, c) {
    const D = b * b - 4 * a * c;
    if (D > 0) {
        const x1 = (-b + Math.sqrt(D)) / (2 * a);
        const x2 = (-b - Math.sqrt(D)) / (2 * a);
        return { roots: [x1, x2], count: 2 };
    } else if (D === 0) {
        const x1 = -b / (2 * a);
        return { roots: [x1], count: 1 };
    } else {
        return { roots: [], count: 0 };
    }
}

function printResult(a, b, c, result) {
    console.log(`Equation is: (${a}) x^2 + (${b}) x + (${c}) = 0`);
    console.log(`There are ${result.count} roots`);
    result.roots.forEach((root, index) => {
        console.log(`x${index + 1} = ${root}`);
    });
}

function interactiveMode() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function askCoefficient(name) {
        return new Promise(resolve => {
            rl.question(`${name} = `, answer => resolve(parseFloat(answer)));
        });
    }

    async function main() {
        const a = await askCoefficient('a');
        const b = await askCoefficient('b');
        const c = await askCoefficient('c');
        rl.close();

        const result = solveQuadratic(a, b, c);
        printResult(a, b, c, result);
    }

    main();
}

function fileMode(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8').trim();
        const [a, b, c] = data.split(' ').map(Number);
        const result = solveQuadratic(a, b, c);
        printResult(a, b, c, result);
    } catch (error) {
        console.error(`Error reading file: ${error.message}`);
        process.exit(1);
    }
}

if (process.argv.length === 3) {
    fileMode(process.argv[2]);
} else {
    interactiveMode();
}