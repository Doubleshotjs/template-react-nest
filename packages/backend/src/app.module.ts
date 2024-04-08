import { join } from 'path'
import { Module } from '@nestjs/common'
import { ElectronModule } from '@doubleshot/nest-electron'
import { BrowserWindow, app } from 'electron'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [ElectronModule.registerAsync({
    useFactory: async () => {
      const isDev = !app.isPackaged
      const win = new BrowserWindow({
        width: 1200,
        height: 800,
        autoHideMenuBar: true,
        webPreferences: {
          contextIsolation: true,
          preload: join(__dirname, 'preload.js')
        }
      })

      win.on('closed', () => {
        win.destroy()
      })

      const URL = isDev
        ? process.env.DS_RENDERER_URL
        : `file://${join(app.getAppPath(), 'frontend/index.html')}` // depends on electron-builder.config.js

      win.loadURL(URL)

      return { win }
    },
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
