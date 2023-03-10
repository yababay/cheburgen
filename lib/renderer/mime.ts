import { existsSync } from 'fs'
import Renderer from '../../types/renderer'

export default class RendererMime extends Renderer {

    constructor(url: string){
        super(url)
    }

    render(url: string) {
        return existsSync(this.input)
    }
}
