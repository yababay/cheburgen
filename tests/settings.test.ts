import { existsSync, lstatSync } from 'fs'
import dotenv from 'dotenv'
import settings from '../lib/settings'

dotenv.config()

const {
    srcDir,
    docsDir,
    libDir,
    typesDir,
    distDir,
    pagesDir,
    publicDir,
    stylesDir,
    iconsDir,
    assetsDir,
    useReadme,
    httpPort,
    mimetypes,
    extensions,
    seo,
} = settings

const {
    keywords,
    robots,
    description,
    title,
    author,
    og_type,
    og_title,
    og_description,
    og_image,
    og_url,
    og_site_name,
    year
} = seo

test('Http port should be pointed', () => {
    expect(httpPort).toBe(6704)
}) 

test('SEO keys should be set up', () => {
    expect([
        keywords,
        robots,
        description,
        title,
        author,
        og_type,
        og_title,
        og_description,
        og_image,
        og_url,
        og_site_name,
    ].every(key => typeof key === 'string')).toBeTruthy()
    expect(typeof year === 'number').toBeTruthy()
})

test.each([
    srcDir,
    docsDir,
    libDir,
    typesDir,
    pagesDir,
    publicDir,
    stylesDir,
    iconsDir,
    assetsDir,
])('Directory %s should exist', (dir: string) => {
    expect(existsSync(dir) && lstatSync(dir).isDirectory()).toBeTruthy()
})

test('Files and directories sould exist', () => {
    expect(useReadme).toBeTruthy()
    expect(mimetypes.get('jpg')).toBe('image/jpeg')
    expect(extensions.includes('png')).toBeTruthy()
})
