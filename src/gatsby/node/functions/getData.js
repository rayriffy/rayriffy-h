const { TaskQueue } = require('cwait')

const { codes } = require('../../../contents/database/codes')

const { getRawData } = require('./getRawData')

const {
  maxSimultaneousDownloads,
} = require('../constants/maxSimultaneousDownloads')

exports.getData = async ({ reporter, cache }) => {
  try {
    const queue = new TaskQueue(Promise, maxSimultaneousDownloads)

    const res = await Promise.all(
      codes.map(
        queue.wrap(
          async item =>
            await getRawData(
              item.code ? item.code : item,
              item.exclude ? item.exclude : [],
              { reporter, cache }
            )
        )
      )
    )

    return res
  } catch (e) {
    throw e
  }
}
