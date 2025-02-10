const systemfile = 'systemRequire.txt';

var os = require('os');
const fs = require('fs').promises;
async function getOsInfo() {
    return {
        platform: os.platform(),
        release: os.release(),
        type: os.type(),
        arch: os.arch(),
        cpuCount: os.cpus().length,
        totalMemory: os.totalmem(),
        freeMemory: os.freemem(),
        homedir: os.homedir(),
        uptime: os.uptime(),
        loadavg: os.loadavg(),
        networkInterfaces: os.networkInterfaces(),
        tmpdir: os.tmpdir()
    };
}

// Function to write the OS information to a file
async function writeOsInfoToFile(systemfile) {
    try {
        // Get OS information
        const osInfo = await getOsInfo();

        // Convert the information to a readable string format
        const osInfoString = `
Operating System Information:
-----------------------------
Platform: ${osInfo.platform}
Release: ${osInfo.release}
Type: ${osInfo.type}
Architecture: ${osInfo.arch}
CPU Count: ${osInfo.cpuCount}
Total Memory: ${osInfo.totalMemory} bytes
Free Memory: ${osInfo.freeMemory} bytes
Home Directory: ${osInfo.homedir}
Uptime: ${osInfo.uptime} seconds
Load Average: ${osInfo.loadavg.join(', ')}
Network Interfaces: ${JSON.stringify(osInfo.networkInterfaces, null, 2)}
Temporary Directory: ${osInfo.tmpdir}
`;

        // Write the information to a file asynchronously
        await fs.writeFile(systemfile, osInfoString);
        console.log('Operating System information saved to', systemfile);
    } catch (error) {
        console.error('Error writing to file:', error);
    }
}

 writeOsInfoToFile(systemfile);