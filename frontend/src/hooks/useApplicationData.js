import {
  useEffect,
  useReducer
} from 'react';
import dataReducer, {
  SET_USERS,
  SET_QUESTIONS,
  SET_CONTINENT
} from '../reducers/dataReducers';
import axios from 'axios';

const useApplicationData = () => {
  const [state, dispatch] = useReducer(dataReducer, {
      users: [],
      loading: true,
  });

  const getQuestions = (id) => {
    return axios.get(`/api/questions/${id}`).then((questions) => {
      dispatch({
        type: SET_QUESTIONS,
        questions: questions.data
    });
    });
  };

  const getContinent = (continentName) => {
    return dispatch({
      type: SET_CONTINENT,
      name: continentName.continent,
      id: continentName.id
    })
  }

  useEffect(() => {
      axios({
              method: 'GET',
              url: '/api/users',
          })
          .then(({
              data
          }) => {
              // console.log(data);
              dispatch({
                  type: SET_USERS,
                  users: data
              });
          })
          .catch((err) => console.log(err));
  }, []);

  return {
      state,
      dispatch,
      getQuestions,
      getContinent
  };
};

export default useApplicationData;
