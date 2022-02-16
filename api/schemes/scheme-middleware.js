const Schemes = require('./scheme-model')
const db = require('../../data/db-config')

const checkSchemeId = async (req, res, next) => {
  const { scheme_id } = req.params
    try {
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

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {

}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {

}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
