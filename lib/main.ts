import * as core from '@actions/core'
import * as github from '@actions/github'
import { getVersion } from './calver'

/**
 * Checks if something is true - useful for string environment variables
 * @param val string | boolean | undefined
 * @returns boolean
 */
export const isTrue = (val: string | boolean | undefined): boolean => {
  if (typeof val === 'string') {
    return val.toLowerCase() === 'true'
  } else {
    return !!val
  }
}

try {
  const prev = core.getInput('prev')
  const microPrefix = core.getInput('microPrefix')
  const shouldShowDot = isTrue(core.getInput('shouldShowDot'))

  const version = getVersion(prev, microPrefix, { shouldShowDot })
  core.setOutput('version', version)
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`)
} catch (error:any) {
  core.setFailed(error.message)
}
