export function exportJSON (graphX6, createFile = true) {
  let data1 = graphX6.toJSON()
  debugger
  let data = JSON.stringify(data1)
  debugger
  const name = 'machine'
  if (createFile) {
    downloadFile(data, 'application/xml;charset=utf-8;', `${name}.json`)
  }
}

function downloadFile (data, type, filename) {
  const blob = new Blob([data], {type})
  let link = document.createElement('a')
  if (link.download !== undefined) {
    let url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}
