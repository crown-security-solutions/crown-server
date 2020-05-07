import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./config/routes";
import * as cors from 'cors';

class App {

		public app: express.Application;
		public routePrv: Routes = new Routes();

    constructor() {
				this.app = express();
				this.app.use(function(req, res, next) {
					res.header("Access-Control-Allow-Origin", "*");
					res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
					next();
				});
				this.config();
				this.routePrv.routes(this.app);
    }

    private config(): void{
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
				this.app.use(bodyParser.urlencoded({ extended: false }));
				this.app.use(cors());
				this.app.options('*', cors());
    }

}

export default new App().app;