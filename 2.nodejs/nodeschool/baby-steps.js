const args = process.argv.slice(2).filter((arg) => isFinite(arg));

if (args.length) {
  const numbers = args.map((numberString) => parseInt(numberString));

  console.log(numbers.reduce((sum, val) => (sum += val), 0));
} else {
  console.log('No number input');
}
