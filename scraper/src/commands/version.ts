import packageJson from '../../package.json'

export const version = () => {
  console.log(packageJson.version)
}