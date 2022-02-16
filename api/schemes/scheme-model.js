const db = require('../../data/db-config')

async function find() {
  /*
    What happens if we change from a LEFT join to an INNER join?
    Gets rid of scheme_id 7

      SELECT
          sc.*,
          count(st.step_id) as number_of_steps
      FROM schemes as sc
      LEFT JOIN steps as st
          ON sc.scheme_id = st.scheme_id
      GROUP BY sc.scheme_id
      ORDER BY sc.scheme_id ASC;
  */

    const rows = await db('schemes as sc')
        .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
        .select('sc.*')
        .count('st.step_id as number_of_steps')
        .groupBy('sc.scheme_id')
        .orderBy('sc.scheme_id', 'ASC')
    return rows
}

async function findById(scheme_id) {
  /*
      SELECT
          sc.scheme_name,
          st.*
      FROM schemes as sc
      LEFT JOIN steps as st
          ON sc.scheme_id = st.scheme_id
      WHERE sc.scheme_id = 1
      ORDER BY st.step_number ASC;
   */

    const rows = await db('schemes as sc')
        .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
        .select('sc.scheme_name', 'st.*')
        .where('sc.scheme_id', scheme_id)
        .orderBy('st.step_number', 'ASC')

    const result = {
        scheme_id: rows[0].scheme_id,
        scheme_name: rows[0].scheme_name,
        steps: rows[0].step_id
            ? rows.map(row => ({ step_id: row.step_id, step_number: row.step_number, instructions: row.instructions }))
            : []
    }

    return result
}

function findSteps(scheme_id) { // EXERCISE C
  /*
    1C- Build a query in Knex that returns the following data.
    The steps should be sorted by step_number, and the array
    should be empty if there are no steps for the scheme:

      [
        {
          "step_id": 5,
          "step_number": 1,
          "instructions": "collect all the sheep in Scotland",
          "scheme_name": "Get Rich Quick"
        },
        {
          "step_id": 4,
          "step_number": 2,
          "instructions": "profit",
          "scheme_name": "Get Rich Quick"
        }
      ]
  */
}

function add(scheme) { // EXERCISE D
  /*
    1D- This function creates a new scheme and resolves to _the newly created scheme_.
  */
}

function addStep(scheme_id, step) { // EXERCISE E
  /*
    1E- This function adds a step to the scheme with the given `scheme_id`
    and resolves to _all the steps_ belonging to the given `scheme_id`,
    including the newly created one.
  */
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
}
