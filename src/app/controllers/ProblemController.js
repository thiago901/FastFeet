import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';

class ProblemController {
  async delete(req, resp) {
    const { id_problem } = req.params;

    const problem = await DeliveryProblem.findOne({
      where: { id: id_problem },
    });

    const delivery = await Delivery.findOne({
      where: { id: problem.delivery_id },
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['name', 'street', 'cep'],
        },
      ],
    });

    delivery.update({
      canceled_at: new Date(),
    });
    await delivery.save();
    await Queue.add(CancellationMail.key, {
      problem,
      delivery,
    });

    return resp.json(delivery);
  }
}

export default new ProblemController();
