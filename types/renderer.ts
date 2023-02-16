import { copyFileSync, mkdirSync, writeFileSync, existsSync } from 'fs'
import path from 'path'
import { Request, Response, NextFunction} from 'express'
import { ParsedQs } from 'qs'
import { getAbsolutePath, getDistPath, getExt } from '../lib/util'
import { Errorable } from './errors'
import { mimetypes } from '../lib/settings'
import rollupLoader from '../lib/rollup/index'

export interface InternalExternalUrl {
    internal: string
    external: string
}

export interface Production {
    buildId: string | boolean
}

export default abstract class Renderer {

    #urls: InternalExternalUrl
    #content: string | boolean
    #context: ParsedQs | Production | Errorable | null

    constructor(url: string, context: ParsedQs | Production | Errorable | null = null){
        this.#context = context
        this.#urls = this.parseUrl(url)
        this.#content = this.render(url, context)
        if(!this.#content) throw `Не удалось подготовить контент для ${url}`
    }

    get urls() {
        return this.#urls
    }

    get mime(): string | boolean {
        const { content, input, output } = this
        if(typeof content === 'boolean') return !!input
        const ext = getExt(output)
        if(!mimetypes.has(ext)) return false
        return mimetypes.get(ext) as string
    }

    get content(): string | boolean {
        return this.#content
    }

    get context(): ParsedQs | Production | Errorable | null {
        return this.#context
    }

    get input(): string{
        const { urls } = this
        const { internal } = urls
        return getAbsolutePath(internal)
    }

    get output(): string{
        const { urls } = this
        const { external } = urls
        return getDistPath(external)
    }

    write(){
        const { input, output, content } = this
        const dir = path.dirname(output)
        mkdirSync(dir, {recursive: true})
        if(typeof content === 'boolean'){
            copyFileSync(input, output)
            return
        }
        writeFileSync(output, content)
    }

    reply(req: Request, res: Response, next: NextFunction){
        const { input, content, mime } = this
        res.status(200)
        if(typeof content === 'boolean'){
            return res.sendFile(input)
        }
        res.contentType(mime as string)
        res.end(content)
    }

    async rollup(){
        const { input } = this
        const dir = path.dirname(input)
        let config = `${dir}/_rollup.config.js`
        if(!existsSync(config)) config = `${dir}/_rollup.config.mjs`
        if(!existsSync(config)) return 
        await rollupLoader(config)       
    }

    parseUrl(url: string): InternalExternalUrl{
        return {internal: url, external: url}
    }

    abstract render(url: string, context: ParsedQs | Production | Errorable | null): string | boolean;
}
