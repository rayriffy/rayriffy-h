const _ = require('lodash')
const {rawData} = require('../assets/database/index')

const arr = []

rawData.map(o => {
  if (o.code) arr.push(o.code)
  else arr.push(o)
})

const chunks = _.chunk(arr, 14)

chunks.map((e, i) => {
  console.log('----- Page ' + (i + 1))

  e.map(o => {
    console.log(o)
  })

  console.log('')
})
