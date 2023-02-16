import { getRenderer, isRendereringLegal } from "../lib/renderer"

test('Renderer should be found', () => {
    const FROM_NETWORK = false
    let renderer = getRenderer('/', null, FROM_NETWORK)
    expect(['RendererReadme', 'RendererPug'].includes(renderer.constructor.name)).toBeTruthy()
    renderer = getRenderer('/do-not-remove-this', null, FROM_NETWORK)
    expect(renderer.constructor.name).toBe('RendererPug')
    renderer = getRenderer('/assets/index.css', null, FROM_NETWORK)
    expect(renderer.constructor.name).toBe('RendererScss')
    renderer = getRenderer('/assets/icons/bi-github.svg', null, FROM_NETWORK)
    expect(renderer.constructor.name).toBe('RendererIcon')
    renderer = getRenderer('/do-not-remove-this/test.svg', null, FROM_NETWORK)
    expect(renderer.constructor.name).toBe('RendererMime')
})

test('Renderer should be legal', () => {
    expect(isRendereringLegal('/index.html')).toBeTruthy()
    expect(isRendereringLegal('/index.css')).toBeTruthy()
    expect(isRendereringLegal('/index.jpg')).toBeTruthy()
    expect(isRendereringLegal('/index.pug')).toBeTruthy()
    expect(isRendereringLegal('/index.scss')).not.toBeTruthy()
})