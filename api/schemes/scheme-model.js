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

async function findSteps(scheme_id) {
  /*
      SELECT
        st.step_id,
        st.step_number,
        instructions,
        sc.scheme_name,
      FROM schemes as sc
      LEFT JOIN steps as st
        ON sc.scheme_id = st.scheme_id
      WHERE sc.scheme_id = 1
      ORDER BY st.step_number ASC;
  */

    const rows = await db('schemes as sc')
        .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
        .select('st.step_id', 'st.step_number', 'instructions', 'sc.scheme_name')
        .where('sc.scheme_id', scheme_id)
        .orderBy('st.step_number', 'ASC')
    if (!rows[0].step_id) return []

    return rows
}

async function add(scheme) {
    // INSERT INTO scheme (scheme_name) values ('Random name')
    const [scheme_id] = await db('schemes').insert(scheme)
    return db('schemes').where('scheme_id', scheme_id).first()
}

async function addStep(scheme_id, step) {
    return db('steps').insert({
        ...step,
        scheme_id
    })
        .then(() => {
            return db('steps as st')
                .join('schemes as sc', 'sc.scheme_id', 'st.scheme_id')
                .select('step_id', 'step_number', 'instructions', 'scheme_name')
                .orderBy('step_number')
                .where('sc.scheme_id', scheme_id)
        })
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
}
