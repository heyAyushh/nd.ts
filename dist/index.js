#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const util_1 = require("util");
const utils_1 = require("./utils");
const chalk_1 = __importDefault(require("chalk"));
const rimraf_1 = __importDefault(require("rimraf"));
const inquirer_1 = __importDefault(require("inquirer"));
const ora_1 = __importDefault(require("ora"));
const execp = util_1.promisify(child_process_1.exec);
const rimrafp = util_1.promisify(rimraf_1.default);
console.log(utils_1.ascii());
const spinner = ora_1.default();
inquirer_1.default
    .prompt([
    {
        type: "input",
        name: "folder_name",
        message: "Folder name? 📂",
        default: ".",
        validate(val) {
            const fail = val.match(/^(?:aux|con|clock\$|nul|prn|com[1-9]|lpt[1-9])$/i);
            if (!fail) {
                return true;
            }
            return "folder name is a reserved keyword.";
        },
    },
    {
        type: "list",
        name: "package_manager",
        message: "Package manager? 📦",
        choices: ["npm", "pnpm", "yarn"],
        filter(val) {
            return val.toLowerCase();
        },
        default: "npm",
    },
])
    .then(({ package_manager, folder_name }) => __awaiter(void 0, void 0, void 0, function* () {
    let status_text = utils_1.get_random([
        "shopping github files 🛒",
        "cloning repository 🐑 🧬",
        "files getting ready for you 👕",
    ]);
    spinner.start(status_text);
    yield execp(`git clone ${utils_1.git_repo_url} ${folder_name}`);
    spinner.color = "yellow";
    status_text = utils_1.get_random([
        "feeding dependencies to node_modules 🥗",
        "playing ping pong 🏓 with peer dependencies",
    ]);
    spinner.text = status_text;
    yield Promise.all([
        rimrafp(`${folder_name}/.git`),
        execp(`${folder_name === "." ? "" : `cd ${folder_name} &&`} ${package_manager === "pnpm"
            ? "pnpm i"
            : package_manager === "yarn"
                ? "yarn"
                : "npm i"}`),
    ]);
    spinner.succeed(chalk_1.default.blueBright("Happy hacking ✨"));
}))
    .catch((error) => {
    spinner.fail("uh oh 🙈");
    if (error.isTtyError) {
        console.error(`Prompt couldn't be rendered in the current environment`);
    }
    else {
        console.error(error);
    }
});
//# sourceMappingURL=index.js.map