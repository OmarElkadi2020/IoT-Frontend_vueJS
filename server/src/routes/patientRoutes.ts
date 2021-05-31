import { NextFunction, Request, Response, Router } from "express";
import { writeFile } from "fs";
import multer = require("multer");
import { extname } from "path";

//import * as bodyParser from "body-parser"; // not necessary, since body-parser is part of NodeJS

export class patientRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    // configure a multer Storage path (folder + filename)
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        //uploads is the folder name
        cb(null, "uploads");
      },
      filename: function (req, file, cb) {
        var patientStudent = JSON.parse(req.body.patientStudent);
        cb(null, patientStudent.MatrikelNumber + extname(file.originalname));
      }
    });
    //create upload instance (will recive the file and the body from request)
    var upload = multer({ storage: storage });

    // recives the file from request -> the name of the file in the single() must be the same on the client side in FormData
    this.router.post("/ppatient", upload.single("sickNoteEvidence"), this.post);

    this.router.get("/patient", this.get);
  }

  get(req: Request, res: Response) {
    let vn = req.query.vorname;
    console.log(vn);

    res.status(200).send("Vorname: " + vn);
  }

  post(req: Request, res: Response) {
    //recived the body as a stringified JOSN
    var body = req.body; // response body

    // parse JSON to Objects
    var patientStudent = JSON.parse(body.patientStudent);
    var sickNote = JSON.parse(body.sickNoteData);

    var sicknessReport = {
      patientStudent,
      sickNote
    };
    const file = req.file;
    if (!file) {
      console.log("not file error");
    }

    res
      .status(200)
      .send("the body and the file are recived" + JSON.stringify(body));

    const path = "./uploads/reports/" + patientStudent.MatrikelNumber + ".json";

    writeFile(path, JSON.stringify(sicknessReport), function (err) {
      if (err) return console.log(err);
      else return console.log("file generated in path: " + path);
    });
  }
}
