

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

        case 'UPDATE_HEADER':{
            let pos; 
            state.headers.map((item,i)=>{
                if(item.id_header === action.payload.id_header){
                    pos = i; 
                }
            });
            let headers = state.headers; 
            headers.splice(pos,1,action.payload); 
            let newHeaders = [...headers]; 
            return {
                ...state, 
                headers: newHeaders, 
            }
        }
        case 'AVATAR_UPDATE':{
            let user = {
                ...state.user, 
                avatar: action.payload
            } 
            return{
                ...state, 
                user,
            }
        }
        case 'TOGGLE_LOGIN':{
            return{
                ...state, 
                login: !state.login
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
        case 'ADD_NEW_HEADER':{
            return{
                ...state,
                headers: [...state.headers,action.payload],
                chatActive: action.payload.id_header, 
            }
        }
        default:
            break;
    }

}

export default reducer; 