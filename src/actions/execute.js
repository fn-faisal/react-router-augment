export default function execute(func, breakPipeOnException) {
  return {
    augId: 'execute',
    breakPipeOnException,
    func,
  }
}
