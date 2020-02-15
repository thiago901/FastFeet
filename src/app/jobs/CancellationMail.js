import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { delivery, problem } = data;
    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: 'Transporte cancelado',
      template: 'cancellation',
      context: {
        deliverman: delivery.deliveryman.name,
        client: delivery.recipient.name,
        street: delivery.recipient.street,
        cep: delivery.recipient.cep,
        description: problem.description,
      },
    });
  }
}

export default new CancellationMail();
