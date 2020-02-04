import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, resp) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string().required(),
      state: Yup.string()
        .required()
        .max(2),
      city: Yup.string().required(),
      cep: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return resp.status(400).json({ error: `validation fails` });
    }
    const recipient = await Recipient.create(req.body);
    return resp.json(recipient);
  }

  async update(req, resp) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.number(),
      complement: Yup.string(),
      state: Yup.string().max(2),
      city: Yup.string(),
      cep: Yup.string(),
    });

    if (!schema.isValid(req.body)) {
      return resp.status(400).json({ error: `validation fails` });
    }
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return resp.json({ error: 'recipient not exist' });
    }

    const data = await recipient.update(req.body);

    return resp.json(data);
  }
}

export default new RecipientController();
