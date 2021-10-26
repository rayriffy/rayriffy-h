import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'

interface IProps {
  paths: {
    path: string
    directory: boolean
  }[]
}

const Page: NextPage<IProps> = props => {
  const router = useRouter()

  console.log(router)

  return (
    <div className="space-y-2 pt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {props.paths.map(path => path.directory ? (
        <div>
          <Link href={`${router.asPath}/${path.path}`}>
            <a className="text-blue-500 cursor-pointer hover:underline">{path.path}</a>
          </Link>
        </div>
      ) : <p>{path.path}</p>)}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<IProps> = async ctx => {
  const { paths } = ctx.query

  const { default: fs } = await import('fs')
  const { default: path } = await import('path')

  const { default: sortBy } = await import('lodash.sortby')

  const targetPath = (paths === undefined || paths.length === undefined ? [(paths || '')] : (paths as string[])).join('/')
  const scanedPaths = sortBy(fs.readdirSync(path.join(process.cwd(), targetPath)).map(o => ({
    path: o,
    directory: fs.statSync(path.join(process.cwd(), targetPath, o)).isDirectory()
  })), ["directory", "path"])

  return {
    props: {
      paths: scanedPaths,
    }
  }
}

export default Page
