import { program } from 'commander'
import { execSync } from 'child_process'

program
  .option('-p, --project <name>', 'specified project name')
  .option('--list', 'print affected projects', false)
  .option('--base <commit>', 'base commit to compare', 'HEAD~1')
  .option('--head <commit>', 'head commit to compare', `HEAD`)

program.parse(process.argv)

const { list, project, base, head } = program

const printAffected = JSON.parse(
  execSync(
    `yarn --silent nx print-affected --base=${base} --head=${head}`
  ).toString()
)

if (list) {
  printAffected.projects.map(o => console.log(o))
} else {
  console.log(printAffected.projects.includes(project))
}
