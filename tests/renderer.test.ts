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

/*
import { Renderer, RendererDummy, RendererSmarty } from './renderer'
import { makeClean } from '../lib/build'

export class RendererDummy extends Renderer {

    constructor(){
        super('/')
    }

    parseUrl(url: string): InternalExternalUrl {
        return {internal: '/foo', external: '/bar'}
    }

    get mime() {
        return true
    }
}

export class RendererSmarty extends Renderer {

    constructor(){
        super('/do-not-remove-this/test.png')
    }

    parseUrl(url: string): InternalExternalUrl {
        return {internal: url, external: url}
    }

    get mime() {
        return true
    }
}
test('Dummy and smarty implementation', () => {

    const mReq: Partial<Request> = {};
    const mRes: Partial<Response> = {
        status: jest.fn(),
        contentType: jest.fn(),
        end: jest.fn(),
        sendFile: jest.fn(),
    };
    const mNnext: NextFunction = jest.fn();

    expect(() => new Renderer('/')).toThrow(/Renderer.*parseUrl/)
    
    const dummy = new RendererDummy()
    expect(() => dummy.write()).toThrow(/\/foo/)
    expect(() => dummy.reply(mReq as Request, mRes as Response, mNnext)).toThrow(/\/foo/)
    
    const smarty = new RendererSmarty()
    makeClean()
    smarty.write()
    expect(existsSync(smarty.output)).toBeTruthy();
    smarty.reply(mReq as Request, mRes as Response, mNnext)
    expect(mRes.sendFile).toBeCalledTimes(1);
})*/
