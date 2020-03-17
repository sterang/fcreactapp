function videos(state={},action){
    switch(action.type){
        case 'SET_CONTENTS_LIST':{
            return {...state, ...action.payload}
        }
        case 'SET_ACTIVITIES_LIST':{
            return {...state, ...action.payload}
        }
        case 'SET_SUBJECT_ACTIVITY_LIST':{
            return {...state, ...action.payload}
        }
        
        case 'SET_SELECT_ACTIVITIES_LIST':{
            return {...state, selectedSubjects:action.payload.subject}
        }
        case 'SET_SELECT_ACTIVITIES_SUBJECT_LIST':{
            return {...state, selectedActivity:action.payload.activity}
        }
        case 'SET_SELECTED_CONTENT':{
            return {...state, selectedContenido:action.payload.contenido}
        }
        case 'SET_STUDENT':{
            return {...state, selectedStudent:action.payload.student}
        }
        case 'SET_ACTIVITY_STUDENT':{
            return {...state, selectedStudentActivity:action.payload.studentActivity}
        }
        case 'SET_IPCONFIG':{
            return {...state, selectedIPConfig:action.payload.ipconfig}
        }
        case 'SET_DOUBT_STUDENT':{
            return {...state, selectedDuda:action.payload.duda}
        }
        case 'SET_DOUBT_LIST':{
            return {...state, ...action.payload}
        }
        case 'SET_STUDENTS_LIST':{
            return {...state, ...action.payload}
        }
        case 'SET_STUDENT_ADMIN':{
            return {...state, selectedStudentAdmin:action.payload.studentAdmin}
        }
        default: 
            return state
    }
}
export default videos;