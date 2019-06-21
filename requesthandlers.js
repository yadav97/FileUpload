
var exec = require("child_process").exec;
var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");

function start(response)
{
    console.log("request handler 'start' was called");
// ==================================================================================== 
    // var content = "empty";
    // exec("ls -lah",function(error,stdout,stderr){
    // response.writeHead(200,{"Content-Type":"text/plain"});
    // if(stderr)
    //     {response.write(stderr);}
    // else
    //     {response.write(stdout);}    


    // response.end();
    // })
// ===============================================================================================
    //     function sleep(milliseconds)
    // {
    //     var time = new Date().getTime();
    //     while(new Date().getTime < time + milliseconds);
        
        
    // }
    // sleep(10000000);

//     return "returning hello start";

// ======================================================================================================

// now make useful site

var body = '<html>'+
'<head>'+
'<meta http-equiv="Content-Type" '+
'content="text/html; charset=UTF-8" />'+
'</head>'+
'<body>'+
'<form action="/upload" enctype="multipart/form-data" '+
'method="post">'+
'<input type="file" name="upload">'+
'<input type="submit" value="Upload file" />'+
'</form>'+
'</body>'+
'</html>';

response.writeHead(200, {"Content-Type": "text/html"});
response.write(body)
response.end();





 }

function upload(response,request)
{
    console.log("request handler 'upload' was called");
    var form = new formidable.IncomingForm(),files = [], fields = [];
    console.log("about to parse");
    console.log(request.headers);


    form.parse(request, function(error, fields, files){
        console.log("parsing done");
       /* Possible error on Windows systems:
tried to rename to an already existing file */



        fs.rename(files.upload.path, "./temp/test.jpg",(error)=>{
            if(error)
            {

                fs.unlink("./tmp/test.jpg");
                fs.rename(files.upload.path, "./tmp/test.jpg");


            }



        });

        response.writeHead(200, {"Content-Type": "text/html"});
    response.write("received image:<br/>");
    response.write("<img src='/show' />");
    response.end();

    });




   
}


function show(response, postData)
 {

    console.log("Request handler 'show' was called.");

    fs.readFile("./temp/test.jpg", "", function(error, file) {
    if (error) 
    {
    response.writeHead(500, {"Content-Type": "text/plain"});
    response.write(error + "\n");
    response.end();
    }
     else 
     {
    response.writeHead(200, {"Content-Type": "image/png"});
    response.write(file);
    response.end();
    }
    });
}

exports.start = start;
exports.upload = upload;
exports.show  = show;