// import * as dotenv from "dotenv";
import { Server as httpServer, createServer } from "http";
import * as express from "express";
import { patientRoutes } from "./routes/patientRoutes";
import { dataRoutes } from "./routes/dataRoutes";
import * as cors from "cors";
import multer = require("multer");

// Express Server Typescript
class Server {
    public serv: httpServer;
    public app: express.Application;

    constructor() {
        // dotenv.config();
        this.app = express(); // first create Express App
        this.serv = createServer(this.app); // to make the server instance available in functions
        this.config();
        this.routes();
    }

    public config(): void {
        this.app.set("port", process.env.PORT || 3000);
        // data is saved as objects in an array, objects contain timestamp and dataobject
        this.app.set("timedata", []); 
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors()) //nesssary for allow the client side acsses the backend
        this.app.use(express.static('public'));

        //this.app.use(bodyParser.json());
        //this.app.use(bodyParser.urlencoded({ extended: true }));

    }

    public routes(): void {
        this.app.use("/", new patientRoutes().router); // route /user
        this.app.use("/", new dataRoutes().router); // route /data
    } // routes()

    /**
     * Start the HTTP Server
     * Important: In some examples the Express app object is used for listen, that was not working!
     *  @param: s, http server which listens
     *  @param: p: Portnumber of the server
    */
    public start(s: any, p: number): void {
        s.listen(p, () => {
            console.log(
                "  API is running at http://localhost:%d",
                p
            );
        });
    }
} // Server

const server = new Server();
server.start(server.serv, 3000); // server.serv is httpServer, 3000 Portnumber
