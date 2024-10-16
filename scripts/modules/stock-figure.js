import { createStockFigurePayload } from "../../data/tests/test-data.js";
import { config } from "../../configurations/config.js";
import { check_error } from "../utils.js";
import { sleep, group, check, open } from "k6";
import { Rate } from 'k6/metrics';
import http from "k6/http";

export const stockFigure = (req) => {
    let response;
    group(`Stock_Figure_Article_${req.matnr}`, function () {
        const headers = {
              'Content-Type': 'text/xml;charset=UTF-8',
              'Soapaction': `${config.soap_action}`
            };

        // console.log('request data: ', JSON.stringify(req));

        if(!req){
            console.warn('request data is required!')
            return;
        }

        response = http.post(
            `${config.base_url}/POS/StockQuery^SI_StockFigureQuery_Out`, 
                createStockFigurePayload(req), { headers: headers }
        );

        check_error(response);
        sleep(2);
    });
}