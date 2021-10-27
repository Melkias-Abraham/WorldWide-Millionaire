import { createContext, useEffect, useReducer } from "react";
import dataReducer, {
  SET_USERS,
  SET_QUESTIONS,
  SET_CONTINENT,
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
    getContinent
  };


  return (
    <stateContext.Provider value={providerData}>
      {props.children}
    </stateContext.Provider>
  );
}
