import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions } from '@nestjs/microservices'
import { app } from 'electron'
import { ElectronIpcTransport } from '@doubleshot/nest-electron'
import { AppModule } from './app.module'

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

async function electronAppInit() {
  const isDev = !app.isPackaged
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
      app.quit()
  })

  if (isDev) {
    if (process.platform === 'win32') {
      process.on('message', (data) => {
        if (data === 'graceful-exit')
          app.quit()
      })
    }
    else {
      process.on('SIGTERM', () => {
        app.quit()
      })
    }
  }

  await app.whenReady()
}

async function bootstrap() {
  try {
    await electronAppInit()

    const nestApp = await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      {
        strategy: new ElectronIpcTransport(),
      },
    )

    await nestApp.listen()
  }
  catch (error) {
    app.quit()
  }
}

bootstrap()

