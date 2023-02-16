import { existsSync, readFileSync } from 'fs'
import path from 'path'
import { ParsedQs } from 'qs'
import { compileFile } from "pug"
import showdown from 'showdown'
import { InternalExternalUrl, Production } from '../../types/renderer'
import RendererWithLocals from './with-locals'
import { Errorable } from '../../types/errors'
import { ERROR_TEMPLATE_NOT_FOUND, ERROR_MARKDOWN_NOT_FOUND } from '../../types/errors'

const { Converter } = showdown
const converter = new Converter()

export default class RendererPug extends RendererWithLocals {

    constructor(url: string, context: ParsedQs | Production | Errorable | null = null){
        super(url, context)
    }

    render(url: string) {
        const { input, options, locals } = this
        return RendererPug.parsePug(input, options, locals)
    }

    parseUrl(url: string): InternalExternalUrl {
        return {internal: url, external: url.replace(/\.pug$/, '.html')}
    }

    get options() {
        const { input } = this
        const dir = path.dirname(input)
        return {
            filters: {
                markdown: (text: string, opts: object) => {
                    if(!(opts !== null && typeof opts === 'object')) return converter.makeHtml(text)
                    const from = Reflect.get(opts, 'from')
                    if (!from) return converter.makeHtml(text)
                    const mdUrl = `${dir}/${from}`
                    return RendererPug.parseMarkdown(mdUrl)
                }
            }
        }
    }
      
    static parsePug(fn: string, options = {}, locals = {}) {
        if (!existsSync(fn)) throw ERROR_TEMPLATE_NOT_FOUND(path.basename(fn))
        return compileFile(fn, options)(locals)
    }

    static parseMarkdown(fn: string) {
        if (!existsSync(fn)) throw ERROR_MARKDOWN_NOT_FOUND(path.basename(fn))
        const text = readFileSync(fn, 'utf8')
        return converter.makeHtml(text)
    }
}
