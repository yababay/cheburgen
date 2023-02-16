import { existsSync } from 'fs'

import {
    getExt,
    existsAndIsFile,
    existsAndIsDirectory,
    existsAndIsPagesFile,
    existsAndIsPagesDirectory,
    existsAndIsStylesFile,
    existsAndIsIconsFile,
    existsAndIsSourceFile,
    getSourcePath,
    getDistPath,
    getStylesPath,
    getPagesPath,
    getIconsPath
} from '../lib/util'

import {
    srcDir, pagesDir,
} from '../lib/settings'

test('Path should start from slash', () => {
    expect(() => existsAndIsFile('settings.json', srcDir)).toThrow(/слэш/)
})

test('Util functions should work', () => {
    expect(getExt('/index.html')).toBe('html')
    expect(existsAndIsFile('/settings.json', srcDir)).toBeTruthy()
    expect(existsAndIsDirectory('/docs', pagesDir)).toBeTruthy()
    expect(existsAndIsPagesFile('/README.md')).toBeTruthy()
    expect(existsAndIsPagesDirectory('/docs')).toBeTruthy()
    expect(existsAndIsStylesFile('/README.md')).toBeTruthy()
    expect(existsAndIsIconsFile('/github.svg')).toBeTruthy()
    expect(existsAndIsSourceFile('/lib/settings.ts')).toBeTruthy()
    expect(existsAndIsSourceFile('/types/settings.ts')).toBeTruthy()
})

test.each([
    getSourcePath('/lib/settings.ts'),
    getSourcePath('/types/settings.ts'),
    getStylesPath('/empty/README.md'),
    getPagesPath('/docs/README.md'),
    getIconsPath('/github.svg'),
])('Directory should exist', (dir: string) => {
    expect(existsSync(dir)).toBeTruthy()
})
