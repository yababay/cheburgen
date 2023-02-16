interface Warnings {
    count: number
    flush: CallableFunction
}

export interface Rollupable {options: any, warnings: Warnings}

export async function loadConfigFile(fn: string, opts={}): Promise<Rollupable | null>{
    return null
}
