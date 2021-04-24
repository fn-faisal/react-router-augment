export default function execute(func: Function, breakPipeOnException: boolean = false) {
  return {
    augId: 'execute',
    breakPipeOnException,
    func,
  }
}
