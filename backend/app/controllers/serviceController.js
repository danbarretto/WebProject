const express = require('express')
const Service = require('../models/service')
const Client = require('../models/client')
const ClientPet = require('../models/clientPet')
const Earning = require('../models/earning')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
router.use(authMiddleware)

router.post('/add', async (req, res) => {
  try {
    const { clientCpf, clientPetName, date, serviceType, value } = req.body
    if (
      date === null ||
      serviceType === '' ||
      clientCpf === '' ||
      clientPetName === ''
    )
      return res.status(400).send({ error: 'Preencha todos os campos!' })

    const service = await Service.create(req.body)
    if (!service)
      return res.status(400).send({ error: 'Erro ao criar serviço!' })

    const earning = await Earning.create({
      originId: service.id,
      type: 'Serviço',
      name: serviceType,
      quantity: 1,
      value: parseFloat(value),
    })
    if (!earning)
      return res.status(400).send({ error: 'Erro ao criar faturamento' })
    return res.sendStatus(200)
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: 'Erro ao cadastrar serviço!' })
  }
})

router.post('/clientPet', async (req, res) => {
  try {
    const { cpf } = req.body
    const client = await Client.findOne({ cpf })
    if (!client)
      return res.status(400).send({ error: 'Cliente não encontrado' })
    const petIds = await client.get('pets')
    const pets = await ClientPet.find({
      _id: { $in: await petIds },
    })
    if (!pets) return res.status(400).send({ error: 'Cliente não possui pets' })
    const petNames = pets.map((pet) => {
      return pet.name
    })
    return res.send(petNames)
  } catch (err) {
    return res
      .status(400)
      .send({ error: 'Erro ao procurar pets do cliente! ' + err })
  }
})

router.post('/getByDate', async (req, res) => {
  try {
    let { date } = req.body
    date = new Date(date)
    let dateEnd = new Date(date)
    dateEnd.setHours(23, 59, 59)
    const service = await Service.find({ date: { $gte: date, $lt: dateEnd } })
    return res.send(service)
  } catch (err) {
    return res.send(400).send({ error: 'Erro ao carregar serviços: ' + err })
  }
})

router.post('/getFreeSlots', async (req, res) => {
  try {
    let { date } = req.body
    date = new Date(date)
    let dateEnd = new Date(date)
    dateEnd.setHours(23, 59, 59)
    const services = await Service.find({ date: { $gte: date, $lt: dateEnd } })
    let freeSlots = []
    const now = new Date()
    for (let i = 8; i < 18; i++) {
      if (date.toDateString() === now.toDateString())
        freeSlots.push({
          hour: i,
          free: now.getHours() < i,
          petName: '-',
          clientName: '-',
          serviceType:'-'
        })
      else
        freeSlots.push({
          hour: i,
          free: true,
          petName: '-',
          clientName: '-',
          serviceType: '-',
        })
    }

    for (service of services) {
      const time = new Date(service.date).getHours()
      const client = await Client.findOne({ cpf: service.clientCpf })
      if (time >= 8 && time <= 17) {
        freeSlots[time - 8] = {
          hour: time,
          free: false,
          petName: service.clientPetName,
          clientName: client.name,
          serviceType: service.serviceType,
        }
      }
    }
    return res.send({ freeSlots })
  } catch (err) {
    return res.status(400).send({ error: 'Erro ao carregar horários ' + err })
  }
})

router.delete('/remove', async (req, res) => {
  try {
    const { id } = req.body
    await Service.findByIdAndDelete(id)
    return res.sendStatus(200)
  } catch (err) {
    return res.status(400).send({ error: 'Erro ao deletar serviço: ' + err })
  }
})

router.post('/update', async (req, res) => {
  try {
    const { id, serviceType, clientCpf, clientPetName } = req.body
    const service = await Service.findByIdAndUpdate(id, {
      serviceType,
      clientCpf,
      clientPetName,
    })
    if (!service)
      return res.status(400).send({ error: 'Serviço não encontrado!' })
    return res.sendStatus(200)
  } catch (err) {
    return res.status(400).send({ error: 'Erro ao atualizar serviço: ' + err })
  }
})

module.exports = (app) => app.use('/service', router)
