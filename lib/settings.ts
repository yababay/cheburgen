import path from 'path'
import dotenv from 'dotenv'

import { readFileSync } from 'fs'
import { RenderingSettings, SeoProperties } from '../types/settings'

dotenv.config()

const projectDir = process.cwd()

const {
    DIR_SRC,
    DIR_DIST,
    DIR_PUBLIC,
    DIR_STYLES,
    DIR_PAGES,
    DIR_LIB,
    DIR_TYPES,
    DIR_DOCS,
    PATH_SETTINGS,
    USE_README,
    HTTP_PORT,
    DEBUG
} = process.env

function getPath(dir: string | undefined): string{
    return path.resolve(projectDir, typeof dir === 'string' ? dir : '')
}

function getStringFromSettings(key: string): string{
    const value = settings.get(key)
    if(typeof value !== 'string') throw `По ключу ${key} ожидалась строка.`
    return value
}

function getNumberFromSettings(key: string): number{
    const value = settings.get(key)
    if(typeof value !== 'number') throw `По ключу ${key} ожидалось число.`
    return value
}

export const httpPort     = getHttpPort()
export const srcDir       = getPath(DIR_SRC)
export const distDir      = getPath(DIR_DIST)
export const publicDir    = getPath(DIR_PUBLIC)
export const libDir       = getPath(DIR_LIB)
export const typesDir     = getPath(DIR_TYPES)
export const stylesDir    = `${srcDir}/${DIR_STYLES}`
export const pagesDir     = `${srcDir}/${DIR_PAGES}`
export const docsDir      = `${pagesDir}/${DIR_DOCS}`
export const assetsDir    = `${distDir}/assets`
export const iconsDir     = `${projectDir}/node_modules/bootstrap-icons/icons`
export const useReadme    = USE_README === '1' || USE_README === 'true' || USE_README === 'yes'
export const isDebug      = DEBUG === '1' || DEBUG === 'true' || DEBUG === 'yes'

export const libPrefix = DIR_LIB as string
export const typesPrefix = DIR_TYPES as string

export const mimetypes = prepareMimetypes()
export const extensions = Array.from(mimetypes.keys())

const settingsPath = `${srcDir}/${PATH_SETTINGS}`
const settings = prepareSettings(settingsPath)

export const seo: SeoProperties = {
    keywords: getStringFromSettings('keywords'),
    robots: getStringFromSettings('robots'),
    description: getStringFromSettings('description'),
    title: getStringFromSettings('title'),
    author: getStringFromSettings('author'),
    og_type: getStringFromSettings('og_type'),
    og_title: getStringFromSettings('og_title'),
    og_description: getStringFromSettings('og_description'),
    og_image: getStringFromSettings('og_image'),
    og_url: getStringFromSettings('og_url'),
    og_site_name: getStringFromSettings('og_site_name'),
    year: getNumberFromSettings('year'),
}

const output: RenderingSettings = {
    isDebug,
    libPrefix,
    typesPrefix,
    useReadme,
    srcDir,
    libDir,
    typesDir,
    docsDir,
    publicDir,
    pagesDir,
    stylesDir,
    iconsDir,
    distDir,
    assetsDir,
    mimetypes,
    extensions,
    httpPort,
    seo
}

function getHttpPort(){
    const vitePort = 5173
    if(typeof HTTP_PORT !== 'string') return vitePort
    const port = parseInt(HTTP_PORT)
    return isNaN(port) || port < 1024 ? vitePort : port
}

function prepareSettings(path: string): Map<string, string | number | boolean > {
    const props = JSON.parse(readFileSync(path, 'utf8'))
    if (typeof props !== 'object' && props != null) throw 'Не удалось прочитать описания свойств.'
    return Reflect.ownKeys(props).reduce((acc, key) => {
        const prop = props[key]
        if (typeof key !== 'string')  throw 'Не удалось прочитать ключ свойства.'
        if(!(typeof prop === 'string' || typeof prop === 'number' )) throw 'Не удалось прочитать описание свойства.'
        acc.set(key, prop)
        return acc
    }, new Map<string, (string | number)>())
}

function prepareMimetypes(): Map<string, string> {
    return new Map<string, string>(
        [
            ["aac",   "audio/aac"],
            ["abw",   "application/x-abiword"],
            ["arc",   "application/x-freearc"],
            ["avif",  "image/avif"],
            ["avi",   "video/x-msvideo"],
            ["azw",   "application/vnd.amazon.ebook"],
            ["bin",   "application/octet-stream"],
            ["bmp",   "image/bmp"],
            ["bz",    "application/x-bzip"],
            ["bz2",   "application/x-bzip2"],
            ["cda",   "application/x-cdf"],
            ["csh",   "application/x-csh"],
            ["csv",   "text/csv"],
            ["css",   "text/css"],
            ["doc",   "application/msword"],
            ["docx",  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
            ["eot",   "application/vnd.ms-fontobject"],
            ["epub",  "application/epub+zip"],
            ["gz",    "application/gzip"],
            ["gif",   "image/gif"],
            ["htm",   "text/html"],
            ["html",  "text/html"],
            ["ico",   "image/vnd.microsoft.icon"],
            ["ics",   "text/calendar"],
            ["jar",   "application/java-archive"],
            ["jpg",  "image/jpeg"],
            ["jpeg",  "image/jpeg"],
            ["js",    "text/javascript"],
            ["json",  "application/json"],
            ["mid",  	"audio/midi"],
            ["midi", 	"audio/midi"],
            ["mjs",   "text/javascript"],
            ["mp3",   "audio/mpeg"],
            ["mp4",   "video/mp4"],
            ["mpeg",  "video/mpeg"],
            ["mpkg",  "application/vnd.apple.installer+xml"],
            ["odp",   "application/vnd.oasis.opendocument.presentation"],
            ["ods",   "application/vnd.oasis.opendocument.spreadsheet"],
            ["odt",   "application/vnd.oasis.opendocument.text"],
            ["oga",   "audio/ogg"],
            ["ogv",   "video/ogg"],
            ["ogx",   "application/ogg"],
            ["opus",  "audio/opus"],
            ["otf",   "font/otf"],
            ["png",   "image/png"],
            ["pdf",   "application/pdf"],
            ["php",   "application/x-httpd-php"],
            ["ppt",   "application/vnd.ms-powerpoint"],
            ["pptx",  "application/vnd.openxmlformats-officedocument.presentationml.presentation"],
            ["rar",   "application/vnd.rar"],
            ["rtf",   "application/rtf"],
            ["sh",    "application/x-sh"],
            ["svg",   "image/svg+xml"],
            ["tar",   "application/x-tar"],
            ["tif",   "image/tiff"],
            ["tiff",  "image/tiff"],
            ["ts",    "video/mp2t"],
            ["ttf",   "font/ttf"],
            ["txt",   "text/plain"],
            ["vsd",   "application/vnd.visio"],
            ["wav",   "audio/wav"],
            ["weba",  "audio/webm"],
            ["webm",  "video/webm"],
            ["webp",  "image/webp"],
            ["woff",  "font/woff"],
            ["woff2", "font/woff2"],
            ["xhtml", "application/xhtml+xml"],
            ["xls",   "application/vnd.ms-excel"],
            ["xlsx",  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
            ["xml",   "application/xml"],
            ["xul",   "application/vnd.mozilla.xul+xml"],
            ["zip",   "application/zip"],
            ["3gp",   "audio/video"],
            ["3g2",   "audio/video"],
            ["7z",    "application/x-7z-compressed"],  
            ["jsonld", "application/ld+json"]
        ]
        
    )
}

export default output
