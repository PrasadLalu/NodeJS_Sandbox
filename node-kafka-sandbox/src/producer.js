const kafka = require('./setup');
const { faker } = require('@faker-js/faker');

const produce = async () => {
  const producer = kafka.producer();
  await producer.connect();

  const totalMessages = 1000;
  const batchSize = 10;

  for (let i = 0; i < totalMessages; i += batchSize) {
    const messages = Array.from({ length: batchSize }).map(() => {
      const user = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        country: faker.location.country(),
      };
      return { value: JSON.stringify(user) };
    });

    await producer.send({
      topic: 'test-topic',
      messages,
    });

    console.log(`✅ Sent batch ${i / batchSize + 1}`);
  }

  await producer.disconnect();
  console.log("🚀 All messages sent");
};

produce().catch(console.error);
