import { existsSync } from 'fs'
import { NextFunction, Request, Response } from "express"
import RendererScss from '../lib/renderer/scss'
import { makeClean } from '../lib/build'

test('Scss implementation', () => {

    const mReq: Partial<Request> = {};
    const mRes: Partial<Response> = {
        status: jest.fn(),
        contentType: jest.fn(),
        end: jest.fn(),
        sendFile: jest.fn(),
    };
    const mNnext: NextFunction = jest.fn();

    const smarty = new RendererScss('/assets/index.css', { buildId: 'qwerty' })
    makeClean()
    smarty.write()
    expect(existsSync(smarty.output)).toBeTruthy();
    expect(smarty.mime).toBe('text/css');
    smarty.reply(mReq as Request, mRes as Response, mNnext)
    expect(mRes.end).toBeCalledTimes(1);
})
