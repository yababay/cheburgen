import App from './index.svelte'

const target = document.querySelector('figure')

Reflect.construct(App, [{target}])
