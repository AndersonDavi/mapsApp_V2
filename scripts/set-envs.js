const { writeFileSync, mkdirSync } = require("fs");
require("dotenv").config();
const targetPath = "./src/environments/environments.ts";

const envFileContent = `
export const environment = {
  MAP_BOX_KEY: "${process.env["MAP_BOX_KEY"]}",
};
`;

mkdirSync("./src/environments", { recursive: true });
writeFileSync(targetPath, envFileContent);
