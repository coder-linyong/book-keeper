export function downloadJSON<T extends {}> (data: T, fileName: string) {
  const a = document.createElement('a')
  a.download = `${fileName}.json`
  a.href = URL.createObjectURL(new Blob([JSON.stringify(data)]))
  a.click()
}

export function copyToClipboard (text: string) {
  if (!navigator.clipboard) {
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.left = '-999px'
    textArea.style.top = '-999px'
    textArea.style.position = 'fixed'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    return
  }
  navigator.clipboard.writeText(text)
}

export function readFile (file: File | Blob, onProgress?: (progress: number) => void): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsText(file)
    fileReader.addEventListener('load', () => {
      resolve(fileReader.result as string)
    })
    onProgress && fileReader.addEventListener('progress', ({
      loaded,
      total,
      lengthComputable
    }) => {
      lengthComputable && onProgress(loaded * 100 / total)
    })
    fileReader.addEventListener('error', e => reject(e))
  })
}