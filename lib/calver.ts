interface Version {
  year: number;
  month: number;
  day: number;
  micro: number;
}
const parseVersionString = (versionString:string, microPrefix: string) => {
  if (versionString.substring(0, 1) !== 'v') { throw new Error('invalid version') }
  const [dateString, micro] = versionString.substring(1).split(`-${microPrefix}`)
  if (!dateString || !micro) { throw new Error('invalid version') }
  const buckets = dateString.split('.')
  if (buckets.length !== 3) { throw new Error('invalid version') }
  [...buckets, micro].forEach(v => {
    if (isNaN(Number(v))) {
      throw new Error('Failed to parse')
    }
  })
  return {
    year: Number(buckets[0]),
    month: Number(buckets[1]),
    day: Number(buckets[2]),
    micro: Number(micro)
  }
}
const isToday = (version:Version) => {
  const now = new Date()
  if (version.year === now.getFullYear() && version.month === now.getMonth() + 1 && version.day === now.getDate()) {
    return true
  } else {
    return false
  }
}
const createVersionString = (microPrefix = '', micro = 0) => {
  const now = new Date()
  return `v${now.getFullYear()}.${now.getMonth() + 1}.${now.getDate()}-${microPrefix}${micro}`
}

export const getVersion = (prev:string, microPrefix:string) => {
  if (prev !== '') {
    const previousVersion = parseVersionString(prev, microPrefix)
    if (previousVersion && isToday(previousVersion)) {
      return createVersionString(microPrefix, previousVersion.micro + 1)
    } else {
      return createVersionString()
    }
  } else {
    return createVersionString()
  }
}
