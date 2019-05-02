const moment = require('moment')
const { Op } = require('sequelize')
const { Appointment } = require('../models')

class AvailableController {
  async index (req, res) {
    const date = moment(parseInt(req.query.date))

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.params.provider,
        date: {
          [Op.between]: [
            date.startOf('day').format(),
            date.endOf('day').format()
          ]
        }
      }
    })

    const schedule = [
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00'
    ]

    const available = schedule.map(time => {
      // cria as variáveis hour e minute setando os valores do split
      const [hour, minute] = time.split(':')
      // cria a data no formato 'yyyy-mm-dd hh:mm:ss', sendo que o segundo sempre será (0) zero
      const value = date
        .hour(hour)
        .minute(minute)
        .second(0)

      // time: hh:mm
      // value: dd/mm/yyyy hh:mm
      // available:
      //    (value.isAfter(moment())) => se a hora do schedule é maior que a hora atual
      //    !appointments.find(a => moment(a.date).format('HH:mm') === time) => se a hora
      //          do banco não é igual a hora do time (schedule), ou seja,
      //          verifica se já tem um agendamento naquele horário
      return {
        time,
        value: value.format(),
        available:
          value.isAfter(moment()) &&
          !appointments.find(a => moment(a.date).format('HH:mm') === time)
      }
    })

    return res.render('available/index', { available })
  }
}

module.exports = new AvailableController()
