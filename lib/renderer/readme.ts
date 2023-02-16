import { InternalExternalUrl } from '../../types/renderer'
import RendererPug from './pug'

export default class RendererReadme extends RendererPug {

    constructor(){
        super('/README.pug')
    }

    parseUrl(url: string): InternalExternalUrl {
        return {internal: url, external: '/index.html'}
    }
}
