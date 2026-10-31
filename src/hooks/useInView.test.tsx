import { act, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import Reveal from '../components/Reveal'
import { useInView } from './useInView'

let instances: FakeObserver[] = []

class FakeObserver {
  callback: IntersectionObserverCallback
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
  takeRecords = () => []

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback
    instances.push(this)
  }

  trigger(isIntersecting: boolean) {
    this.callback(
      [{ isIntersecting } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver,
    )
  }
}

function Probe() {
  const { ref, inView } = useInView<HTMLDivElement>()
  return <div ref={ref}>{inView ? 'visible' : 'hidden'}</div>
}

describe('useInView', () => {
  beforeEach(() => {
    instances = []
    vi.stubGlobal('IntersectionObserver', FakeObserver)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('starts hidden and observes its element', () => {
    render(<Probe />)

    expect(screen.getByText('hidden')).toBeInTheDocument()
    expect(instances).toHaveLength(1)
    expect(instances[0].observe).toHaveBeenCalledTimes(1)
  })

  it('stays hidden while the element is out of view', () => {
    render(<Probe />)

    act(() => instances[0].trigger(false))

    expect(screen.getByText('hidden')).toBeInTheDocument()
    expect(instances[0].disconnect).not.toHaveBeenCalled()
  })

  it('becomes visible once and stops observing', () => {
    render(<Probe />)

    act(() => instances[0].trigger(true))

    expect(screen.getByText('visible')).toBeInTheDocument()
    expect(instances[0].disconnect).toHaveBeenCalled()
  })

  it('disconnects when unmounted', () => {
    const { unmount } = render(<Probe />)

    unmount()

    expect(instances[0].disconnect).toHaveBeenCalled()
  })
})

describe('Reveal', () => {
  beforeEach(() => {
    instances = []
    vi.stubGlobal('IntersectionObserver', FakeObserver)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('shows its content and switches to the revealed style when in view', () => {
    render(
      <Reveal>
        <p>Hello</p>
      </Reveal>,
    )
    const wrapper = screen.getByText('Hello').parentElement

    expect(wrapper).not.toHaveClass('opacity-100')

    act(() => instances[0].trigger(true))

    expect(wrapper).toHaveClass('opacity-100')
  })

    it('applies the stagger delay as an inline transition delay', () => {
    render(
      <Reveal delay={200}>
        <p>Hello</p>
      </Reveal>,
    )

    const wrapper = screen.getByText('Hello').parentElement as HTMLElement

    expect(wrapper.style.transitionDelay).toBe('200ms')
  })
})