declare global {
  interface Window {
    electron: {
      useZoomFactor(): { update: () => Promise<void> }
      saveImageToFile(image: string): Promise<any>
    },
    isElectron: boolean
  }
}

export { }