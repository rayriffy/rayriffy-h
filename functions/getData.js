const {TaskQueue} = require('cwait')

const databaseCodes = require('../src/contents/database/codes')

const {getRawData} = require('./getRawData')

const MAX_SIMULTANEOUS_DOWNLOADS = 3

exports.getData = async ({reporter}) => {
  try {
    const queue = new TaskQueue(Promise, MAX_SIMULTANEOUS_DOWNLOADS)

    const res = await Promise.all(
      databaseCodes.map(queue.wrap(async item => await getRawData(item.code ? item.code : item, item.exclude ? item.exclude : [], reporter))),
    )
  
    return res
  } catch (e) {
    throw e
  }
}
