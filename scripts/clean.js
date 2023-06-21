var sh = require("shelljs");
var path = require("path");

sh.cd(path.resolve(__dirname, ".."));

sh.rm("-rf", "dist");

sh.mkdir("dist");
