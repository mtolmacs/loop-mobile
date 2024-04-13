// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config')

/** @type {import('expo/metro-config').MetroConfig} */
let defaultConfig = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: false,
})

// 2. Enable Tamagui
const { withTamagui } = require('@tamagui/metro-plugin')
const config = withTamagui(defaultConfig, {
  components: ['tamagui'],
  config: './tamagui.config.ts',
  outputCSS: './tamagui-web.css',
})

// 3. Set up API proxying to avoid CORS issues
const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = {
  ...config,
  server: {
    ...config.server,
    enhanceMiddleware: (metroMiddleware, server) => {
      const apiProxy = createProxyMiddleware({
        pathFilter: (path, req) => path.match('api') && req.method === 'GET',
        target: 'https://loop-test-api.azurewebsites.net',
        changeOrigin: true,
      });

      return (req, res, next) => {
        return apiProxy(req, res, () => metroMiddleware(req, res, next));
      };
    },
  }
}

// REMOVE THIS (just for tamagui internal devs to work in monorepo):
// if (process.env.IS_TAMAGUI_DEV && __dirname.includes('tamagui')) {
//   const fs = require('fs')
//   const path = require('path')
//   const projectRoot = __dirname
//   const monorepoRoot = path.resolve(projectRoot, '../..')
//   config.watchFolders = [monorepoRoot]
//   config.resolver.nodeModulesPaths = [
//     path.resolve(projectRoot, 'node_modules'),
//     path.resolve(monorepoRoot, 'node_modules'),
//   ]
//   // have to manually de-deupe
//   try {
//     fs.rmSync(path.join(projectRoot, 'node_modules', '@tamagui'), {
//       recursive: true,
//       force: true,
//     })
//   } catch {}
//   try {
//     fs.rmSync(path.join(projectRoot, 'node_modules', 'tamagui'), {
//       recursive: true,
//       force: true,
//     })
//   } catch {}
//   try {
//     fs.rmSync(path.join(projectRoot, 'node_modules', 'react'), {
//       recursive: true,
//       force: true,
//     })
//   } catch {}
//   try {
//     fs.rmSync(path.join(projectRoot, 'node_modules', 'react-dom'), {
//       recursive: true,
//       force: true,
//     })
//   } catch {}
// }
