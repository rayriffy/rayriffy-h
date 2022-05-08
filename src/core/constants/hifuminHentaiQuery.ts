const hifuminImageQuery = `
  info {
    type
    width
    height
  }
`

const hifuminTagQuery = `
  name
`

export const hifuminHentaiQuery = `
  id
  title {
    display
    english
    japanese
  }
  info {
    amount
    mediaId
    channel
  }
  images {
    cover {
      ${hifuminImageQuery}
    }
    pages {
      ${hifuminImageQuery}
    }
  }
  metadata {
    language
    parodies {
      ${hifuminTagQuery}
    }
    characters {
      ${hifuminTagQuery}
    }
    groups {
      ${hifuminTagQuery}
    }
    categories {
      ${hifuminTagQuery}
    }
    artists {
      ${hifuminTagQuery}
    }
    tags {
      ${hifuminTagQuery}
    }
  }
`
