import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';

class ProblemController {
  async delete(req, resp) {
    const { id_problem } = req.params;

    const problem = await DeliveryProblem.findOne({
      where: { id: id_problem },
    });

    const delivery = await Delivery.findOne({
      where: { id: problem.delivery_id },
    });

    delivery.update({
      canceled_at: new Date(),
    });
    await delivery.save();

    return resp.json(delivery);
  }
}

export default new ProblemController();
