import Mail from '../../lib/Mail';

class RegisteredMail {
  get key() {
    return 'RegisteredMail';
  }

  async handle({ data }) {
    const { delivery } = data;
    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: 'Transporte registrada',
      template: 'registered',
      context: {
        deliverman: delivery.deliveryman.name,
        product: delivery.product,
      },
    });
  }
}

export default new RegisteredMail();
