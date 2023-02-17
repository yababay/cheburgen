import sass from 'sass'
import { ParsedQs } from 'qs'
import Renderer, { InternalExternalUrl, Production } from '../../types/renderer'
import { Errorable } from '../../types/errors'

const assetsPrefix = '/assets'

export default class RendererScss extends Renderer {

    constructor(url: string, context: ParsedQs | Production | Errorable | null = null){
        super(url, context)
    }

    render(url: string) {
        const { input, context } = this
        const isProduction = !!context && typeof context === 'object' && Reflect.has(context as Production, 'buildId')
        const options: object = isProduction ? {style: "compressed"} : {}
        return sass.compile(input, options).css
    }

    parseUrl(url: string): InternalExternalUrl {
        return {internal: url.replace(assetsPrefix, '').replace(/\.css$/, '.scss'), external: url}
    }
    
    get output() {
        const out = super.output
        const { context } = this
        if(context === null) return out
        const { buildId } = this.context as Production
        if(!buildId) return out
        return out.replace(/\.css$/, `-${buildId}.css`)
    }

    static isStyle(url: string){
        return url.startsWith(assetsPrefix) && url.endsWith('.css')
    }
}
