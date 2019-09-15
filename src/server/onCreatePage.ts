export const onCreatePage = async ({page, actions}: any) => {
  const {createPage} = actions

  if (page.path.match(/^\/g/)) {
    page.matchPath = '/g/*'
    createPage(page)
  }
}
