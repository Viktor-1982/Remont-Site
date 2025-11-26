/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Postinstall script to ensure native binaries are installed on Linux
 * This fixes Vercel build issues where optional dependencies might not be installed
 */

const { execSync } = require('child_process');
const os = require('os');

const platform = os.platform();
const arch = os.arch();

// Only install on Linux (Vercel uses Linux)
if (platform === 'linux' && arch === 'x64') {
    const packages = [
        'lightningcss-linux-x64-gnu@latest',
        '@tailwindcss/oxide-linux-x64-gnu@latest',
    ];

    for (const pkg of packages) {
        try {
            console.log(`Installing ${pkg} for Linux platform...`);
            execSync(`npm install --no-save ${pkg}`, {
                stdio: 'inherit',
                cwd: process.cwd(),
            });
            console.log(`✅ ${pkg} installed successfully`);
        } catch (error) {
            console.warn(`⚠️  Failed to install ${pkg}:`, error.message);
            // Don't fail the build if this fails
        }
    }
} else {
    console.log(`Skipping native binary installation (platform: ${platform}, arch: ${arch})`);
}
