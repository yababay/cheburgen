import { existsSync } from 'fs'
import { rollup } from 'rollup'
import loadConfigFile from '@cheburgen/rollup'

export default async function(config: string){
  const rollupOptions = await loadConfigFile(config).then(props => {
    if(!props) return
    const { options, warnings } = props
    const { count } = warnings
    if(count) warnings.flush();
    return options
  })
  for (const optionsObj of rollupOptions) {
    const bundle = await rollup(optionsObj);
    await Promise.all(optionsObj.output.map(bundle.write));
  }
}

