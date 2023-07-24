const fs = require('fs')
const http = require('http')
const url = require('url')

const replacedata = require(`${__dirname}/modules/replace.js`)

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`)
const dataObj = JSON.parse(data);

const temphome = fs.readFileSync(`${__dirname}/temp/home.html`, 'utf-8')
const tempcontent = fs.readFileSync(`${__dirname}/temp/content.html`, 'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/temp/product.html`, 'utf-8')



const server = http.createServer((req, res) => {
    const {query, pathname} = url.parse(req.url, true);

    if(pathname === '/') {
        res.writeHead(200, {
            'content-type': 'text/html'
        })
        console.log(dataObj);
        const replacecontent = dataObj.map(el => replacedata (tempcontent, el)).join('');
        const output = temphome.replace('{%CONTENT%}', replacecontent);
        res.end(output);
    }

    else if (pathname === '/product'){
        res.writeHead(200, {
            'content-type' : 'text/html'
        })
        const product = dataObj[query.id]
        const output = replacedata(tempProduct, product)
        res.end(output);
    }

    else if (pathname === '/api' || pathname === '/api:id'){
        res.writeHead(200, {
            'content-type' : 'text/json'
        })
        res.end(data)
    }

    else {
        res.writeHead(404, {
            'content-type': 'text/html',
            'erro' :'page-not-found'
        })
        res.end('<h1>Page Not Found 😡 </h1>')
    }


});

server.listen(8000, () => {
    console.log('server is listining http://localhost:8000/')
});