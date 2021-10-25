module.exports = (db) => {
  const getUsers = () => {
      const query = {
          text: 'SELECT * FROM users',
      };

      return db
          .query(query)
          .then((result) => result.rows)
          .catch((err) => err);
  };

  const getUserByEmail = email => {

      const query = {
          text: `SELECT * FROM users WHERE email = $1` ,
          values: [email]
      }

      return db
          .query(query)
          .then(result => result.rows[0])
          .catch((err) => err);
  }

  const addUser = (firstName, lastName, email, password) => {
      const query = {
          text: `INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *` ,
          values: [firstName, lastName, email, password]
      }

      return db.query(query)
          .then(result => result.rows[0])
          .catch(err => err);
  }

  const getUsersPosts = () => {
      const query = {
          text: `SELECT users.id as user_id, first_name, last_name, email, posts.id as post_id, title, content
      FROM users
      INNER JOIN posts
      ON users.id = posts.user_id`
      }

      return db.query(query)
          .then(result => result.rows)
          .catch(err => err);

  }


  // give it a continent id and it will return an object that has all the questions from that continent from the database
  const getContinentBasedQuestions = (continentId) => {

    const query = {
        text: `SELECT * FROM questions WHERE region_id = $1`,
        values:[continentId]
    }
    return db.query(query)
        .then(questions => questions.rows )
        .catch((err) => err)
  }

  // give it a question id and it will return an object with all answers for that question from the database
  const getQuestionBasedAnswers = (questionId) => {

    const query = {
        text: `SELECT * FROM answers WHERE question_id = $1`,
        values:[questionId]
    }
    return db.query(query)
        .then(answers => answers.rows )
        .catch((err) => err)
  }


  const addGamer = (name) => {
    const query = {
        text: `INSERT INTO gamers (name) VALUES ($1) RETURNING *` ,
        values: [name]
    }

    return db.query(query)
        .then(result => result.rows[0])
        .catch(err => err);
}

const getGamerByName = (name) => {

    const query = {
        text: `SELECT * FROM gamers WHERE name = $1` ,
        values: [name]
    }

    return db
    .query(query)
    .then(result => result.rows[0])
    .catch((err) => err);
}


  return {
      getUsers,
      getUserByEmail,
      addUser,
      getUsersPosts,
      addGamer,
      getContinentBasedQuestions,
      getQuestionBasedAnswers
  };
};
