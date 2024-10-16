export const createStockFigurePayload = (params) => {
    return `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:stoc="http://kawanlama.com/POS/StockQuery">
            <soapenv:Header/>
            <soapenv:Body>
                <stoc:MT_StockFigureQuery_Request>
                    <!--Zero or more repetitions:-->
                    <T_ITEM>
                        <I_MATNR>${params.matnr}</I_MATNR>
                        <I_WERKS>${params.werks}</I_WERKS>
                        <I_LGORT>${params.lgort}</I_LGORT>
                    </T_ITEM>
                </stoc:MT_StockFigureQuery_Request>
            </soapenv:Body>
        </soapenv:Envelope>`;
}

export const createTransferPostingPayload = (params) => {
    return `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tp="http://kawanlama.com/POS/TP">
    <soapenv:Header/>
    <soapenv:Body>
        <tp:MT_TransferPosting_Request>
            <WERKS>${params.werks}</WERKS>
            <BOOKID>${params.bookID}</BOOKID>
            <STOREID>${params.storeID}</STOREID>
            <SALESID>${params.salesID}</SALESID>
            <CANCEL></CANCEL>
            <!--Zero or more repetitions:-->
            <T_ITEM>
                <!--Optional:-->
                <MATNR>${params.matnr}</MATNR>
                <!--Optional:-->
                <MENGE>${params.menge}</MENGE>
                <!--Optional:-->
                <LGORT></LGORT>
            </T_ITEM>
        </tp:MT_TransferPosting_Request>
       </soapenv:Body>
    </soapenv:Envelope>
    `;
}

export const createB2CPayload = (params) => {
    return `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sal="http://kawanlama.com/B2C/Sales">
    <soapenv:Header/>
    <soapenv:Body>
        <sal:MT_B2C_MRO_SOEC_Request>
            <HEADER>
                <ORDERID>testleo1</ORDERID>
                <ORDERDATE>20230712</ORDERDATE>
                <ORDERTYPE>B2C_KLS</ORDERTYPE>
                <CUSTNAME1>Andreas Budi</CUSTNAME1>
                <CUSTNAME2>Kurniawan</CUSTNAME2>
                <EMAIL>budi_pioneer@yahoo.com</EMAIL>
                <PHONE>9081238912893797</PHONE>
                <ADDRESS1>JL. SORONG SUDIRMAN</ADDRESS1>
                <ADDRESS2>NOMOR 46</ADDRESS2>
                <ADDRESS3>kecamatan mantapjiwa</ADDRESS3>
                <CITY>Kota Jambi</CITY>
                <SALESID>140385</SALESID>
                <SALESOFFICE>S702</SALESOFFICE>
                <SALES_GRP>S88</SALES_GRP>
                <KODEJALUR></KODEJALUR>
                <COUNTRY>ID</COUNTRY>
                <POSTALCODE>12388</POSTALCODE>
                <SHIPCOST></SHIPCOST>
                <GRANDPRICE></GRANDPRICE>
                <PARTIALSHIP></PARTIALSHIP>
                <REMARK>TEST MEMBERSHIP</REMARK>
                <CUSTNO></CUSTNO>
                <SOURCE>E_COMMERCE_KLS_B2C</SOURCE>
                <REQDLVDATE>20230712</REQDLVDATE>
                <SHIPCONDITION>Z6</SHIPCONDITION>
                <DPVALUE></DPVALUE>
                <PAYERNAME1></PAYERNAME1>
                <PAYERNAME2></PAYERNAME2>
                <PAYERADDR1></PAYERADDR1>
                <PAYERADDR2></PAYERADDR2>
                <PAYERADDR3></PAYERADDR3>
                <PAYERPOSTCODE></PAYERPOSTCODE>
                <PAYERCITY></PAYERCITY>
                <PAYERPROVINCE></PAYERPROVINCE>
                <PAYERNPWP></PAYERNPWP>
                <PAYEREMAIL></PAYEREMAIL>
                <BILLBLOCK></BILLBLOCK>
                <DLVBLOCK></DLVBLOCK>
            </HEADER>
            <T_ITEM>
                <ID>1</ID>
                <PRODUCTNO>700049361</PRODUCTNO>
                <SALESPRICE>200000</SALESPRICE>
                <QUANTITY>2</QUANTITY>
                <UNIT>EA</UNIT>
                <CURRENCY>IDR</CURRENCY>
				<STGE_LOC></STGE_LOC>
				<SITE>S702</SITE>
                <SITE_VENDOR></SITE_VENDOR>
                <CONDTYPE></CONDTYPE>
                <INDENT></INDENT>
                <VENDOR></VENDOR>
                <CONFIRMNO></CONFIRMNO>
                <SERIALNUMBER></SERIALNUMBER>
                    </T_ITEM>
                </sal:MT_B2C_MRO_SOEC_Request>
            </soapenv:Body>
        </soapenv:Envelope>
    `;
}

