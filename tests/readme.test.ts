import { existsSync, readFileSync } from 'fs'
import { makeClean } from '../lib/build'
import { pagesDir, distDir } from '../lib/settings'
import RendererReadme from '../lib/renderer/readme'

test('Pug renderer should render', () => {
    const renderer = new RendererReadme()
    let html = renderer.content as string
    expect(html.includes('</title>')).toBeTruthy()
    makeClean()
    renderer.write()
    expect(renderer.output === `${distDir}/index.html`).toBeTruthy()
    expect(existsSync(renderer.output)).toBeTruthy()
})
