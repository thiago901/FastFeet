import { Op } from 'sequelize';
import { startOfDay, endOfDay, getHours } from 'date-fns';
import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';
import Queue from '../../lib/Queue';

import RegisteredMail from '../jobs/RegisteredMail';

class DeliveriesStartsConstroller {
  async update(req, resp) {
    const { id_deliverman, id_delivery } = req.body;
    const deliveryman = await Deliveryman.findByPk(id_deliverman);
    const date = new Date();

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

    if (getHours(date) < 8 || getHours(date) >= 18) {
      return resp
        .status(400)
        .json({ error: 'The pick-up time is from 08:00 to 18:00' });
    }

    const countDelivery = await Delivery.count({
      where: {
        deliveryman_id: id_deliverman,
        end_date: {
          [Op.between]: [startOfDay(date), endOfDay(date)],
        },
      },
    });

    if (countDelivery >= 5) {
      return resp
        .status(400)
        .json({ error: 'Deliveryman has already made 5 withdrawals' });
    }

    delivery.update({
      start_date: new Date(),
    });
    await delivery.save();

    await Queue.add(RegisteredMail.key, {
      delivery,
    });

    return resp.json(delivery);
  }
}

export default new DeliveriesStartsConstroller();
