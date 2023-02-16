import Renderer, { InternalExternalUrl, Production } from '../../types/renderer'
import { Errorable } from '../../types/errors'
import { ParsedQs } from 'qs'

export default class RendererMime extends Renderer {

    constructor(url: string, context: ParsedQs | Production | Errorable | null = null){
        super(url)
    }

    render(url: string) {
        return true
    }
}
