import { NextApiHandler } from 'next'

import PDFKit from 'pdfkit'
import { sortBy } from 'lodash'
import { TaskQueue } from 'cwait'

import { getHentai } from '../../../core/services/getHentai'
import { getImageUrl } from '../../../core/services/getImageUrl'
import { processImage } from '../../../modules/ebook/services/processImage'

import { Image } from '../../../core/@types/Image'
import { ProcessedImage } from '../../../modules/ebook/@types/ProcessedImage'

const imageDownloadQueue = new TaskQueue(Promise, 20)
const b5PaperDimension = {
  width: 498.9,
  height: 708.66,
}

const createPageInstance =
  (document: PDFKit.PDFDocument) => (image: Buffer) => {
    document.addPage()

    document.image(image, 0, 0, b5PaperDimension)
  }

const api: NextApiHandler = async (req, res) => {
  const hentai = await getHentai(req.query.code as string)

  /**
   * Download all images into Buffer
   */
  const processedImages = await Promise.all(
    hentai.images.pages.map(
      imageDownloadQueue.wrap<ProcessedImage, Image, number>(
        async (page, i) => {
          const targetUrl = getImageUrl({
            image: page,
            mediaId: hentai.media_id,
            page: i + 1,
            type: 'gallery',
          })

          return {
            page: i + 1,
            image: page,
            data: await processImage(targetUrl, page.w / page.h),
          }
        }
      )
    )
  ).then(o => sortBy(o, 'page'))

  /**
   * Generate PDF document
   */
  const pdfDocument = new PDFKit({
    size: 'B5',
    autoFirstPage: false,
    info: {
      Title: hentai.title.pretty,
      Author: hentai.tags
        .filter(o => o.type === 'artist')
        .map(o => o.name)
        .join(';'),
      Keywords: hentai.tags
        .filter(o => o.type === 'tag')
        .map(o => o.name)
        .join(';'),
    },
  })
  const createPage = createPageInstance(pdfDocument)

  processedImages.forEach(image => {
    // console.log({ b5R: b5PaperDimension.width / b5PaperDimension.height, pageR: image.image.w / image.image.h })
    createPage(image.data)
  })

  pdfDocument.pipe(res)
  pdfDocument.end()
}

export default api
