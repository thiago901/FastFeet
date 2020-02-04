import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, resp) {
    // modelo de validação dos dados da requisição
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return resp.status(400).json({ error: 'validation fails' });
    }
    const { email } = req.body;

    const userExist = await User.findOne({ where: { email: req.body.email } });

    if (userExist) {
      return resp.status(400).json({ error: `user already exists` });
    }

    const { id, name } = await User.create(req.body);
    return resp.json({ id, name, email });
  }

  async update(req, resp) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confimPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return resp.status(400).json({ error: `validation fails` });
    }
    const { email, oldPassword } = req.body;
    const user = await User.findByPk(req.userId);

    // eslint-disable-next-line eqeqeq
    if (email && email != user.email) {
      const emailExist = await User.findOne({ where: { email } });
      if (emailExist) {
        return resp.status(401).json({ error: 'Email already exist' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return resp.status(400).json({ error: 'Password not mach' });
    }

    const { id, name } = await user.update(req.body);

    return resp.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
