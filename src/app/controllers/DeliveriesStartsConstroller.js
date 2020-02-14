import { Op } from 'sequelize';
import { startOfDay, endOfDay } from 'date-fns';
import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';

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
    delivery.save();
    return resp.json(delivery);
  }
}

export default new DeliveriesStartsConstroller();
