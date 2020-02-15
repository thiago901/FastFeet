import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

class DeliveryController {
  async store(req, resp) {
    const { recipient_id, deliveryman_id, product } = req.body;

    const deliverymanExist = await Deliveryman.findByPk(deliveryman_id);
    const recipientExist = await Recipient.findByPk(recipient_id);
    if (!deliverymanExist) {
      return resp.status(400).json({ error: 'Deliveryman not found' });
    }
    if (!recipientExist) {
      return resp.status(400).json({ error: 'Recipient not found' });
    }

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
