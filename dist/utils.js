"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ascii = exports.theme = exports.get_random = exports.git_repo_url = void 0;
const chalk_1 = __importDefault(require("chalk"));
const figlet_1 = __importDefault(require("figlet"));
exports.git_repo_url = "https://github.com/heyayushh/node.ts.git";
function get_random(list) {
    return list[Math.floor(Math.random() * list.length)];
}
exports.get_random = get_random;
exports.theme = {
    colors: ["#DCDCAA", "#4EC9B0", "#C586C0", "#9CDCFE", "#CE9178"],
    background: "#000000",
    foreground: "#FFFFFF",
};
const ascii = () => {
    let coloredData = "";
    let colorsIndex = 0;
    let data;
    try {
        data = figlet_1.default.textSync("nd.ts", {
            font: "Slant Relief",
            horizontalLayout: "default",
            verticalLayout: "default",
        });
    }
    catch (error) {
        return error;
    }
    for (let i = 0; i < data.length; i++) {
        const character = data.charAt(i);
        if (character !== "_") {
            if (data.charAt(i - 1) == "_" ||
                data.charAt(i - 1) == " " ||
                data.charAt(i - 1) == ".") {
                colorsIndex++;
                if (colorsIndex >= exports.theme.colors.length) {
                    colorsIndex = 0;
                }
            }
            coloredData += chalk_1.default
                .hex(exports.theme.colors[colorsIndex])
                .bgHex(exports.theme.background)(data.charAt(i));
        }
        else {
            coloredData += chalk_1.default.hex(exports.theme.foreground).bgHex(exports.theme.background)(data.charAt(i));
        }
    }
    return coloredData;
};
exports.ascii = ascii;
//# sourceMappingURL=utils.js.map