export default function execute(func: () => any | Function, breakPipeOnException: boolean = false) {
  return {
    augId: 'execute',
    breakPipeOnException,
    func,
  }
}
