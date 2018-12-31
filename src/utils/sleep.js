export default function sleep(delay) {
    return new Promise(resolve => setTimeout(resolve, delay))
}
