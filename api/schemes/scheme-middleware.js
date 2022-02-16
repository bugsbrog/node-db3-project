const Schemes = require('./scheme-model')
const db = require('../../data/db-config')

const checkSchemeId = async (req, res, next) => {
  const { scheme_id } = req.params
    try {
    // WHY DOES IT HAVE TO BE DONE THIS WAY?!
      const scheme = await db('schemes')
          .where('scheme_id', scheme_id)
          .first()
        if (!scheme) {
          next({
            status: 404,
            message: `scheme with scheme_id ${scheme_id} not found`
          })
        } else {
          next()
        }
    } catch (err) {
        next(err)
    }
}

const validateScheme = async (req, res, next) => {
  const { scheme_name } = req.body
    try {
      if (!scheme_name || typeof scheme_name !== 'string' || !scheme_name.trim()) {
        next({
          status: 400,
          message: 'invalid scheme_name'
        })
      } else {
        next()
      }
    } catch (err) {
        next(err)
    }
}

const validateStep = async (req, res, next) => {
  const { instructions, step_number } = req.body
    try {
      if (!instructions || typeof instructions !== 'string' || !instructions.trim() || typeof step_number !== 'number' || step_number < 1) {
        next({
          status: 400,
          message: 'invalid step'
        })
      } else {
          next()
      }
    } catch (err) {
        next(err)
    }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
