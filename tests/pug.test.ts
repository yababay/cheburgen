import { existsSync, readFileSync } from 'fs'
import { makeClean } from '../lib/build'
import settings from '../lib/settings'
import RendererPug from '../lib/renderer/pug'

const { pagesDir, distDir } = settings

test('Pug renderer should render', () => {
    const testUrl = '/do-not-remove-this/test-with-markdown.pug'
    const renderer = new RendererPug(testUrl)
    let html = renderer.content as string
    expect(html.includes('</title>')).toBeTruthy()
    expect(html.includes('</h1>')).toBeTruthy()
    expect(html.includes('</p>')).toBeTruthy()
    expect(html.includes('Lorem ipsum')).toBeTruthy()
    makeClean()
    renderer.write()
    expect(renderer.output === `${distDir}${testUrl.replace(/\.pug$/, '.html')}`).toBeTruthy()
    expect(existsSync(renderer.output)).toBeTruthy()
    html = readFileSync(renderer.output, 'utf8') 
    expect(html.includes('<h1 id="loremipsum">Lorem ipsum</h1>')).toBeTruthy()
    expect(html.includes('anim id est laborum.</p></body></html>')).toBeTruthy()
})

test('Parsers should parse', () => {
    let output = RendererPug.parsePug(`${pagesDir}/do-not-remove-this/index.pug`)
    expect(output.includes('</h1>')).toBeTruthy()
    output = RendererPug.parseMarkdown(`${pagesDir}/do-not-remove-this/test.md`)
    expect(output.includes('</h1>')).toBeTruthy()
})
