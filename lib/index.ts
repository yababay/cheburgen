#!/usr/bin/env node

import express  from 'express'
import settings from './settings'
import build    from './build'
import wsWatch  from './watch'

import errors   from './error'
import renderer from './renderer'

const { httpPort, publicDir } = settings

;(async function(){

  if(process.env.NODE_ENV?.toLowerCase() === 'production'){
    await build()
    return process.exit(0)
  }

  const app = express()
  app.use(express.static(publicDir))
  app.use('*', renderer)
  app.use(errors)
  wsWatch(app.listen(httpPort))
  console.log(`Happy ceburgening on port ${httpPort}!`)
})()
