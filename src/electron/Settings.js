const Process = require('process');
let Params = {
    Verbose: false
};
const CLIVersion = '0.0.4';
const OS = (Process.platform === 'win32') ? 'win' : 'unix';

module.exports = { Params, CLIVersion, OS };