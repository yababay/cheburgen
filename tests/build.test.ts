import { existsSync } from 'fs'
import build, { copyPublicFiles, makeClean, findForWatcher } from '../lib/build'
import { distDir } from '../lib/settings'

test.each(findForWatcher())('File %s should exist', fn => {
    expect(existsSync(fn)).toBeTruthy();
});

test('Build should be successfull', async () => {
    await build().then(() => {
        expect(existsSync(`${distDir}/assets/icons/bi-github.svg`)).toBeTruthy()
        expect(existsSync(`${distDir}/assets/images/hero.svg`)).toBeTruthy()
        expect(existsSync(`${distDir}/index.html`)).toBeTruthy()
        expect(existsSync(`${distDir}/error.html`)).toBeTruthy()
        expect(existsSync(`${distDir}/eula/index.html`)).toBeTruthy()
        expect(existsSync(`${distDir}/icons/index.html`)).toBeTruthy()
        expect(existsSync(`${distDir}/funny/index.html`)).toBeTruthy()
        //expect(existsSync(`${distDir}/funny/bundle.js`)).toBeTruthy()
        //expect(existsSync(`${distDir}/funny/bundle.css`)).toBeTruthy()
        expect(existsSync(`${distDir}/do-not-remove-this/index.html`)).toBeFalsy()
        expect(existsSync(`${distDir}/do-not-remove-this/test-with-markdown.html`)).toBeFalsy()
        expect(existsSync(`${distDir}/do-not-remove-this/test.png`)).toBeFalsy()
    })
})

test('Public files should be copied', () => {
    makeClean()
    copyPublicFiles()
    expect(existsSync(`${distDir}/assets/images/hero.svg`)).toBeTruthy()
})
