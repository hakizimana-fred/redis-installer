const os = require("os");
const { exec } = require("child_process");

const COMMANDS = {
  update: "sudo apt-get update",
  install: "sudo apt-get install redis-server -y",
};

// main function
// this function will call both update function and installRedis function
// update function, updates our system before installation
function main() {
  // check platform
  const platform = os.platform();
  if (platform === "linux") {
    update()
      .then((data) => {
        console.log(data.stdout);
        // install Redis after update
        installRedis()
          .then((data) => {
            console.log(data.stdout);
            console.log(data.stderr);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log("platform not supported for now");
  }
}

function update() {
  return new Promise((resolve, reject) => {
    exec(COMMANDS.update, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

function installRedis() {
  return new Promise((resolve, reject) => {
    exec(COMMANDS.install, (error, stdout, stderr) => {
      if (error) {
        console.log(error, "error");
        reject(error);
      } else {
        console.log(stdout, "stdout");
        resolve({ stdout, stderr });
      }
    });
  });
}

main();
