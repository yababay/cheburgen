import { existsSync } from 'fs'
import { Request, Response, NextFunction} from 'express'
import RendererMime from '../lib/renderer/mime'
import { makeClean } from '../lib/build'

test('Mime should write and reply', () => {
    const mReq: Partial<Request> = {};
    const mRes: Partial<Response> = {
        status: jest.fn(),
        contentType: jest.fn(),
        end: jest.fn(),
        sendFile: jest.fn(),
    };
    const mNnext: NextFunction = jest.fn();

    const smarty = new RendererMime('/do-not-remove-this/test.png')
    makeClean()
    smarty.write()
    expect(existsSync(smarty.output)).toBeTruthy();
    smarty.reply(mReq as Request, mRes as Response, mNnext)
    expect(mRes.sendFile).toBeCalledTimes(1);
})
