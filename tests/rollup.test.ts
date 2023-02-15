import rollup from '@cheburgen/rollup'
import { pagesDir } from '../lib/settings'

test('Rollup should rollup', async () => {
    const path = `${pagesDir}/funny/_rollup.config.mjs`
    await rollup(path)
    expect(2+2).toBe(4)
})
