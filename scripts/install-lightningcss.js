/**
 * Postinstall script to ensure lightningcss native binary is installed on Linux
 * This fixes Vercel build issues where optional dependencies might not be installed
 */

const { execSync } = require('child_process');
const os = require('os');
const fs = require('fs');
const path = require('path');

const platform = os.platform();
const arch = os.arch();

// Only install on Linux (Vercel uses Linux)
if (platform === 'linux' && arch === 'x64') {
    try {
        console.log('Installing lightningcss-linux-x64-gnu for Linux platform...');
        execSync('npm install --no-save lightningcss-linux-x64-gnu@latest', {
            stdio: 'inherit',
            cwd: process.cwd(),
        });
        console.log('✅ lightningcss-linux-x64-gnu installed successfully');
    } catch (error) {
        console.warn('⚠️  Failed to install lightningcss-linux-x64-gnu:', error.message);
        // Don't fail the build if this fails
    }
} else {
    console.log(`Skipping lightningcss installation (platform: ${platform}, arch: ${arch})`);
}

