import chalk from "chalk";
import figlet from "figlet";

export const git_repo_url = "https://github.com/heyayushh/node.ts.git";

export function get_random(list: Array<any>): any {
  return list[Math.floor(Math.random() * list.length)];
}

export const theme = {
  colors: ["#DCDCAA", "#4EC9B0", "#C586C0", "#9CDCFE", "#CE9178"],
  background: "#000000",
  foreground: "#FFFFFF",
};

export const ascii = () => {
  let coloredData = "";
  let colorsIndex = 0;
  let data;

  try {
    data = figlet.textSync("nd.ts", {
      font: "Slant Relief",
      horizontalLayout: "default",
      verticalLayout: "default",
    });
  } catch (error) {
    return error;
  }

  for (var i = 0; i < data.length; i++) {
    var character = data.charAt(i);
    if (character !== "_") {
      if (
        data.charAt(i - 1) == "_" ||
        data.charAt(i - 1) == " " ||
        data.charAt(i - 1) == "."
      ) {
        colorsIndex++;
        if (colorsIndex >= theme.colors.length) {
          colorsIndex = 0;
        }
      }
      coloredData += chalk
        .hex(theme.colors[colorsIndex])
        .bgHex(theme.background)(data.charAt(i));
    } else {
      coloredData += chalk.hex(theme.foreground).bgHex(theme.background)(
        data.charAt(i)
      );
    }
  }
  return coloredData;
};
