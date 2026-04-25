# AsyncAPI 3.0 Examples

This file contains a set of AsyncAPI 3.0 examples intended as one-shot references — paste one of these into your LLM context to ground it in correct, up-to-date AsyncAPI syntax before asking it to generate or modify a spec.

These examples use AsyncAPI 3.0.0. If you are using an older version, see the [migration guide](https://www.asyncapi.com/docs/migration/migrating-to-v3).

---

## Important changes in 3.0

If you've used AsyncAPI 2.x before, the main things to know:

- `publish` and `subscribe` are replaced by `action: send` and `action: receive` inside `operations`.
- Operations are now a separate top-level field, not nested inside channels.
- Channel names are identifiers; the actual broker address goes in `address`.
- Messages are defined under `channels`, not under operations directly.

---

## Example 1: User signup event (MQTT)

A service that sends a `userSignedUp` event whenever a new user registers.

```yaml
asyncapi: 3.0.0

info:
  title: User Service
  version: 1.0.0
  description: Publishes user lifecycle events.

servers:
  production:
    host: mqtt.example.com:1883
    protocol: mqtt
    description: Production MQTT broker

channels:
  userSignedUp:
    address: user/signedup
    messages:
      userSignedUpMessage:
        payload:
          type: object
          required:
            - id
            - email
          properties:
            id:
              type: string
              format: uuid
              description: Unique identifier for the user.
            email:
              type: string
              format: email
            createdAt:
              type: string
              format: date-time

operations:
  sendUserSignedUp:
    action: send
    channel:
      $ref: '#/channels/userSignedUp'
    messages:
      - $ref: '#/channels/userSignedUp/messages/userSignedUpMessage'
```

---

## Example 2: Order processing (Kafka)

A service that receives order events from a Kafka topic and sends a confirmation back.

```yaml
asyncapi: 3.0.0

info:
  title: Order Service
  version: 2.0.0
  description: Processes incoming orders and emits confirmation events.

servers:
  production:
    host: kafka.example.com:9092
    protocol: kafka

channels:
  orderReceived:
    address: orders.incoming
    description: Incoming orders from the checkout service.
    messages:
      orderMessage:
        payload:
          type: object
          required:
            - orderId
            - customerId
            - totalAmount
          properties:
            orderId:
              type: string
            customerId:
              type: string
            totalAmount:
              type: number
              format: float
            items:
              type: array
              items:
                type: object
                properties:
                  sku:
                    type: string
                  quantity:
                    type: integer

  orderConfirmed:
    address: orders.confirmed
    description: Confirmation events sent after an order is processed.
    messages:
      confirmationMessage:
        payload:
          type: object
          properties:
            orderId:
              type: string
            status:
              type: string
              enum:
                - confirmed
                - rejected
            processedAt:
              type: string
              format: date-time

operations:
  receiveOrder:
    action: receive
    channel:
      $ref: '#/channels/orderReceived'
    messages:
      - $ref: '#/channels/orderReceived/messages/orderMessage'

  sendConfirmation:
    action: send
    channel:
      $ref: '#/channels/orderConfirmed'
    messages:
      - $ref: '#/channels/orderConfirmed/messages/confirmationMessage'
```

---

## Example 3: IoT sensor readings (AMQP)

A sensor service that streams temperature readings. Shows how to use `components` to keep the document tidy.

```yaml
asyncapi: 3.0.0

info:
  title: Sensor Service
  version: 1.0.0
  description: Streams temperature readings from IoT sensors.

servers:
  production:
    host: amqp.example.com:5672
    protocol: amqp
    description: Production RabbitMQ broker

channels:
  temperatureReading:
    address: 'sensors.{sensorId}.temperature'
    parameters:
      sensorId:
        $ref: '#/components/parameters/sensorId'
    messages:
      readingMessage:
        $ref: '#/components/messages/TemperatureReading'

operations:
  sendTemperatureReading:
    action: send
    channel:
      $ref: '#/channels/temperatureReading'
    messages:
      - $ref: '#/channels/temperatureReading/messages/readingMessage'

components:
  messages:
    TemperatureReading:
      summary: A temperature reading from a sensor.
      payload:
        type: object
        required:
          - sensorId
          - value
          - unit
        properties:
          sensorId:
            type: string
          value:
            type: number
            description: The temperature value.
          unit:
            type: string
            enum:
              - celsius
              - fahrenheit
          recordedAt:
            type: string
            format: date-time

  parameters:
    sensorId:
      description: The unique identifier of the sensor.
```

---

## Common mistakes to avoid

- Do not use `publish` or `subscribe` — these were removed in 3.0.
- Do not define operations inside `channels` — they are a separate top-level object.
- Always set `action` on an operation to either `send` or `receive`.
- Reference messages with `$ref` to avoid duplication, especially across multiple operations.
- The `address` field is separate from the channel key (the channel key is just an identifier).

## Further reading

- [AsyncAPI 3.0 specification](https://www.asyncapi.com/docs/reference/specification/latest)
- [Migration guide from 2.x to 3.0](https://www.asyncapi.com/docs/migration/migrating-to-v3)
- [Adding channels](https://www.asyncapi.com/docs/concepts/asyncapi-document/adding-channels)
- [Adding operations](https://www.asyncapi.com/docs/concepts/asyncapi-document/adding-operations)
