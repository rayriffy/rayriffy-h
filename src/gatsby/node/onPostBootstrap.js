const _ = require('lodash')

const fs = require('fs')

const { tags } = require('../../contents/database/tags')

const { filterHentaiByTag } = require('./functions/filterHentaiByTag')
const { filterTag } = require('./functions/filterTag')
const { getData } = require('./functions/getData')

const ITEMS_PER_PAGE = 20

exports.onPostBootstrap = async ({reporter, cache}) => {
  reporter.info('Generating API')

  try {
    /**
     * Get healthy raw data
     */
    const fetchedRaw = await getData({reporter, cache})

    const healthyResults = _.filter(fetchedRaw, o => o.status === 'success').reverse()

    /**
     * Preparing to generate API
     */
    const apiPath = 'api'
    const apiChunks = _.chunk(healthyResults, ITEMS_PER_PAGE)

    if (!fs.existsSync(`./public/${apiPath}`)) {
      fs.mkdirSync(`./public/${apiPath}`)
    }

    /**
     * Generate API status page
     */
    fs.writeFile(
      `./public/${apiPath}/status.json`,
      JSON.stringify({
        status: 'success',
        code: 201,
        data: {
          time: Date.now(),
          list: {
            length: apiChunks.length,
          },
        },
      }),
      fshandler
    )

    /**
     * Generate API listing pages
     */
    if (!fs.existsSync(`./public/${apiPath}/listing`)) {
      fs.mkdirSync(`./public/${apiPath}/listing`)
    }

    apiChunks.map((chunk, i) => {
      const out = {
        status: 'success',
        code: 201,
        data: [],
      }

      chunk.map(node => {
        if (node) {
          out.data.push(node.data.raw)
        }
      })

      fs.writeFile(`./public/${apiPath}/listing/${i + 1}.json`, JSON.stringify(out), fshandler)
    })

    /**
     * Generate tag listing API
     */

    tags.map(tag => {
      const nodes = filterTag(healthyResults, tag.name)

      fs.writeFile(
        `./public/${apiPath}/${tag.prefix}.json`,
        JSON.stringify({
          status: 'success',
          code: 201,
          data: nodes.map(node => ({
            id: node.id,
            name: node.name,
          })),
        }),
        fshandler
      )
    })

    /**
     * Generate tag viewing API
     */

    tags.map(tag => {
      if (!fs.existsSync(`./public/${apiPath}/${tag.prefix}`)) {
        fs.mkdirSync(`./public/${apiPath}/${tag.prefix}`)
      }

      const nodes = filterTag(healthyResults, tag.name)

      nodes.map(node => {
        if (!fs.existsSync(`./public/${apiPath}/${tag.prefix}/${node.id}`)) {
          fs.mkdirSync(`./public/${apiPath}/${tag.prefix}/${node.id}`)
        }

        const filteredHentai = filterHentaiByTag(healthyResults, node)

        const apiChunks = _.chunk(filteredHentai, ITEMS_PER_PAGE)

        apiChunks.map((chunk, i) => {
          const out = {
            status: 'success',
            code: 201,
            data: [],
          }

          chunk.map(node => {
            if (node) {
              out.data.push(node.data.raw)
            }
          })

          fs.writeFile(`./public/${apiPath}/${tag.prefix}/${node.id}/${i + 1}.json`, JSON.stringify(out), fshandler)
        })
      })
    })

    reporter.info('API generated')
  } catch (e) {
    reporter.warn('Unable to generate API')
    throw e
  }
}
