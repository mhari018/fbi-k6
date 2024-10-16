import { createTransferPostingPayload } from "../../data/tests/test-data.js";
import { config } from "../../configurations/config.js";
import { check_error } from "../utils.js";
import { sleep, group, check, open } from "k6";
import { Rate } from 'k6/metrics';
import http from "k6/http";

export const transferPosting = (req) => {
    let response;
    group(`Transfer_Posting_Article_${req.matnr}`, function () {
        const headers = {
              'Content-Type': 'text/xml;charset=UTF-8',
              'Soapaction': `${config.soap_action}`
            };

        if(!req){
            console.warn('request data is required!')
            return;
        }

        response = http.post(
            `${config.base_url}/POS/TP^SI_TransferPosting_Out`, 
                createTransferPostingPayload(req), { headers: headers }
        );

        check_error(response);
        sleep(2);
    });
}