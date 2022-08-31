import { NextApiHandler } from 'next'

import PDFKit from 'pdfkit'
import axios from 'axios'
import { sortBy } from 'lodash'
import { TaskQueue } from 'cwait'

import { getHentai } from '../../../core/services/getHentai'
import { getImageUrl } from '../../../core/services/getImageUrl'
import { Image } from '../../../core/@types/Image'

const imageDownloadQueue = new TaskQueue(Promise, 40)
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
  interface ProcessedImage {
    page: number
    image: Image
    data: Buffer
  }
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
            data: await axios
              .get(targetUrl, {
                responseType: 'arraybuffer',
              })
              .then(o => o.data),
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
