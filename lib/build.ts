import { readdirSync, lstatSync, copyFileSync, existsSync, mkdirSync, readFileSync, rmSync } from 'fs'
import path from 'path'
import { publicDir, distDir, stylesDir, pagesDir } from './settings'
import shortid from 'shortid'
import { isRendereringLegal, getRenderer } from './renderer'

export default async function build() {

    makeClean()
    copyPublicFiles()
    await renderInternalUrls()

    console.log('Done.')
}

export async function renderInternalUrls(){
    const buildId = shortid()
    const context = { buildId }
    console.log(`Gathering page files. Build ID = ${buildId}.`)
    await Promise.all(findPageFiles().map(url => getRenderer(url, context).rollup()))
    ;[...findPageFiles().filter(file => !file.includes('rollup-config')), ...findStyleFiles(), ...findIconFiles()]
    .forEach(url => {
        const renderer = getRenderer(url, context)
        renderer.write()
    })
}

function findIconFiles(): string[]{
    const scssFiles =  findDirectories(stylesDir).reduce((acc, dir) => {
        const files = readdirSync(dir)
            .map(item => `${dir}/${item}`)
            .filter(item => lstatSync(item).isFile())
        return [...acc, ...files]
    }, new Array<string>())
    return scssFiles.reduce((acc, file) => {
        const rows = readFileSync(file, 'utf8').split('\n')
            .filter(row => row.includes('@include icon-background'))
            .map(row => {
                const [ _, url ] = /.*icon-background\(\"([^\"]+)/.exec(row) as string[]
                return url ? `/assets/icons/bi-${url}.svg` : ''
            })
            .filter(row => !!row)
        return [...acc, ...rows]    
    }, new Array<string>())
}

export function findForWatcher(){
    return [...findPageFiles(true), ...findStyleFiles(true), ...findPublicFiles()]
}

function findStyleFiles(forWatcher = false): string[]{
    const { length } = stylesDir
    return findDirectories(stylesDir).reduce((acc, dir) => {
        const files = readdirSync(dir)
            .filter(item => forWatcher || !item.startsWith('_'))
            .map(item => `${dir}/${item}`)
            .filter(item => lstatSync(item).isFile())
            .map(file => forWatcher ? file : file.substring(length))
        return [...acc, ...files]
    }, new Array<string>())
    .map(url => forWatcher ? url : `/assets${url.replace(/\.scss$/, '.css')}`)
}

function findPageFiles(forWatcher = false): string[]{
    const { length } = pagesDir
    return findDirectories(pagesDir).reduce((acc, dir) => {
        const files = readdirSync(dir)
            .filter(item => forWatcher || !item.startsWith('_'))
            .map(item => `${dir}/${item}`)
            .filter(item => lstatSync(item).isFile())
            .map(file => forWatcher ? file : file.substring(length))
            .filter(url => isRendereringLegal(url))
        return [...acc, ...files]
    }, new Array<string>())
}

function findPublicFiles(){
    return findDirectories(publicDir).reduce((acc, dir) => {
        let files = readdirSync(dir)
            .map(file => `${dir}/${file}`)
            .filter(file => lstatSync(file).isFile())
        return [...acc, ...files]
    }, new Array<string>())
}

export function copyPublicFiles() {

    console.log('Copying public files...')

    const { length } = publicDir

    return findPublicFiles().forEach(input => {
        const output = `${distDir}${input.slice(length)}`
        const dir = path.dirname(output)
        mkdirSync(dir, {recursive: true})
        copyFileSync(input, output)
    })
} 

export function makeClean(){
    console.log('Removing previous build...')
    if(existsSync(distDir)) rmSync(distDir, {recursive: true})
}

function findDirectories(dir: string, dirs: string[] = []): string[] {
    dirs.push(dir)
    readdirSync(dir).forEach(item => {
        item = path.resolve(dir, item)
        if(lstatSync(item).isDirectory()) return findDirectories(item, dirs)
    })
    return dirs.filter(dir => !dir.includes('do-not-remove-this'));
}