export const createB2BPayload = (params) => {
    return `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sal="http://kawanlama.com/B2B/Sales">
    <soapenv:Header/>
    <soapenv:Body>
        <sal:MT_B2B_MRO_SOEC_Request>
            <HEADER>
                <ORDERID>ODI123456</ORDERID>
                <ORDERDATE>20240315</ORDERDATE>
                <ORDERTYPE>B2B_HCI</ORDERTYPE>
                <CUSTSOLDNO>1100001046</CUSTSOLDNO>
                <CUSTSHIPNO>1100001046</CUSTSHIPNO>
                <CUSTBILLNO>1100001046</CUSTBILLNO>
                <REQDLVDATE>20240315</REQDLVDATE>
                <SHIPCOST>0</SHIPCOST>
                <GRANDPRICE>2599000</GRANDPRICE>
                <PARTIALSHIP/>
                <REMARK>TYP_ORD : TOKOPEDIADEL_ID : anteraja_cargo_tokopediaDEL_TIME : 00:00:00DEL_DATE : 15.03.2024TK-INV158824585</REMARK>
                <SOURCE>E_COMMERCE_HCI_B2B</SOURCE>
				<SALESID>112233</SALESID>
				<SALESOFFICE>H300</SALESOFFICE>
                <SALES_GRP>H65</SALES_GRP>
                <SHIPPINGPOINT/>
                <SHIPCONDITION>Z6</SHIPCONDITION>
                <FORWARDER/>
                <DPVALUE/>
                <TAXCLASS/>
                <SHIPNAME1>Reva Kurniawan</SHIPNAME1>
                <SHIPNAME2> - AnterAja Cargo Tokopedia</SHIPNAME2>
                <SHIPADDRESS1>Atlanta Village, Jalan Conley nomor</SHIPADDRESS1>
                <SHIPADDRESS2> 28</SHIPADDRESS2>
                <SHIPADDRESS3/>
                <SHIPCITY>KAB. TANGERANG</SHIPCITY>
                <SHIPPORTAL/>
                <SHIPPHONE>*********4469</SHIPPHONE>
                <SHIPEMAIL/>
                <BILLBLOCK/>
                <DLVBLOCK/>
                <EMPLOYEE_REFF/>
            </HEADER>
            <!--1 or more repetitions:-->
            <T_ITEM>
                <ID>1</ID>
                <PRODUCTNO>X900643</PRODUCTNO>
                <SALESPRICE>200000</SALESPRICE>
                <QUANTITY>4</QUANTITY>
                <UNIT>EA</UNIT>
                <CURRENCY>IDR</CURRENCY>
                <STGE_LOC>1000</STGE_LOC>
                <SITE>H001</SITE>
                <!--Optional:-->
                <SITE_VENDOR></SITE_VENDOR>
                <!--Optional:-->
                <CONDTYPE></CONDTYPE>
                <!--Optional:-->
                <INDENT></INDENT>
                <!--Optional:-->
                <VENDOR></VENDOR>
                <!--Optional:-->
                <CONFIRMNO></CONFIRMNO>
                <!--Optional:-->
                <SERIALNUMBER></SERIALNUMBER>
            </T_ITEM>
        </sal:MT_B2B_MRO_SOEC_Request>
    </soapenv:Body>
</soapenv:Envelope>`;
}