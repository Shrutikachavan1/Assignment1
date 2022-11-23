const http= require('http');
const fs= require('fs');
const PORT = 5000;
const server= http.createServer((req,res)=>{
    if(req.url=="/"){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write('<html><body><h2>We are performing File System using NodeJS </h2></body></html>');
        res.end();

    }
    else if(req.url=="/create"){
        if(fs.existsSync('crud.txt')){
            res.writeHead(200,{'Content-Type':'text/html'});
            res.write("File is Already Exist");
            res.end();

        }
        else{
            fs.writeFile('crud.txt',"Hello, How are you?",(err)=>{
              
            if(err) {throw err}
            else{
                res.writeHead(200,{'Content-Type':'text/html'});
                res.end("File has been created");
            }
        });
        
    }}

    else if(req.url=="/read"){
        if(fs.existsSync('crud.txt')){
            const data= fs.readFileSync('crud.txt')
            res.end(`<html><body><h4>${data.toString()}</h4></body></html>`);
        }
        else{
            res.end(`<html><body><h2>File has been created.</h2></body></html>`)
        }
    }

    else if(req.url=="/update"){
        if(fs.existsSync('crud.txt')){
            fs.appendFile('crud.txt',"Hello Shrtuika",(err)=>{
                if (err) throw err
                else{
                res.end(`<html><body><h2>File has been upadated successfully</h2></body></html>`)
                    }
            })
        }
        else{
            res.end(`<html><body><h2>File is not there</h2></body></html>`);
        }

    }
    else if(req.url=="/delete"){
        if(fs.existsSync('crud.txt')){
            fs.unlink('crud.txt',(err)=>{
                if(err) throw err
                else {
                    res.end(`<html><body><h2>File is deleted successfully</h2></body></html>`)
                }

            })
        }
        else{
            res.end(`<html><body><h2>File is not there</h2></body></html>`)
        }
    }

    else{
        res.end(`<html><body><h2>Invalid URL </h2></body></html>`)
    }
    
})

server.listen(PORT, (err)=>{
    if(err){ throw err}
    else{
        console.log(`The Server is Running on ${PORT}`);
    }
})