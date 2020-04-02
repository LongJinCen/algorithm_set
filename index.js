const path = require('path')
const fs = require("fs")

const code_path = '/Users/longjincen/Desktop/code/knowledge-Set/算法/剑指offer'

const dirs = fs.readdirSync(code_path, { encoding: "utf-8"})

let result = ''
for (let i = 0; i < dirs.length; i++) {
    const file = dirs[i];
    const filename = file.replace(' ', '')
    const filePath = path.join(code_path, file)
    console.log(filePath)
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' })
    result  = result + '## ' + filename + '\n' + '```javascript\n' + fileContent + '```\n'
}

fs.writeFileSync('./niuke/剑指Offer.md', result)