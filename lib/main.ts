import * as core from '@actions/core'
import * as github from '@actions/github'
import { getVersion } from './calver'

try {
  const prev = core.getInput('prev')
  const microPrefix = core.getInput('microPrefix')
  console.log('Got args', prev, microPrefix)
  const version = getVersion(prev, microPrefix)
  console.log('Got version', version)
  core.setOutput('version', version)
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`)
} catch (error:any) {
  core.setFailed(error.message)
}
