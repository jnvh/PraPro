var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import fetch from 'node-fetch';
import { createRequire } from 'module';
var require = createRequire(import.meta.url);
var base64 = require('base-64');
;
;
;
var auth = { user: 'admin', pass: 'geoserver' };
var config = function (method) { return ({
    method: method,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': "Basic " + base64.encode(auth.user + ":" + auth.pass),
    },
}); };
var testParams = {
    url: 'http://localhost:8080/geoserver/rest',
    workspace: 'prapro',
    storeName: 'result',
};
var createCoverage = function (_a) {
    var storeName = _a.storeName, workspace = _a.workspace, url = _a.url;
    return __awaiter(void 0, void 0, void 0, function () {
        var path, bodyXML, bodyJSON, bodystring, options, response, text;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    path = 'file:/home/jvanheek/Schreibtisch/PraPro/docker/geoserver/geoserver_data/praproSource/mce/test3.tif';
                    bodyXML = "<CoverageStore>\n        <name>" + storeName + "</name>\n        <enabled>true</enabled>\n        <type>GeoTIFF</type>\n        <workspace>" + workspace + "</workspace>     \n        <url>" + path + "</url>\n    </CoverageStore>";
                    bodyJSON = {
                        "coverageStore": {
                            name: "test",
                            type: "GeoTIFF",
                            workspace: {
                                name: "prapro"
                            }
                        }
                    };
                    bodystring = JSON.stringify(bodyJSON);
                    options = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/sjon',
                            'Accept': 'application/json',
                            'Authorization': "Basic " + base64.encode(auth.user + ":" + auth.pass)
                        },
                        body: bodystring
                    };
                    console.log(options.body);
                    return [4 /*yield*/, fetch(url + "/workspaces/prapro/coveragestores", options)];
                case 1:
                    response = _b.sent();
                    return [4 /*yield*/, response.text()];
                case 2:
                    text = _b.sent();
                    console.log("RESPONSE--------------------------------------------------------------------------------------------------");
                    console.log(response);
                    console.log("RESPONSE-------------------------------------------------------------------------------------------------");
                    return [2 /*return*/];
            }
        });
    });
};
/*

        <url>string</url>
    <coverages>
        <link>null</link>
    </coverages>


const coverageStore = {
    "coverageStore": {
        "name": storeName,
        "type": "string",
        "enabled": true,
        "workspace": {
            "name": workspace
        }
    }
};

const configData: restConfig = config('POST');
configData.body = JSON.stringify(coverageStore);
const response = await fetch
    (`${url}/workspaces/${workspace}/coveragestores`, configData);
const text = await response.text();
if (response.ok) {
    return `Der Coveragestore ${text} wurde erstellt`;
} else {
    throw new Error(`createCoverage Error: ${response.status}`);
}
*/
var upGeotiff = function (_a) {
    var url = _a.url, workspace = _a.workspace, storeName = _a.storeName, rasterDir = _a.rasterDir;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            return [2 /*return*/];
        });
    });
};
var publishGeotiff = function (params) {
    createCoverage(params).then(function (Response) {
        console.log(Response);
        upGeotiff(params)
            .then(function (response) { return console.log(response); })
            .catch(function (error) { return console.error(error); });
    }).catch(function (error) { return console.error(error); });
};
createCoverage(testParams).catch(function (err) {
    console.log(err);
});
