export const SET_USERS = 'SET_USERS';
export const SET_QUESTIONS = 'SET_QUESTIONS';
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
        
        default:
            return state;
    }
};

export default dataReducer;
