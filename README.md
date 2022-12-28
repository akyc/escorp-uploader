### Порядок работы
* клонировать репозиторий на свой компьютер
```bash 
git clone https://github.com/akyc/escorp-uploader.git 
```
* перейти в папку и установить зависимости
```bash 
cd escorp-uploader && npm i
```
* в папку ```input``` скопировать нужные файлы
* переименовать ```.env.example``` в ```.env``` и настроить доступы к серверу по sftp
* запустить js через node
```bash
node index.js
```
