export function chooseRandomElements(array: any[], numElements: number) {
    if (Array.isArray(array)) {
        const randomIndexes: number[] = [];
        while (randomIndexes.length < numElements) {
            const randomIndex = Math.floor(Math.random() * array.length);
            if (!randomIndexes.includes(randomIndex)) {
                randomIndexes.push(randomIndex);
            }
        }
        const randomElements = randomIndexes.map((index) => array[index]);
        return randomElements;
    } else {
        throw new Error('Must be an array');
    }
}
