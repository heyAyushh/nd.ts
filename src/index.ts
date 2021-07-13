#!/usr/bin/env node
import { exec } from "child_process";
import { promisify } from "util";
import { get_random, git_repo_url, ascii } from "./utils";
import chalk from "chalk";
import rimraf from "rimraf";
import inquirer from "inquirer";
import ora from "ora";

const execp = promisify(exec);
const rimrafp = promisify(rimraf);

type package_manager = "npm" | "yarn" | "pnpm";

type Answers = {
  package_manager: package_manager;
  folder_name: string;
};

console.log(ascii());

const spinner = ora();

inquirer
  .prompt([
    {
      type: "input",
      name: "folder_name",
      message: "Folder name? 📂",
      default: ".",
      validate(val) {
        const fail = val.match(
          /^(?:aux|con|clock\$|nul|prn|com[1-9]|lpt[1-9])$/i
        );
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
  .then(async ({ package_manager, folder_name }: Answers) => {
    let status_text: string = get_random([
      "shopping github files 🛒",
      "cloning repository 🐑 🧬",
      "files getting ready for you 👕",
    ]);

    spinner.start(status_text);

    await execp(`git clone ${git_repo_url} ${folder_name}`);

    spinner.color = "yellow";
    status_text = get_random([
      "feeding dependencies to node_modules 🥗",
      "playing ping pong 🏓 with peer dependencies",
    ]);
    spinner.text = status_text;

    await Promise.all([
      rimrafp(`${folder_name}/.git`),
      execp(
        `${folder_name === "." ? "" : `cd ${folder_name} &&`} ${
          package_manager === "pnpm"
            ? "pnpm i"
            : package_manager === "yarn"
            ? "yarn"
            : "npm i"
        }`
      ),
    ]);

    spinner.succeed(chalk.blueBright("Happy hacking ✨"));
  })
  .catch((error) => {
    spinner.fail("uh oh 🙈");
    if (error.isTtyError) {
      console.error(`Prompt couldn't be rendered in the current environment`);
    } else {
      console.error(error);
    }
  });
