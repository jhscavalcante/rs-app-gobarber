const moment = require('moment')
const { Op } = require('sequelize')
const { Appointment, User } = require('../models')

class ScheduleController {

  async index (req, res) {    
    return res.render('schedule/index')
  }

  async list (req, res) {

    const date = moment(parseInt(req.query.date))
    
    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.session.user.id,
        date: {
          [Op.between]: [
            date.startOf('day').format(),
            date.endOf('day').format()
          ]
        }
      },
      include: [{ model: User, as: 'user' }]
    })    

    return res.render('schedule/list', { appointments })
  }

}

module.exports = new ScheduleController()