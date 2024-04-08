import { defineConfig } from "@doubleshot/runner"

export default defineConfig({
  run: [
    {
      cwd: 'packages/frontend',
      name: 'renderer',
      prefixColor: 'blue',
      commands: {
        dev: 'npm run dev',
        build: 'npm run build'
      }
    },
    {
      cwd: 'packages/backend',
      name: 'electron',
      prefixColor: 'green',
      commands: {
        dev: {
          command: 'npm run dev',
          killOthersWhenExit: true
        },
        build: 'npm run build'
      }
    }
  ],
  electronBuild: {
    projectDir: 'packages/backend',
    commandName: 'build',
    config: 'electron-builder.config.js'
  }
})