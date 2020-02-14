import DeliveryProblem from '../models/DeliveryProblem';

class DeliveryProblemController {
  async store(req, resp) {
    const { delivery_id } = req.params;
    const { description } = req.body;

    const deliveryProblem = await DeliveryProblem.create({
      delivery_id,
      description,
    });
    return resp.json(deliveryProblem);
  }

  async index(req, resp) {
    const { delivery_id } = req.params;

    const deliveryProblem = await DeliveryProblem.findAll({
      where: { delivery_id },
    });
    return resp.json(deliveryProblem);
  }
}

export default new DeliveryProblemController();
