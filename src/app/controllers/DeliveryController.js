import Delivery from '../models/Delivery';

class DeliveryController {
  async store(req, resp) {
    const { recipient_id, deliveryman_id, product } = req.body;

    const delivery = await Delivery.create({
      recipient_id,
      deliveryman_id,
      product,
    });
    return resp.json(delivery);
  }

  async update(req, resp) {
    return resp.json();
  }
}

export default new DeliveryController();
