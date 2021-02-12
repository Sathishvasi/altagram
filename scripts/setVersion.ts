// @ts-ignore
console.log('Running script...')
const version = process.argv[2]
if (!version) {
    console.error('ERROR', 'Please provide a version argument, such as 1.2.3')
    console.log('...failed! :(')
    process.exit(1)
}
setVersion(version)
console.log('...done! :)')

function setVersion(version: string) {
    console.log('setVersion', version)
}
