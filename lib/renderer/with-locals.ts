import { existsSync, readFileSync } from 'fs'
import path from 'path'
import { ParsedQs } from 'qs'
import Renderer, { Production } from '../../types/renderer'
import { Errorable } from '../../types/errors'
import settings from '../settings'

const { seo } = settings

export default abstract class RendererWithLocals extends Renderer {

    constructor(url: string, context: ParsedQs | Production | Errorable | null = null){
        super(url, context)
    }

    get locals(){
        const { context, input } = this
        const dir = path.dirname(input)
        let locs = {}
        const locsPath = `${dir}/settings.json`
        if(existsSync(locsPath)){
            locs = JSON.parse(readFileSync(locsPath, 'utf8'))    
        }
        return {...seo, ...context, ...locs}
    }
}
