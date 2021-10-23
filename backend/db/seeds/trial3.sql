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
    'Oceania'
)

INSERT INTO
questions (region_id, question, difficulty)
VALUES
  (
    1
    'What is the capital city of Canada?',
    'easy'
  ),
  (
    1
    'What is the capital city of USA?',
    'easy'
  ),
  (
    1
    'What is the capital city of Canada?',
    'easy'
  )

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
  )
    (
    2,
    'Washington DC',
    false
  ),
    (
    2,
    'Ottawa',
    true
  ),
    (
    2,
    'Toronto',
    false
  ),
    (
    2,
    'Los Angeles',
    false
  )