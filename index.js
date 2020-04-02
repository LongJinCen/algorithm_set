const path = require('path')
const fs = require("fs")

const code_path = '/Users/longjincen/Desktop/code/knowledge-Set/算法/动态规划'

const dirs = fs.readdirSync(code_path, { encoding: "utf-8"})

let result = ''
for (let i = 0; i < dirs.length; i++) {
    const file = dirs[i];
    const filename = file.replace(' ', '')
    if(filename.indexOf('.js') === -1) continue
    const filePath = path.join(code_path, file)
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' })
    result  = result + '## ' + filename + '\n' + '```javascript\n' + fileContent + '```' + '\n'
}
const targetPath = './动态规划/dp.md'
fs.writeFileSync(targetPath, result)