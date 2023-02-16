import { Request, Response, NextFunction} from 'express'
import RendererPug from './renderer/pug'

export default async (error: Error, req: Request, res: Response, next: NextFunction): Promise<void> => {
    if(!error) return next()
    console.error(process.env?.DEBUG ? error : error.message)
    const status = Reflect.get(error, 'status') || 500
    const { message } = error
    const html = new RendererPug('/error.pug', {message, status}).content
    res.status(status).contentType('text/html').end(html)
}
