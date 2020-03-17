class Api {
    async getContent(BASE_IP){
        var BASE_API ='http://'+BASE_IP+':3000'+'/loadAllcontentsMovil';
        const query = await fetch(`${BASE_API}`);
        const data = await query.json();
        //const predata = await data.contents;
        //console.log(predata);
        return data;
    }
    async getConection(BASE_IP){
        var BASE_API ='http://'+BASE_IP+':3000'+'/conectionWithApp';
        var data = 3;
        const query = await fetch(`${BASE_API}`)
        .then(response => {
            data = 1;
        })
        .catch(function(err) {
            data = 0;
        });
        //const data2 = await query.json();
        console.log(data);
        return data;
    }
    
    async getCourses(BASE_IP, id_grado, id_colegio){
        var BASE_API_COURSES ='http://'+BASE_IP+':3000'+'/loadAllSubjectActivesMovil';
        var datajson = {id_colegio: id_colegio, id_grado: id_grado};
        //console.log("Aqui mando datos");
        //console.log(datajson);
        const query2 = await fetch(`${BASE_API_COURSES}`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datajson),
        });
        const data2 = await query2.json();
        console.log(data2);
        return data2;
    }
    async getActivities(BASE_IP){
        var BASE_API_ACTIVITIES ='http://'+BASE_IP+':3000'+'/loadAllactivities';
        const query = await fetch(`${BASE_API_ACTIVITIES}`);
        const data = await query.json();
        //console.log(data);
        return data;
    }
    async getActivitiesMovil(BASE_IP, id_colegio, id_grado, id_materia){
        var BASE_API_ACTIVITIES_MOVIL ='http://'+BASE_IP+':3000'+'/loadAllActivitiesMovil';
        var datajson = {id_colegio: id_colegio, id_grado: id_grado, id_materia: id_materia};
        //console.log("Aqui mando datos");
        //console.log(datajson);
        const query2 = await fetch(`${BASE_API_ACTIVITIES_MOVIL}`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datajson),
        });
        const data2 = await query2.json();
        //console.log(predata2);
        return data2;
    }
    async SearchContent(BASE_IP,title){
        var BASE_API_SEARCH ='http://'+BASE_IP+':3000'+'/searchContentREA';
        var datajson = {nombre_CREA: title};
        console.log("JSON BUSQUEDA_________________");
        const query2 = await fetch(`${BASE_API_SEARCH}`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datajson),
        });
        const data2 = await query2.json();
        const predata2 = await data2.content;
        //console.log(predata2);
        return predata2;
    }
    async createEvents(BASE_IP,eventsStudents){
        var BASE_API_EVENTS ='http://'+BASE_IP+':3000'+'/createEventos';
        console.log("JSON EVENTOS");
        const query2 = await fetch(`${BASE_API_EVENTS}`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventsStudents),
        });
        const data2 = await query2.json();
        //console.log(data2);
    }
    async loadEventsLast(BASE_IP){
        var BASE_API_LOAD_EVENTS ='http://'+BASE_IP+':3000'+'/loadAllEvento';
        const query = await fetch(`${BASE_API_LOAD_EVENTS}`);
        const data = await query.json();
        console.log('Cargando Todos los Eventos');
        const datalast = data[data.length-1];
        //console.log(datalast);
        return data.length;
    }
    async loginStudent(BASE_IP,eventsStudents){
        console.log("JSON LOGIN");
        var BASE_API_LOGIN ='http://'+BASE_IP+':3000'+'/loginEstudiante';
        const query2 = await fetch(`${BASE_API_LOGIN}`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventsStudents),
        });
        const data2 = await query2.json();
        //console.log(data2);
    }
    async loadSchool(BASE_IP){
        var BASE_API_SCHOOL ='http://'+BASE_IP+':3000'+'/loadAllSchools';
        
        console.log("JSON SCHOOL");
        const query = await fetch(`${BASE_API_SCHOOL}`);
        const data2 = await query.json();
        //console.log(data2);
        return data2;
    }
    async createStudents(BASE_IP,Student){
        console.log("JSON EVENTOS");
        var BASE_API_STUDENTS ='http://'+BASE_IP+':3000'+'/createEstudiante';
        const query2 = await fetch(`${BASE_API_STUDENTS}`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Student),
        });
        const data2 = await query2.json();
        //console.log(data2);
        return data2;
    }
    async updateStudents(BASE_IP, Student){
        console.log("JSON EVENTOS");
        var BASE_UPDATE_API_STUDENTS ='http://'+BASE_IP+':3000'+'/uploadEstudiante';
        const query2 = await fetch(`${BASE_UPDATE_API_STUDENTS}`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Student),
        });
        const data2 = await query2.json();
        //console.log(data2);
        return data2;
    }
    async allStudent(BASE_IP){
        var BASE_API_ALL_STUDENTS = 'http://'+BASE_IP+':3000'+'/loadAllStudent';
        const query = await fetch(`${BASE_API_ALL_STUDENTS}`);
        const data = await query.json();
        //console.log(data);
        return data;
    }
    async allDoubts(BASE_IP){
        var BASE_API_ALL_STUDENTS = 'http://'+BASE_IP+':3000'+'/loadAllDudas';
        const query = await fetch(`${BASE_API_ALL_STUDENTS}`);
        const data = await query.json();
        //console.log(data);
        return data;
    }
    async allDoubtsStudents(BASE_IP, student){
        console.log("JSON DUDAS");
        var BASE_API_LOAD_DOUBTS_STUDENT = 'http://'+BASE_IP+':3000'+'/loadDudaStudents';
        const query2 = await fetch(`${BASE_API_LOAD_DOUBTS_STUDENT}`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student),
        });
        const data2 = await query2.json();
        console.log(data2);
        return data2;
    }
    async generateMetrics(BASE_IP, Student){
        console.log("JSON EVENTOS");
        var BASE_API_LOAD_EVENT_STUDENT = 'http://'+BASE_IP+':3000'+'/generateMetrica';
        const query2 = await fetch(`${BASE_API_LOAD_EVENT_STUDENT}`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Student),
        });
        const data2 = await query2.json();
        //console.log(data2);
        return data2;
    }
    async generateDoubt (BASE_IP, dataDoubt){
        var BASE_API_CREATE_DOUBT = 'http://'+BASE_IP+':3000'+'/createDuda';
        const query2 = await fetch(`${BASE_API_CREATE_DOUBT}`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataDoubt),
        });
        const data2 = await query2.json();
        return data2;
    }
    async loadDoubt (BASE_IP){
        var BASE_API_LOAD_DOUBT = 'http://'+BASE_IP+':3000'+'/createDuda';
        const query = await fetch(`${BASE_API_LOAD_DOUBT}`);
        const data2 = await query.json();
        return data2;
    }
    async loginAdmin (BASE_IP, dataLogin){
        var BASE_API_LOGIN_ADMIN = 'http://'+BASE_IP+':3000'+'/loginAdminMovil';
        const query2 = await fetch(`${BASE_API_LOGIN_ADMIN}`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataLogin),
        });
        const data2 = await query2.json();
        return data2;
    }
}
export default new Api();