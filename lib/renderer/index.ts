import { Request, Response, NextFunction} from 'express'
import { ParsedQs } from 'qs'
import Renderer from '../../types/renderer'
import RendererMime from './mime'
//import RendererIcon from './icon'
//import RendererScss from './scss'
//import RendererPug  from './pug'
//import RendererTdocs  from './tsdoc'
//import { ERROR_NO_RENDERER_FOUND, ERROR_ILLEGAL_MIME_TYPE, Errorable } from '../../types/errors'
import settings from '../settings'
import { getExt as getLocalExt, existsAndIsPagesFile, existsAndIsPagesDirectory } from '../util'

const { extensions } = settings

interface Production {
    shortid: string
}

interface UrlAndQuery {
    url: string
    query: ParsedQs | Production
}

//const renderers = prepareRenderersMap()

export function isRendereringLegal(url: string){
    const ext = getLocalExt(url)
    return extensions.includes(ext) || renderers.has(ext)
}
/*
export function getNetworkExt(url: string){
    if(renderers.has(getLocalExt(url))) throw ERROR_ILLEGAL_MIME_TYPE(url)
    const ext = Array.from(renderers.keys()).find(key => existsAndIsPagesFile(`${url}.${key}`))
    return ext
}

function getRendererForNetwork(url: string, context: ParsedQs | Production | Errorable | null){
    return getRenderer(url, context, false)
}

export function getRenderer(url: string, context: ParsedQs | Production | Errorable | null, local = true): Renderer {
    const fromNetwork = !local
    if(url.includes('/docs/')) return new RendererTdocs(url)
    if(RendererIcon.isIcon(url)) return new RendererIcon(url)
    if(RendererScss.isStyle(url)) return new RendererScss(url)
    if(fromNetwork && existsAndIsPagesDirectory(url)) return getRendererForNetwork(`${url.replace(/\/$/, '')}/index`, context)
    const ext = fromNetwork ? getNetworkExt(url) : getLocalExt(url)
    if(ext && renderers.has(ext)) {
        const RendererFound = renderers.get(ext as string) as typeof Renderer
        if(!url.endsWith(ext)) url = `${url}.${ext}`
        return Reflect.construct(RendererFound, [url, context])
    }
    if(existsAndIsPagesFile(url)) return new RendererMime(url)
    throw ERROR_NO_RENDERER_FOUND(url)
}

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {url, query } = prepareUrlAndContext(req)
        const renderer = getRendererForNetwork(url, query)
        await renderer.rollup()
        renderer.reply(req, res, next)
    }
    catch(err){
        next(err)
    }
}

function prepareRenderersMap(): Map<string, typeof Renderer> {
    const map = new Map<string, typeof Renderer>()
    map.set('pug', RendererPug)
    return map
}

function prepareUrlAndContext(req: Request): UrlAndQuery{
    const { query } = req
    let url = req.originalUrl
    const qsi = url.indexOf('?')
    if(qsi > -1) url = url.substring(0, qsi)
    return { url, query }
}*/
