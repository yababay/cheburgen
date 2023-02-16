import Renderer, { Production } from '../types/renderer'
import { ParsedQs } from 'qs'
import { Errorable } from '../types/errors'

class RendererDummy extends Renderer {

    constructor(){
        super('/foo.bar')
    }

    render(url: string, context: ParsedQs | Production | Errorable | null): string | boolean {
        return false
    }
}

class RendererSmarty extends Renderer {

    constructor(){
        super('/foo.bar')
    }

    render(url: string, context: ParsedQs | Production | Errorable | null): string | boolean {
        return true
    }
}

test('Smarty should work', () => {
    const smarty = new RendererSmarty()
    expect(() => smarty.input).toThrow()
})

test('Dummy should fail', () => {
    expect(() => new RendererDummy()).toThrow()
})
