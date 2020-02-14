import File from '../models/File';

class FileController {
  async store(req, resp) {
    const { originalname: name, filename: path } = req.file;
    const file = await File.create({
      name,
      path,
    });

    return resp.json(file);
  }

  async update(req, resp) {
    const { originalname: name, filename: path } = req.file;
    const { id } = req.params;
    console.log('Procurannndoo.....');
    const file = await File.findByPk(id);
    console.log('Achouuuu');
    console.log(file);

    await file.update({
      name,
      path,
    });

    return resp.json(file);
  }

  async delete(req, resp) {
    const { id } = req.params;
    const file = await File.findByPk(id);
    file.destroy();
    file.save();

    return resp.json(file);
  }
}

export default new FileController();
