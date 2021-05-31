import { NextFunction, Request, Response, Router } from "express";
import { writeFile } from "fs";
import multer = require("multer");
//import * as bodyParser from "body-parser"; // not necessary, since body-parser is part of NodeJS

export class patientRoutes {

    router: Router
   
    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {

        // configure a multer Storage (folder + filename)
        var storage = multer.diskStorage({
          destination: function(req, file, cb) {
            cb(null, "uploads");
          },
          filename: function(req, file, cb) {
            cb(null, Date.now()+ '-' + file.fieldname + '.pdf' );
          }
        });
        //create upload instance (will recive the file and the body from request)
        var upload = multer({ storage: storage });
        console.log("patient routes");

        // recives the file from request 
        this.router.post("/ppatient", upload.single('evd') , this.post);
        this.router.get("/patient", this.get);
    }

    get(req: Request, res: Response) {
        let vn = req.query.vorname;
        console.log(vn);

        res.status(200).send("Vorname: " + vn);
    }

    post(req: Request, res: Response) {

        var body = req.body; // response body
        
        const file = req.file;
        if (!file) {
            console.log("not file error")
        }

        var patientStudent = JSON.parse(body.patientStudent)
        var sickNote = JSON.parse(body.sickNote)
        body = {
            patientStudent,
            sickNote
        }
        res.status(200).send("the body and the file are recived" + JSON.stringify(body))

        console.log(typeof(body))
        console.log(typeof(patientStudent))
        console.log(typeof(sickNote))


        const path = './public/' + patientStudent.MatrikelNumber+ '.json'
    
        writeFile(path, JSON.stringify(body), function (err) {
            if (err) return console.log(err)
            else return console.log('file generated in path: ' + path)
        });

    }

}