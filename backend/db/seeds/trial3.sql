INSERT INTO regions (name) VALUES
(
    -- 1
    'North America'
),
(
    -- 2
    'South America'
),
(
    -- 3
    'Europe'
),
(
    -- 4
    'Asia'
),
(
    -- 5
    'Africa'
),
(
    -- 6
    'Australia'
);

INSERT INTO questions (region_id, question, difficulty)
VALUES
  (
    1,
    'What is the capital city of Canada?',
    'easy'
  ),
(
    2,
    'Alaska is part of what country?',
    'easy'
  ),
  (
    3,
    'Which is the largest country in North America? (by size)',
    'easy'
  ),
  (
    1,
    'What is the capital city of USA?',
    'easy'
  );

INSERT INTO
answers (question_id, answer, correct)
VALUES
  (
    1,
    'Washington DC',
    false
  ),
    (
    1,
    'Ottawa',
    true
  ),
    (
    1,
    'Toronto',
    false
  ),
    (
    1,
    'Los Angeles',
    false
  ),
  (
    2,
    'United States of America',
    true
  ),
  (
    2,
    'Canada',
    false
  ),
  (
    2,
    'Artic Circle',
    false
  ),
  (
    2,
    'Greenland',
    false
  ),
  (
    3,
    'United States of America',
    false
  ),
  (
    3,
    'Mexico',
    false
  ),
  (
    3,
    'Canada',
    true
  ),
  (
    3,
    'Greenland',
    false
  ),
  (
    4,
    'Ottawa',
    false
  ),
  (
    4,
    'New York City',
    false
  ),
  (
    4,
    'Seattle',
    true
  ),
  (
    4,
    'Massachussets',
    false
  );



INSERT INTO
gamers(name)
VALUES
    ('Mario'),
    ('Luigi');

INSERT INTO games (user_id, name, score) VALUES
  (1, 'Mario', 3000),
  (2, 'Luigi', 5000)