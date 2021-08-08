const palindrome = (string) => {
    return string
        .split('')
        .reverse()
        .join('')
}

const avg = (arr) => {
    const reducer = (sum, item) => {
        return sum + item
    }

    return arr.length === 0 ? 0 : arr.reduce(reducer, 0) / arr.length
}

export { palindrome, avg }