import { program } from 'commander'
import { execSync } from 'child_process'

program.option('-p, --project <name>', 'specified project name')

program.parse(process.argv)

const { project } = program

const printAffected = JSON.parse(execSync(`yarn --silent nx print-affected --base=HEAD~1 --head=HEAD`).toString())

console.log(printAffected.projects.includes(project))
