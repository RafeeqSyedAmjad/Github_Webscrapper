const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const pdfkit = require('pdfkit');
function getIssuesPageHtml(url,topic,repoName){
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
            getIssues(html);
        }
    }
    function getIssues(html){
        let $ = cheerio.load(html);
        let issuesElemArr = $(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title")
        console.log(issuesElemArr.length);
        let arr = []
        for(let i=0;i<issuesElemArr.length;i++){
            let link = $(issuesElemArr[i]).attr("href");
            arr.push(link);
            
        
        }
        console.log(topic,"   ",arr);
        let folderpath = path.join(__dirname,topic);
        dirCreater();
        let filepath = path.join(folderpath,repoName+".pdf");
        let text = JSON.stringify(arr)
        let pdfDoc = new pdfkit();
        pdfDoc.pipe(fs.createWriteStream(filepath));
        pdfDoc.text(text);
        pdfDoc.end();
       // fs.writeFileSync(filepath,);
        
    }
}
module.exports = getIssuesPageHtml;
function dirCreater(folderpath){
    if(fs.existsSync(folderpath)==false){
        fs.mkdirSync(folderpath);
    }
}