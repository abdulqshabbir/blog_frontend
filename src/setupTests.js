let savedItems = {}

const originalError = console.error

beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return
    }
    originalError.call(console, ...args)
  }
})

const localStorageMock = {
    getItem: (key) => savedItems[key],
    setItem: (key, item) => {
        savedItems[key] = item
    },
    clear: () => {
        savedItems = {}
    }
}

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

afterAll(() => {
    console.error = originalError
})