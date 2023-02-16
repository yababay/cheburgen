import { existsSync } from 'fs'
import { NextFunction, Request, Response } from "express"
import RendererIcon from '../lib/renderer/icon'
import { makeClean } from '../lib/build'

test('Icon renderer should render', () => {

    const mReq: Partial<Request> = {};
    const mRes: Partial<Response> = {
        status: jest.fn(),
        contentType: jest.fn(),
        end: jest.fn(),
        sendFile: jest.fn(),
    };
    const mNnext: NextFunction = jest.fn();

    const smarty = new RendererIcon('/assets/icons/bi-github.svg')
    makeClean()
    smarty.write()
    expect(existsSync(smarty.output)).toBeTruthy();
    smarty.reply(mReq as Request, mRes as Response, mNnext)
    expect(mRes.sendFile).toBeCalledTimes(1);
})
