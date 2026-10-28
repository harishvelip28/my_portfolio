import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { vi } from 'vitest'
import { cleanup } from '@testing-library/react'

// jsdom doesn't implement these browser APIs, so give every test harmless defaults.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  configurable: true,
  value: (query: string) => ({ matches: false, media: query }),
})

class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserverStub,
})

window.scrollTo = vi.fn()

afterEach(() => {
  cleanup()
})