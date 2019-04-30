const path = require('path')

class FileController {
  show (req, res) {
    // nome do arquivo
    const { file } = req.params

    // caminho do arquivo
    const filePath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'tmp',
      'uploads',
      file
    )

    return res.sendFile(filePath)
  }
}

module.exports = new FileController()
