import { Controller } from '@nestjs/common'
import { IpcHandle } from '@doubleshot/nest-electron'
import { AppService } from './app.service'
import { Payload } from '@nestjs/microservices'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ) { }

  @IpcHandle('device-scale-factor')
  getDeviceScaleFactor() {
    return this.appService.getScaleFactor()
  }

  @IpcHandle('save-image')
  saveImage(@Payload() image: string) {
    return this.appService.saveImageToFile(image)
  }
}
