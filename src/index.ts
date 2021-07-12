import { exec } from "child_process";
import { promisify } from "util";

const execp = promisify(exec);
execp('').then((stats) => {
  // Do something with `stats`
  
}).catch((error) => {
  // Handle the error.
});

exec("cat *.js bad_file | wc -l", (err, stdout, stderr) => {
  if (err) {
    // node couldn't execute the command
    return;
  }

  // the *entire* stdout and stderr (buffered)
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});
