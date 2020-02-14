import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';

class DeliveriesEndConstroller {
  async update(req, resp) {
    const { id_deliverman, id_delivery } = req.body;

    const deliveryman = await Deliveryman.findByPk(id_deliverman);

    if (!deliveryman) {
      return resp.status(400).json({ error: 'Deliveryman not found' });
    }

    const delivery = await Delivery.findOne({
      where: {
        id: id_delivery,
        deliveryman_id: id_deliverman,
        canceled_at: null,
        end_date: null,
      },
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
      ],
    });

    if (!delivery) {
      return resp.status(400).json({ error: 'Delivery not found' });
    }
    if (!delivery.start_date) {
      return resp.status(400).json({ error: 'Delivery not started' });
    }

    if (!delivery.signture_id) {
      return resp.status(400).json({ error: 'A signature must be sent' });
    }

    delivery.update({
      end_date: new Date(),
    });
    delivery.save();
    return resp.json(delivery);
  }
}

export default new DeliveriesEndConstroller();
