import { InternalExternalUrl } from '../../types/renderer'
import RendererMime from './mime'

const iconDetector = '/assets/icons/bi-'

export default class RendererIcon extends RendererMime {

    constructor(url: string){
        super(url)
    }

    parseUrl(url: string): InternalExternalUrl {
        return {internal: url.replace(iconDetector, '/'), external: url}
    }

    static isIcon(url: string){
        return url.startsWith(iconDetector) && url.endsWith('.svg')
    }
}
