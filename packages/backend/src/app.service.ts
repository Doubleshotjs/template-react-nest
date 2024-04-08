import { Window } from '@doubleshot/nest-electron'
import { Injectable } from '@nestjs/common'
import { screen, dialog, BrowserWindow } from 'electron'
import fs from "fs"

@Injectable()
export class AppService {
  constructor(
    @Window() private readonly mainWin: BrowserWindow,
  ) { }

  public getScaleFactor(): number {
    const { scaleFactor } = screen.getPrimaryDisplay()
    return scaleFactor
  }

  public async saveImageToFile(image: string) {
    const { canceled, filePath } = await dialog.showSaveDialog(this.mainWin, {
      title: 'Save image',
      defaultPath: 'paint.png',
      filters: [
        { name: 'Images', extensions: ['png', 'jpg', 'jpeg'] },
      ],
    })

    if (canceled) {
      return "canceled"
    }

    // 从 url 形式的 image base64 转换为 buffer
    const buffer = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""), 'base64')
    fs.writeFileSync(filePath, buffer)
    return "success"
  }
}
