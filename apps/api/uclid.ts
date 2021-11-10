
//#!/usr/bin/env ts-node --script-mode

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { uclid } from '../../libs/ids/src/lib/uclid'
import options from 'options-parser'

const { opt } = options.parse({
    number: { default: '1' }
})
const { number } = opt

;[...Array(parseInt(number)).keys()].map(() => console.log(uclid()))