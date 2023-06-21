var sh = require('shelljs');
var os = require('os');
var path = require('path');

sh.cd(path.resolve(__dirname, '..'));

switch (os.type().toLowerCase()) {
    case 'linux':
        sh.exec('google-chrome http://localhost:9000/');
        break;
    case 'windows_nt':
        sh.exec('start http://localhost:9000/');
        break;
    case 'darwin':
        sh.exec('open http://localhost:9000/');
        break;
}
