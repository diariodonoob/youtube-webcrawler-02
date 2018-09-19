require('dotenv').load()
const axios = require('axios')
const cheerio = require('cheerio')


const LeanResponse = (html, config) => {
    let $ = cheerio.load(html)
    return $(config.title).map((index, element) => ({
        title: $(element).find(config.body).text(),
        url: $(element).find(config.body).attr(config.attr)
    })).get()
}

const SearchNoticies = async (LeanResponse, config) => {
    try {
        const response = await axios({ url: config.url, method: 'get' })
        const objectReturn = await LeanResponse(response.data, config)
        return Promise.resolve(objectReturn)
    } catch (err) {
        return Promise.reject(err)
    }
}

const config = {
    title: '.post-title',
    body: 'a',
    attr: 'href',
    url:  process.env.IMASTER_NOTICIES
}

SearchNoticies(LeanResponse, config)
    .then(resp => console.log('response', resp))
    .catch(err => console.log('error', err))