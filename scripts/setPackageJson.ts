// @ts-ignore
console.log('Running script...')
const key = process.argv[2]
const value = process.argv[3]
if (!key || value == null) {
    console.error('ERROR', "Please provide key and value arguments, such as 'version' '1.2.3'")
    console.log('...failed! :(')
    process.exit(1)
}
setPackageJson(key, value)
console.log('...done! :)')

function setPackageJson(key: string, value: string) {
    console.log('setPackageJson', key, value)

    const fs = require('fs')
    let content = JSON.parse(fs.readFileSync('package.json', 'utf8'))
    content[key] = value
    fs.writeFileSync('package.json', JSON.stringify(content, null, 2))
}
