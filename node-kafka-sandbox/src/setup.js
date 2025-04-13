const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'node-kafka-app',
  brokers: ['localhost:9092'],
});

module.exports = kafka;