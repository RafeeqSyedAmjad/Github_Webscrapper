const request = require('request');
const cheerio = require('cheerio');
const getIssuesPageHtml = require('./issues.js');
function getReposPageHtml(url,topic){
    require(url,cb);
    function cb(error,response,html){

        if(error){
            console.log(error);
        }
        else if (response.statusCode == 404){
        console.log("page not found");

    }
        else{
            //console.log(html);
            getReposLink(html);
        }
    }


 function getReposLink(html){
   let $ = cheerio.load(html);
   let headingsArr = $('.f3.color-fg-muted.text-normal.lh-condensed');
   console.log(topic);
     for(let i=0;i<8;i++){ 
          let twoAnchors = $(headingsArr[i]).find("a");
          let link = $(twoAnchors[1]).attr("href");
          //console.log(link);
          let fullLink = `https://github.com${link}/issues`;
          let repoName = link.split("/").pop();
          getIssuesPageHtml(fullLink,topic,repoName);
         }
 }
}


module.exports = getReposPageHtml;
    
