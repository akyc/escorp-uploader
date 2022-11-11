const fs = require("fs"),
    Client = require("ssh2-sftp-client"),
    sftp = new Client(),
    vocabulary = { "ё": "yo", "й": "i", "ц": "ts", "у": "u", "к": "k", "е": "e", "н": "n", "г": "g", "ш": "sh", "щ": "sch", "з": "z", "х": "h", "ъ": "", "ф": "f", "ы": "i", "в": "v", "а": "a", "п": "p", "р": "r", "о": "o", "л": "l", "д": "d", "ж": "zh", "э": "e", "я": "ya", "ч": "ch", "с": "s", "м": "m", "и": "i", "т": "t", "ь": "", "б": "b", "ю": "yu", "(": "", ")": "", " ": "_", ",": "", "[": "", "]": "", "{": "", "}": "" },
    destFolder = "marketplaces",
    inputFolder = "input",
    today = (new Date()).toISOString().split('T')[0],
    uploadFolder = "src/" + (new Date()).toISOString().split('T')[0],
    linkStart = "https://eurosvet.ru/tmp/" + destFolder,
    serverFolder = "/www/sites/www.eurosvet.ru/www/public/tmp/" + destFolder


sftp.connect({
    host: '195.16.54.238',
    port: '22',
    username: 'designer',
    password: 'jFsW#lkBHggz9!!y'
}).then(() => {
    getFiles().then((data) => {
        logLinks(data)
        sftp.uploadDir(`./src`, serverFolder)
    })
}).catch((err) => {
    console.error('Error: ', err);
});

function getFiles() {
    return new Promise((resolve, rej) => {
        fs.readdir('./' + inputFolder, (err, files) => {
            let arr = []
            if (files.length) {
                fs.mkdirSync(`./${uploadFolder}`, { recursive: true })
            }
            files.forEach(async (file) => {
                const renameFile = [...file.toLowerCase()].map(el => vocabulary[el] ? vocabulary[el] : el).join('')
                await fs.copyFile(`./${inputFolder}/${file}`, `./${uploadFolder}/${renameFile}`, (err) => {
                    if (err) console.error(err);
                })
                arr.push(`${linkStart}/${uploadFolder.replace('src/', '')}/${renameFile}`)
            });
            resolve(arr)
        });
    })
}

function logLinks(arr) {
    arr.forEach((link) => {
        console.log(link)
    })
    return
}
