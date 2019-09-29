const faker = require("faker")

const sleep = (t) => new Promise((res) => setTimeout(res, t))

module.exports = {
    ObjectId: () => faker.random.uuid(),
}