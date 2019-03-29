function reducer (state,action){
    
    switch (action.type) {
        case 'USR_LOGGED':{
        const {isLogged , user} = action.payload
            return {
                ...state,
                listusers_active:false, 
                headers:[],
                nameUsers:[],
                chatActive: 0,
                isLogged: isLogged,
                user: user
            }
        }
        case 'ADD_HEADERS_MESSAGE':{
            return{
                ...state, 
                headers: action.payload,
            }
        }
        case 'NEW_CONVERSATION':{
            return{
                ...state, 
                conversation: action.payload, 
            }
        }
        case 'NEW_CHAT_ACTIVE':{
            return {
                ...state, 
                chatActive: action.payload,
            }
        }
        case 'UPDATE_CONVERSATION':{
            return{
                ...state, 
                conversation: action.payload, 
            }
        }
        case 'NEW_LIST_USERS':{
            return{
                ...state, 
                nameUsers: action.payload, 
            }
        }
        case 'LIST_USERS_ACTIVE':{
            return{
                ...state, 
                listusers_active: !state.listusers_active, 
            }
        }
        default:
            break;
    }

}

export default reducer; 