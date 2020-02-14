import { Op } from 'sequelize';
import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';

class DeliveriesCompletedConstroller {
  async index(req, resp) {
    const { id } = req.params;
    const deliveryman = await Deliveryman.findByPk(id);
    if (!deliveryman) {
      return resp.status(400).json({ error: 'Deliveryman not found' });
    }

    const delivery = await Delivery.findAll({
      where: {
        deliveryman_id: id,
        canceled_at: {
          [Op.eq]: null,
        },
        end_date: {
          [Op.ne]: null,
        },
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

    return resp.json(delivery);
  }
}

export default new DeliveriesCompletedConstroller();
