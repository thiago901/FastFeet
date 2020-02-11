import Deliveryman from '../models/Deliveryman';

class DeliverymanController {
  async index(req, resp) {
    const deliveryman = await Deliveryman.findAll();
    return resp.json(deliveryman);
  }

  async store(req, resp) {
    const { name, email } = req.body;
    const deliveryman = await Deliveryman.create({
      name,
      email,
    });
    return resp.json(deliveryman);
  }

  async update(req, resp) {
    const { id } = req.params;
    const { name, email } = req.body;
    const deliveryman = await Deliveryman.findByPk(id);
    deliveryman.update({
      name,
      email,
    });
    deliveryman.save();

    return resp.json(deliveryman);
  }

  async delete(req, resp) {
    const { id } = req.params;
    const deliveryman = await Deliveryman.findByPk(id);
    deliveryman.destroy();
    return resp.json(deliveryman);
  }
}

export default new DeliverymanController();
