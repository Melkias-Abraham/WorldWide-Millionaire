export const SET_USERS = 'SET_USERS';
export const SET_QUESTIONS = 'SET_QUESTIONS';
export const SET_CONTINENT = 'SET_CONTINENT';
const dataReducer = (state, action) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.users,
                    loading: false,
            }
        case SET_QUESTIONS:
            return {
                ...state,
                questions: action.questions,
                    loading: false,
            };
        case SET_CONTINENT:
            return {
                ...state,
                continent: {
                    name: action.name,
                    id: action.id
                }
            }
        
        default:
            return state;
    }
};

export default dataReducer;
