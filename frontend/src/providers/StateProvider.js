import { createContext, useEffect, useReducer } from "react";
import dataReducer, {
  SET_USERS,
  SET_QUESTIONS,
  SET_CONTINENT,
  GET_SCORES,
} from "../reducers/dataReducers";
import axios from "axios";

export const stateContext = createContext();

export default function StateProvider(props) {
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
    }).catch(err => err);
  };

  const getContinent = (continentName) => {
    return dispatch({
      type: SET_CONTINENT,
      name: continentName.continent,
      id: continentName.id
    })
  };

  const getScores = () => {
    return axios.get('api/scores').then((scores)=>{
      console.log(scores);
      dispatch({
        type: GET_SCORES,
        scores: scores.data
      })
    })
  }

  const setScores = (userId, score) => {
    return axios.post('api/scores', {userId, score}).then((scores)=>{
     return console.log(scores);
      // dispatch({
      //   type: SET_SCORES,
      //   scores: scores.data
      // })
  }).catch(err => err);
}

  

  useEffect(() => {
    axios({
            method: 'GET',
            url: '/api/users',
        })
        .then(({
            data
        }) => {
            console.log(data);
            dispatch({
                type: SET_USERS,
                users: data
            });
        })
        .catch((err) => console.log(err));
}, []);



  const providerData = {
    state,
    dispatch,
    getQuestions,
    getContinent,
    getScores,
    setScores
  };


  return (
    <stateContext.Provider value={providerData}>
      {props.children}
    </stateContext.Provider>
  );
}
