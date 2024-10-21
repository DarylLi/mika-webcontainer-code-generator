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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import "./App.css";
import { WebContainer } from "@webcontainer/api";
import { fromArray2Object } from "./utils/index";
import outputJson from "./mock/outputVueJson";
// import outputJson from "./mock/outputVanillaJson";
// import outputJson from "./mock/outputReactJson";
console.log(outputJson);
function App() {
    var _this = this;
    var initWebContainer = function () { return __awaiter(_this, void 0, void 0, function () {
        var webcontainerInstance, nodeV, ls, install, code, process;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, WebContainer.boot()];
                case 1:
                    webcontainerInstance = _a.sent();
                    return [4 /*yield*/, webcontainerInstance.spawn("node", ["-v"])];
                case 2:
                    nodeV = _a.sent();
                    nodeV.output.pipeTo(new WritableStream({
                        write: function (data) {
                            console.log("node -v ==>", data);
                        },
                    }));
                    return [4 /*yield*/, webcontainerInstance.mount(fromArray2Object(outputJson["exportFile"]))];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, webcontainerInstance.spawn("ls", ["-l"])];
                case 4:
                    ls = _a.sent();
                    ls.output.pipeTo(new WritableStream({
                        write: function (data) {
                            console.log("ls -l:", data);
                        },
                    }));
                    return [4 /*yield*/, webcontainerInstance.spawn("npm", ["install"])];
                case 5:
                    install = _a.sent();
                    install.output.pipeTo(new WritableStream({
                        write: function (data) {
                            console.log(data);
                        },
                    }));
                    return [4 /*yield*/, install.exit];
                case 6:
                    code = _a.sent();
                    if (code !== 0)
                        return [2 /*return*/, console.error("install fail")];
                    // run dev
                    console.log("npm run dev", code);
                    return [4 /*yield*/, webcontainerInstance.spawn("npm", ["run", "dev"])];
                case 7:
                    process = _a.sent();
                    process.output.pipeTo(new WritableStream({
                        write: function (data) {
                            console.log(data);
                        },
                    }));
                    // 5. 监听服务启动
                    webcontainerInstance.on("server-ready", function (port, url) {
                        console.log("server-ready", url);
                        var iframe = document.querySelector("#webcontainer-view");
                        iframe &&
                            (function () {
                                iframe.src = url;
                            })();
                    });
                    return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        initWebContainer();
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx("h1", { children: "render by webcontainer" }), _jsx("iframe", { id: "webcontainer-view" })] }));
}
export default App;
