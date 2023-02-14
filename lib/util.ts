import { existsSync, lstatSync } from 'fs'
import path from 'path'
import settings from './settings'

const { pagesDir, stylesDir, iconsDir, distDir, libDir, srcDir, typesDir } = settings

function existsAndIs(url: string, prefix: string, isFile: boolean) {
    if(!url.startsWith('/')) throw 'URL must start with slash'
    const isDir = !isFile
    const path = `${prefix}${url}`
    if(!existsSync(path)) return false
    return isFile && lstatSync(path).isFile() || isDir && lstatSync(path).isDirectory()
}

/**
 * Возвращает расширение (знаки после последней точки) файла.
 * @param url запрашиваемый ресурс.
 * @returns 
 */

export function getExt(url: string): string{
    return path.extname(url).slice(1)
}

export function existsAndIsFile(url: string, prefix: string) {
    return existsAndIs(url, prefix, true)
}

export function existsAndIsDirectory(url: string, prefix: string) {
    return existsAndIs(url, prefix, false)
}

export function existsAndIsPagesFile(url: string) {
    return existsAndIsFile(url, pagesDir)
}

export function existsAndIsPagesDirectory(url: string) {
    return existsAndIsDirectory(url, pagesDir)
}

export function existsAndIsStylesFile(url: string) {
    return existsAndIsFile(url, stylesDir)
}

export function existsAndIsIconsFile(url: string) {
    return existsAndIsFile(url, iconsDir)
}

export function existsAndIsSourceFile(url: string) {
    let base = path.basename(url)
    base = `/${base}`
    return existsAndIsFile(base, libDir) || existsAndIsFile(base, typesDir)
}

export function getSourcePath(url: string) {
    let base = path.basename(url)
    base = `/${base}`
    if(existsAndIsFile(base, libDir)) return `${libDir}${base}`
    if(existsAndIsFile(base, typesDir)) return `${typesDir}${base}`
    throw 'No such file or file is not source'
}

export function getDistPath(url: string) {
    return `${distDir}${url}`
}

export function getStylesPath(url: string) {
    return `${stylesDir}${url}`
}

export function getPagesPath(url: string) {
    return `${pagesDir}${url}`
}

export function getIconsPath(url: string) {
    return `${iconsDir}${url}`
}
