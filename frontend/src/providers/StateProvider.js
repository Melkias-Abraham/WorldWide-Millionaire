import { createContext, useEffect, useReducer } from "react";
import dataReducer, {
  SET_USERS,
  SET_QUESTIONS,
  SET_CONTINENT,
} from "../reducers/dataReducers";
import axios from "axios";

export const stateContext = createContext();

export default function StateProvider(props) {
  // Here is our Shared State Object
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


  // This list can get long with a lot of functions.  Reducer may be a better choice
  const providerData = {
    state,
    dispatch,
    getQuestions,
    getContinent
  };

  // We can now use this as a component to wrap anything
  // that needs our state
  return (
    <stateContext.Provider value={providerData}>
      {props.children}
    </stateContext.Provider>
  );
}
