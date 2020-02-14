import Signature from '../models/Signature';
import Delivery from '../models/Delivery';

class SignatureController {
  async store(req, resp) {
    const { originalname: name, filename: path } = req.file;
    const { id } = req.params;

    const signature = await Signature.create({
      name,
      path,
    });

    console.log('---------signature.id---------');
    console.log(signature.id);

    const delivery = await Delivery.findByPk(id);

    await delivery.update({
      signture_id: signature.id,
    });
    await delivery.save();
    return resp.json(delivery);
  }
}

export default new SignatureController();
