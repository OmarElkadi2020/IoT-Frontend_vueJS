// Simulation of data series
// Javascript import:
// const si = require('systeminformation');
import { Request, Response, Router } from "express";
import * as si from "systeminformation";
export class dataRoutes {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        console.log("Data routes");
        this.router.get("/data", this.get); // get data
    }

    get(req: Request, res: Response) {
        //si.cpuTemperature()
        si.mem()
            .then(data => {
                let returnObject = { ctime: null, sidata: {}}; // init a returnObject
                si.time();
                console.log(data);
                returnObject.ctime = si.time(); // current time
                returnObject.sidata = data;
                // get current data
                let td = [];
                td = req.app.get("timedata");
                // save 20 data objects with timestamp
                while (td.length > 20)
                    td.shift();
                td.push(returnObject);
                res.status(200).send(td); // respond with data in array
            });
    }
}
