let url = "https://github.com/topics"
const request = require('request');
const cheerio = require('cheerio');
const getReposPageHtml = require('./repoPage.js');
request(url,cb);
function cb(error,response,html){
    if(error){
        console.log(error);
    }
    else if (response.statusCode == 404){
        console.log("page not found");

    }
    else{
       //console.log(html);
       getTopicLink(html);
    }
}
function getTopicLink(html) {
 let $ = cheerio.load(html);
 let linkElemArr = $(".no-underline.d-flex.flex-column.flex-justify-center");
 for(let i=0;i<linkElemArr.length;i++){
    let href = $(linkElemArr[i]).attr("href");
    //console.log(href);
    let topic = href.split("/").pop();
    console.log(topic);
    let fullLink = `https://github.com${href}`;
    getReposPageHtml(fullLink,topic);

 }
}

 


