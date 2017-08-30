var ruta = "http://localhost:8080"; //cel doriandres
//var ruta= "http://192.168.1.9:8080"; //casa de marco
var _ =hdfsb();
var espaciosList = "";
var _activos = new Array();
var _espacios = new Array();
var _usuarios = new Array();
var _activity = new Array();
var _myActivity= new Array();
var _user = new Object();
var audioAlert = new Audio('sounds/nuevaSolicitud.mp3');


function filters(elm){
    var d=document;
    var arr= new Array();
    arr= elm.id.split("-");
    var tipo= arr[0];
    switch(tipo){
        case "activos":
                var activos_filtrados=new Array();
                for (var i=0; i<_activos.length; i++){
                    var type=d.getElementById("activos-filtro-tipo").value;
                    var space=d.getElementById("activos-filtro-espacio").value;
                    var code=d.getElementById("activos-filtro-codigo").value;//input
                    var ci=d.getElementById("activos-filtro-ci").value;//input
                    
                    if (type=="Todos"){
                        type=_activos[i].tipo;
                    }
                    if (space=="Todos"){
                        space=_activos[i].espacio;
                    }
                    if (code==""){
                        code=_activos[i].codigo;
                    }
                    if (ci==""){
                        ci=_activos[i].codigoInstitucional;
                    }
                    if (_activos[i].tipo==type && _activos[i].espacio==space && _activos[i].codigo==code && _activos[i].codigoInstitucional==ci){
                        activos_filtrados.push(_activos[i]);
                    } 
                }
                displayActivos(activos_filtrados, false);
            break; //fin de activos
        case "espacios":
                var espacios_filtrados=new Array();
                for (var i=0; i<_espacios.length; i++){
                    var plant=d.getElementById("espacios-filtro-planta").value; 
                    var code=d.getElementById("espacios-filtro-codigo").value;//input
                    if (plant=="Todos"){
                        plant=_espacios[i].planta;
                    }
                    if (code==""){
                        code=_espacios[i].codigo;
                    }
                    if (_espacios[i].planta==plant && _espacios[i].codigo==code){
                        espacios_filtrados.push(_espacios[i]);
                    } 
                }
                displayEspacios(espacios_filtrados, false);
            break; //fin de espacios
        case "usuarios":
                var usuarios_filtrados=new Array();
                for (var i=0; i<_usuarios.length; i++){
                    var type=d.getElementById("usuarios-filtro-tipo").value; 
                    var mail=d.getElementById("usuarios-filtro-correo").value;//input
                    if (type=="Todos"){
                        type=_usuarios[i].tipo;
                    }
                    if (mail==""){
                        mail=_usuarios[i].correo;
                    }
                    if (_usuarios[i].tipo==type && _usuarios[i].correo==mail){
                        usuarios_filtrados.push(_usuarios[i]);
                    } 
                }
                displayUsuarios(usuarios_filtrados, false);
            break; //fin de espacios
        case "actividad":
                var actividad_filtrados=new Array();
                for (var i=0; i<_activity.length; i++){
                    var action=d.getElementById("actividad-filtro-accion").value;
                    var elem=d.getElementById("actividad-filtro-elemento").value;
                    var id=d.getElementById("actividad-filtro-id").value;//input
                    var mail=d.getElementById("actividad-filtro-correo").value;//input
                    
                    if (action=="Todos"){
                        action=_activity[i].tipo;
                    }
                    if (elem=="Todos"){
                        elem=_activity[i].categoria;
                    }
                    if (id==""){
                        id=_activity[i]._id;
                    }
                    if (mail==""){
                        mail=_activity[i].usuario;
                    }
                    if (_activity[i].tipo==action && _activity[i].categoria==elem && _activity[i]._id==id && _activity[i].usuario==mail){
                        actividad_filtrados.push(_activity[i]);
                    } 
                }
                displayActivity(actividad_filtrados, false);
            break; //fin de activos
        case "myActividad":
                var myActividad_filtrados=new Array();
                for (var i=0; i<_myActivity.length; i++){
                    var action=d.getElementById("myActividad-filtro-accion").value;
                    var elem=d.getElementById("myActividad-filtro-elemento").value;
                    var id=d.getElementById("myActividad-filtro-id").value;//input
                    
                    if (action=="Todos"){
                        action=_myActivity[i].tipo;
                    }
                    if (elem=="Todos"){
                        elem=_myActivity[i].categoria;
                    }
                    if (id==""){
                        id=_myActivity[i]._id;
                    }
                    if (_myActivity[i].tipo==action && _myActivity[i].categoria==elem && _myActivity[i]._id==id){
                        myActividad_filtrados.push(_myActivity[i]);
                    } 
                }
                displayMyActivity(myActividad_filtrados, false);
            break; //fin de activos
    }
}

function initDashboard(){
    $('#loading').modal('open');
    if ( _ == undefined || _ == null || _ == "undefined"){
        rfcx();
    }else{
        if (_.y==true){
            $.ajax({
                    type: "POST",
                    url: ruta+"/_",
                    dataType: "json",   
                    data: JSON.stringify(_.z),
                    timeout: 5000,
                    success: function(res){
                       if (res.resultado==true){
                           loadDashboard(res.resultado, res.u);
                       }else{
                           rfcx();
                       }
                    }
            });
        }else{
            rfcx();
        }
    }
}
function loadDashboard(w,u){
    _user=u;
    if (w==true){
         var elm ='';
         switch(_.z.zlk){
             case "Administrador":
                
                 
                elm = '<li><a onclick="display_Panel(this); Activity();" class="actividadGeneral" href="#!"><i class="material-icons left">timeline</i>Actividad</a></li>';
                $( "#nav-mobile" ).append( elm ); 
                 

                
               /*
                 ACTIVIDAD General     ___
                                                                    |   |
                                                                    |   |
                                                                    |   |
                                                                **************
                                                                 ************
                                                                  **********
                                                                   ********
                                                                    ******
                                                                     ****
                                                                      **
                */

                elm= '<!--Admin Onlys--><!--Actividad GENERAL Panel--><div id="actividadGeneralPanel" class="Panel adminPanel"><div class="row"><!--Menu de la izquierda--><div class="col s12 m3 hide-on-med-and-down"><div class="collection"><a onclick="Activity()" href="#!" class="collection-item active"><i class="material-icons left">timeline</i>Actividad</a></div></div><!--Contenido--><div class="col s12 m8"><div id="actividadGeneral-actividadGeneral" class="UPanel actividadGeneral-actividadGeneral actividadGeneral-uPanel active-uPanel"><!--Titulo del UPanel--><blockquote><div class="row"><div class="col s4"><h4>Actividad</h4></div> <div class="col s8"><div class="input-field col s12 m3">                                                                                  <select id="actividad-filtro-accion" onchange="filters(this)">                                                       <option value="Todos" selected>Todas</option>                                                                  <option value="Creado">Creado</option>                                                                        <option value="Editado">Editado</option>                                                                      <option value="Eliminado">Elimando</option>                                                             </select><label>Acción</label></div>                                                                       <div class="input-field col s12 m3">                                                                                <select id="actividad-filtro-elemento" onchange="filters(this)">                                                      <option value="Todos" selected>Todos</option>                                                                 <option value="Activo">Activos</option>                                                                       <option value="Espacio">Espacios</option>                                                                     <option value="Usuario">Usuarios</option>                                                             </select><label>Elemento</label></div>                                                                  <div class="input-field col s12 m3">                                                                                     <input type="text" id="actividad-filtro-id" onchange="filters(this)">                                         <label for="actividad-filtro-id">Id Actividad</label></div>                                        <div class="input-field col s12 m3">                                                                                     <input type="text" id="actividad-filtro-correo" onchange="filters(this)">                                         <label for="actividad-filtro-correo">Usuario</label></div></div></div></blockquote><!--Cuerpo del Upanel--><div class="UpanelBody"><div id="displayActivity" class="row"></div></div></div></div></div></div>';
                $( "#tools" ).append( elm ); 
               
                elm = '<li><a onclick="display_Panel(this); historySlctds();" class="solicitudes grey-text text-lighten-2" href="#!"><i class="material-icons left">announcement</i>Solicitudes<span id="solicitudes-badge" class="badge white-text">0</span></a></li>';
                $( "#nav-mobile" ).append( elm );
                 
                elm='<!--Solicitudes Panel--><div id="solicitudesPanel" class="Panel adminPanel"><div class="row"><!--Menu de la izquierda--><div id="solicitudesSideMenu" class="col s12 m3 hide-on-med-and-down"><!--Admin Only--><div class="collection"><a id="historial-solicitudes-btn" href="#!" onclick="display_uPanel(this); historySlctds();" class="solicitudes-sideNav historial collection-item active"><i class="material-icons left">history</i>Historial de solicitudes</a><a name="Activo" id="activosPendientes-solicitudes-btn" href="#!" onclick="display_uPanel(this); Pendientes(this);" class="solicitudes-sideNav activosPendientes collection-item"><i class="material-icons left">dashboard</i><span id="activosPendientes-badge" class="badge">0</span>Activos pendientes</a><a name="Espacio" id="espaciosPendientes-solicitudes-btn" href="#!" onclick="display_uPanel(this); Pendientes(this);" class="solicitudes-sideNav espaciosPendientes collection-item"><i class="material-icons left">place</i><span id="espaciosPendientes-badge" class="badge">0</span>Espacios pendientes</a></div><!--Soporte--><div class="collection"><a name="Soporte" id="soporteHistory-solicitudes-btn" href="#!" onclick="display_uPanel(this); historySlctdsSp();" class="solicitudes-sideNav soporteHistory collection-item"><i class="material-icons left">history</i>Historial solicitudes de soporte</a><a name="Soporte" id="soporteLista-solicitudes-btn" href="#!" onclick="display_uPanel(this); listSlctdsSp();" class="solicitudes-sideNav soporteLista collection-item"><i class="material-icons left">view_agenda</i>Soporte en Lista</a><a name="Soporte" id="soportePendientes-solicitudes-btn" href="#!" onclick="display_uPanel(this); Pendientes(this);" class="solicitudes-sideNav soportePendientes collection-item"><i class="material-icons left">build</i><span id="soportePendientes-badge" class="badge">0</span>Soporte pendientes</a></div></div><!--Contenido--><div id="solicitudesPaneles" class="col s12 m9"><!--Admin Only--><div id="historial-solicitudes" class="UPanel historial-solicitudes solicitudes-uPanel active-uPanel"><!--Titulo del UPanel--><blockquote><h4>Historial de solicitudes</h4></blockquote><!--Cuerpo del Upanel--><div class="UpanelBody col s12 m11"><div class="row" id="displayHistorialSolicitudesG"></div></div></div><div id="activosPendientes-solicitudes" class="UPanel activosPendientes-solicitudes solicitudes-uPanel"><!--Titulo del UPanel--><blockquote><h4>Activos Pendientes</h4></blockquote><!--Cuerpo del Upanel--><div class="UpanelBody col s12 m11"><div id="displayActivosPendientes" class="row"></div></div></div><div id="espaciosPendientes-solicitudes" class="UPanel espaciosPendientes-solicitudes solicitudes-uPanel"><!--Titulo del UPanel--><blockquote><h4>Espacios Pendientes</h4></blockquote><!--Cuerpo del Upanel--><div class="UpanelBody col s12 m11"><div id="displayEspaciosPendientes" class="row"></div></div></div><!--Soporte--><div id="soporteLista-solicitudes" class="UPanel soporteLista-solicitudes solicitudes-uPanel"><!--Titulo del UPanel--><blockquote><h4>Soporte en Lista</h4></blockquote><!--Cuerpo del Upanel--><div class="UpanelBody col s12 m11"><div id="displayListSoporte" class="row"></div></div></div><div id="soportePendientes-solicitudes" class="UPanel soportePendientes-solicitudes solicitudes-uPanel"><!--Titulo del UPanel--><blockquote><h4>Soporte Pendientes</h4></blockquote><!--Cuerpo del Upanel--><div class="UpanelBody col s12 m11"><div id="displaySoportePendientes" class="row"></div></div></div><div id="soporteHistory-solicitudes" class="UPanel soporteHistory-solicitudes solicitudes-uPanel"><!--Titulo del UPanel--><blockquote><h4>Historial de soporte</h4></blockquote><!--Cuerpo del Upanel--><div class="UpanelBody col s12 m11"><div id="displayHistorySoporte" class="row"></div></div></div></div></div></div>';
                $( "#tools" ).append( elm );
                 
                
                 
                elm = '<li><a data-constrainwidth="false" data-beloworigin="true" class="dropdown-button grey-text text-lighten-2" href="#!" data-activates="user_options"><i class="material-icons left">account_circle</i>'+_user.nombre+' '+_user.primer_apellido+' '+_user.segundo_apellido+'</a></li>';
                $( "#nav-mobile" ).append( elm );
                 
                elm = '<ul id="user_options" class="dropdown-content grey lighten-3"><li><a onclick="display_Panel(this); MyActivity();" class="actividad" href="#!"><i class="material-icons left">person</i>Usuario</a></li><li class="divider"></li><li><a onclick="signOut()" href="#!"><i class="material-icons left">exit_to_app</i>Cerrar sesión</a>';
                $( "#nav-mobile" ).append( elm ); 
                 


                /*
                 MI ACTIVIDAD     ___
                                                                    |   |
                                                                    |   |
                                                                    |   |
                                                                **************
                                                                 ************
                                                                  **********
                                                                   ********
                                                                    ******
                                                                     ****
                                                                      **
                */
                elm = '<!--Mi Actividad Panel--><div id="actividadPanel" class="Panel adminPanel"><div class="row"><!--Menu de la izquierda--><div id="actividadSideMenu" class="col s12 m3 hide-on-med-and-down"><div class="card"><div class="container"><br><div class="row"><div style="padding-left:0px;" class="col s2 left-align"><h6><i class="material-icons medium  blue-text text-darken-2">account_circle</i></h6></div><div id="userName" style="padding-left:20px; padding-top:6px; font-size:20px;" class="col s10 left-align"></div><div class="col s12 left-align"><blockquote><h6><big id="userType"></big></h6></blockquote></div><br></div></div></div><!--Todos menos los estudiantes--><div class="collection"><a id="ver-actividad-btn" href="#!" onclick="display_uPanel(this); MyActivity();" class="actividad-sideNav ver collection-item active"><i class="material-icons left">timeline</i>Mi Actividad</a></div><div class="collection"><a id="historial-actividad-btn" href="#!" onclick="display_uPanel(this); myHistorySolicitudes();" class="actividad-sideNav historial collection-item"><i class="material-icons left">history</i>Mi historial de solicitudes</a><a id="soporte-actividad-btn" href="#!" onclick="display_uPanel(this); mySoporteLista();" class="actividad-sideNav soporte collection-item"><i class="material-icons left">view_agenda</i>Mi soporte en lista</a><a id="pendientes-actividad-btn" href="#!" onclick="display_uPanel(this); mySolicitudesPendientes();" class="actividad-sideNav pendientes collection-item"><i class="material-icons left">warning</i>Mis solicitudes en pendientes</a></div><div class="collection"><a id="config-actividad-btn" href="#!" onclick="display_uPanel(this); userConfig();" class="actividad-sideNav config collection-item"><i class="material-icons left">settings</i>Configuración del Usuario</a><a onclick="signOut()" href="#!" class="collection-item"><i class="material-icons left">exit_to_app</i>Cerrar Sesión</a></div></div><!--Contenido--><div id="actividadPaneles" class="col s12 m8"><!--Todos menos los estudiantes--><div id="ver-actividad" class="UPanel ver-actividad actividad-uPanel active-uPanel"><!--Titulo del UPanel--><blockquote><div class="row"><div class="col s4"><h4>Mi Actividad</h4></div> <div class="col s8"><div class="input-field col s12 m4">                                                                                                           <select id="myActividad-filtro-accion" onchange="filters(this)">                                                     <option value="Todos" selected>Todas</option>                                                                  <option value="Creado">Creado</option>                                                                        <option value="Editado">Editado</option>                                                                      <option value="Eliminado">Elimando</option>                                                             </select><label>Acción</label></div>                                                                       <div class="input-field col s12 m4">                                                                                  <select id="myActividad-filtro-elemento" onchange="filters(this)">                                                   <option value="Todos" selected>Todos</option>                                                                  <option value="Activo">Activos</option>                                                                        <option value="Espacio">Espacios</option>                                                                      <option value="Usuario">Usuarios</option>                                                               </select><label>Elemento</label></div>                                                                  <div class="input-field col s12 m4">                                                                                     <input type="text" id="myActividad-filtro-id" onchange="filters(this)">                                    <label for="myActividad-filtro-id">Id Actividad</label></div></div></div></blockquote><!--Cuerpo del Upanel--><div class="UpanelBody"><div id="displayMyActivity" class="row"></div></div></div><div id="historial-actividad" class="UPanel historial-actividad actividad-uPanel"><!--Titulo del UPanel--><blockquote><div class="row"><div class="col s6"><h4>Mi historial de solicitudes</h4></div></div></blockquote><!--Cuerpo del Upanel--><div class="UpanelBody"><div id="displayMyHistorialSolicitudes" class="row"></div></div></div><div id="soporte-actividad" class="UPanel soporte-actividad actividad-uPanel"><!--Titulo del UPanel--><blockquote><div class="row"><div class="col s12"><h4>Mi soporte en lista</h4></div></div></blockquote><!--Cuerpo del Upanel--><div class="UpanelBody"><div id="displayMyListSoporte" class="row"></div></div></div><div id="pendientes-actividad" class="UPanel pendientes-actividad actividad-uPanel"><!--Titulo del UPanel--><blockquote><div class="row"><div class="col s6"><h4>Mi solicitudes pendientes</h4></div></div></blockquote><!--Cuerpo del Upanel--><div class="UpanelBody"><div id="displayMyPendientes" class="row"></div></div></div><div id="config-actividad" class="UPanel config-actividad actividad-uPanel"><!--Titulo del UPanel--><blockquote><div class="row"><div class="col s12"><h4>Configuración del usuario</h4></div></div></blockquote><!--Cuerpo del Upanel--><div class="UpanelBody"><div id="config-form" class="col s12 m9 card"><div style="padding-bottom:30px;" class="container"><br><div class="input-field col s12"><input id="config-nombre" class="validate" type="text"><label for="usuarios-editar-nuevo-nombre">Nombre</label></div><div class="input-field col s6"><input id="config-apellido1" class="validate" type="text"><label for="config-apellido1" class="">1° Apellido</label></div><div class="input-field col s6"><input id="config-apellido2" class="validate" type="text"><label for="config-apellido2">2° Apellido</label></div><div class="input-field col s12"><input id="config-pass" class="validate" type="password"><label for="config-pass" class="">Contraseña Actual</label></div><div class="input-field col s12"><input id="config-npass" class="validate" type="password"><label for="config-npass" class="">Contraseña Nueva<small>(Opcional)</small></label></div><br><button id="config-btn" onclick="edituUser()" class="btn waves-effect blue darken-2" type="button"><i style="margin-right:5px;" class="material-icons left">save</i>Guardar</button></div></div></div></div></div></div></div>';

                 $( "#tools" ).append( elm );

                 //FIN DE LA PARTE DE MI ACTIVIDAD






                  
                //navbar-tabs
                elm = '<li class="tab"><a class="grey-text text-darken-2" href="#usuariosPanel"><i class="material-icons icon-collapse">people</i><i class="material-icons left hide">people</i><!--Relleno--><span class="hide-on-small-only">Usuarios</span></a></li>';
                $( "#navbarTabs" ).append( elm );
                //activos menu
                elm = '<div class="collection"><a id="nuevo-activos-btn" href="#!" onclick="display_uPanel(this)" class="activos-sideNav nuevo collection-item"><i class="material-icons left">add_circle_outline</i>Nuevo Activo</a><a id="editar-activos-btn" href="#!" onclick="display_uPanel(this); nuevoEditarActivos(this);" class="activos-sideNav editar collection-item"><i class="material-icons left">create</i>Editar Activos</a><a id="eliminar-activos-btn" onclick="eliminar_alert(this)" href="#!" class="collection-item"><i class="material-icons left">delete_forever</i>Eliminar Activos</a></div>';
                $( "#activosSideMenu" ).append( elm );
                //activos paneles
                elm = '<!--NUEVO ACTIVO--><div id="nuevo-activos" class="UPanel nuevo-activos activos-uPanel"><!--Titulo del UPanel--><blockquote><h4>Nuevo Activo</h4></blockquote><!--Cuerpo del Upanel--><div class="UpanelBody col s12 m9"><div class="card"><div style="padding-bottom:30px;" class="container"><br><div class="input-field col s6"><select id="nuevoActivo-tipo"><option value="" disabled selected>Elija una opción</option><option value="Auxiliar">Auxiliar</option><option value="Equipo">Equipo</option><option value="Mobiliario">Mobiliario</option></select><label>Tipo de Activo</label></div><div class="input-field col s6"><input id="nuevoActivo-cantidad" type="number" class="validate" value="1"><label for="nuevoActivo-cantidad">Cantidad</label></div><div class="input-field col s12"><input id="nuevoActivo-descripcion" type="text" class="validate"><label for="nuevoActivo-descripcion">Descripción</label></div><div class="input-field col s12"><div id="nuevoActivo-ci" class="chips chips-initial tooltipped" data-position="right" data-delay="50" data-tooltip="Presiona ↵ para agregar"></div><label>Código Institucional</label></div><div class="input-field col s12"><select id="nuevoActivo-espacio"></select><label>Espacio del activo</label></div><button onclick="nuevoActivo()" class="btn waves-effect blue darken-2" type="button"><i style="margin-right:5px;" class="material-icons left">save</i>Guardar</button></div></div></div></div><!--EDITAR ACTIVOS--><div id="editar-activos" class="UPanel editar-activos activos-uPanel"><!--Titulo del UPanel--><blockquote><h4>Editar Activos</h4></blockquote><!--Cuerpo del Upanel--><div class="UpanelBody col s12 m9"><div class="card"><ul id="activos-editar-tabs-headers" class="tabs tabs-fixed-width"><li class="tab col s3"><a class="" href="#test-swipe-1">ID-#</a></li><li class="tab col s3"><a class="active" href="#activos-editar-nuevo">Nuevo</a></li></ul></div><div id="activos-editar-tabs"></div></div></div>';
                $( "#activosPaneles" ).append( elm );
                  $('.tooltipped').tooltip({delay: 50});
                //espacios menu
                elm = '<div class="collection"><a id="nuevo-espacios-btn" href="#!" onclick="display_uPanel(this)" class="espacios-sideNav nuevo collection-item"><i class="material-icons left">add_circle_outline</i>Nuevo Espacio</a><a id="editar-espacios-btn" href="#!" onclick="display_uPanel(this); nuevoEditarEspacios(this);" class="espacios-sideNav editar collection-item"><i class="material-icons left">create</i>Editar Espacio</a><a id="eliminar-espacios-btn" onclick="eliminar_alert(this)" href="#!" class="collection-item"><i class="material-icons left">delete_forever</i>Eliminar Espacios</a></div>';
                $( "#espaciosSideMenu" ).append( elm );
                //espacios paneles
                 elm = '<!--NUEVO ESPACIO--><div id="nuevo-espacios" class="UPanel nuevo-espacios espacios-uPanel"><!--Titulo del UPanel--><blockquote><h4>Nuevo Espacio</h4></blockquote><!--Cuerpo del Upanel--><div class="UpanelBody col s12 m9"><div class="card"><div style="padding-bottom:30px;" class="container"><br><div class="input-field col s12"><input id="nuevoEspacio-codigo" type="number" class="validate"><label for="nuevoEspacio-codigo">Número de espacio</label></div><div class="input-field col s12"><select id="nuevoEspacio-planta"><option value="" disabled selected>Elija una opción</option><option value="1">1° Planta</option><option value="2">2° Planta</option></select><label>Planta</label></div><div class="input-field col s12"><input id="nuevoEspacio-descripcion" type="text" class="validate"><label for="nuevoEspacio-descripcion">Descripción</label></div><p><input type="checkbox" class="filled-in checkbox-blue" id="nuevoEspacio-aireAcondicionado"/><label for="nuevoEspacio-aireAcondicionado">Aire acondicionado</label></p><button onclick="nuevoEspacio()" class="btn waves-effect blue darken-2" type="button"><i style="margin-right:5px;" class="material-icons left">save</i>Guardar</button></div></div></div></div><!--EDITAR ESPACIO--><div id="editar-espacios" class="UPanel editar-espacios espacios-uPanel"><!--Titulo del UPanel--><blockquote><h4>Editar Espacio</h4></blockquote><!--Cuerpo del Upanel--><div class="UpanelBody col s12 m9"><div class="card"><ul id="espacios-editar-tabs-headers" class="tabs tabs-fixed-width"></ul></div><div id="espacios-editar-tabs"></div></div></div>';
                 $( "#espaciosPaneles" ).append( elm );
                
                 
                 /*
                 Usuarios     ___
                                                                    |   |
                                                                    |   |
                                                                    |   |
                                                                **************
                                                                 ************
                                                                  **********
                                                                   ********
                                                                    ******
                                                                     ****
                                                                      **
                */
                 
                 
                 
                 elm = '<!--Usuarios Panel--><div id="usuariosPanel" class=""><div class="row"><!--Menu de la izquierda--><div class="col s12 m3 hide-on-med-and-down"><div class="collection"><a id="ver-usuarios-btn" href="#!" onclick="display_uPanel(this); verUsuarios();" class="usuarios-sideNav ver collection-item active"><i class="material-icons left">people</i>Usuarios</a> </div><div class="collection"><a id="nuevo-usuarios-btn" href="#!" onclick="display_uPanel(this)" class="usuarios-sideNav nuevo collection-item"><i class="material-icons left">add_circle_outline</i>Nuevo Usuario</a><a id="editar-usuarios-btn" href="#!" onclick="display_uPanel(this);nuevoEditarUsuarios(this);" class="usuarios-sideNav editar collection-item"><i class="material-icons left">create</i>Editar Usuarios</a><a id="eliminar-usuarios-btn" href="#!" onclick="eliminar_alert(this)" class="collection-item"><i class="material-icons left">delete_forever</i>Eliminar Usuarios</a></div></div><!--Contenido--><div class="col s12 m8"><!--Usuarios--><div id="ver-usuarios" class="UPanel ver-usuarios usuarios-uPanel active-uPanel"><!--Titulo del UPanel--><blockquote><div class="row"><div class="col s6"><h4>Usuarios</h4></div>                                 <div class="input-field col s3">                                                                                    <select id="usuarios-filtro-tipo" onchange="filters(this)">                                                     <option value="Todos" selected>Todos</option>                                                                  <option value="Administrador">Administrador</option>                                                          <option value="Soporte">Soporte</option>                                                                      <option value="Docente">Docente</option>                                                                      <option value="Estudiante">Estudiante</option>                                                             </select><label>Tipo</label></div>                                                                      <div class="input-field col s3">                                                                                <input id="usuarios-filtro-correo" onchange="filters(this)" type="text">                                                                     <label>Correo Electrónico</label></div></div>                                                  </blockquote><!--Cuerpo del Upanel--><div class="UpanelBody"><table class="card bordered striped centered responsive-table"><thead><tr><th><i style="" class="material-icons">indeterminate_check_box</i></th><th>Correo Electrónico</th><th>Nombre</th><th>1° Apellido</th><th>2° Apellido</th><th>Tipo</th></tr></thead><tbody id="displayUsuarios"></tbody></table></div></div><!--NUEVO Usuario--><div id="nuevo-usuarios" class="UPanel nuevo-usuarios usuarios-uPanel"><!--Titulo del UPanel--><blockquote><h4>Nuevo Usuario</h4></blockquote><!--Cuerpo del Upanel--><div class="UpanelBody col s12 m9"><div class="card"><div style="padding-bottom:30px;" class="container"><br><div class="input-field col s12"><input id="nuevoUsuario-email" type="email" class="validate"><label for="nuevoUsuario-email">Correo electrónico</label></div><div class="input-field col s12"><input id="nuevoUsuario-nombre" type="text" class="validate"><label for="nuevoUsuario-nombre">Nombre</label></div><div class="input-field col s6"><input id="nuevoUsuario-apellido1" type="text" class="validate"><label for="nuevoUsuario-apellido1">1° Apellido</label></div><div class="input-field col s6"><input id="nuevoUsuario-apellido2" type="text" class="validate"><label for="nuevoUsuario-apellido2">2° Apellido</label></div><div class="input-field col s12"><select id="nuevoUsuario-tipo"><option value="" disabled selected>Elija una opción</option><option value="Administrador">Administrador</option><option value="Soporte">Soporte</option><option value="Docente">Docente</option><option value="Estudiante">Estudiante</option></select><label>Tipo</label></div><div class="input-field col s12"><input id="nuevoUsuario-pass" type="password" class="validate"><label for="nuevoUsuario-pass">Contraseña</label></div><div class="input-field col s12"><input id="nuevoUsuario-cpass" type="password" class="validate"><label for="nuevoUsuario-cpass">Confirmar contraseña</label></div><button onclick="nuevoUsuario()" class="btn waves-effect blue darken-2" type="button"><i style="margin-right:5px;" class="material-icons left">save</i>Guardar</button></div></div></div></div><!--EDITAR Usuario--><div id="editar-usuarios" class="UPanel editar-usuarios usuarios-uPanel"><!--Titulo del UPanel--><blockquote><h4>Editar Usuarios</h4></blockquote><!--Cuerpo del Upanel--><div class="UpanelBody s12 m8"><div class="card col s12 m9"><ul id="usuarios-editar-tabs-headers" class="tabs tabs-fixed-width"><li class="tab col s3"><a class="active" href="#us-a">email</a></li><li class="tab col s3"><a class="active" href="#us-b">Nuevo</a></li></ul></div><div id="usuarios-editar-tabs"></div></div></div></div></div></div>';
                  $( "#PanelesTab" ).append( elm );
                 
                 
                //Nombre y tipo

                $('.chips-initial').material_chip({
                    data: [],
                });
                Materialize.updateTextFields();
                $('#userName').text(_user.nombre+' '+_user.primer_apellido+' '+_user.segundo_apellido);
                $('#userType').text(_user.tipo); 
                verUsuarios();
                getSlctdsPndts(_.z.zlk)
                streamSlctds(_.z.zlk);
                MyActivity();
                break;
             case "Soporte":
                
               
                elm = '<li><a onclick="display_Panel(this); historySlctdsSp();" class="solicitudes grey-text text-lighten-2" href="#!"><i class="material-icons left">announcement</i>Solicitudes<span id="solicitudes-badge" class="badge white-text">0</span></a></li>';
                $( "#nav-mobile" ).append( elm );
                 
                elm='<!--Solicitudes Panel--><div id="solicitudesPanel" class="Panel adminPanel"><div class="row"><!--Menu de la izquierda--><div id="solicitudesSideMenu" class="col s12 m3 hide-on-med-and-down"><!--Soporte--><div class="collection"><a name="Soporte" id="soporteHistory-solicitudes-btn" href="#!" onclick="display_uPanel(this); historySlctdsSp();" class="solicitudes-sideNav soporteHistory collection-item active"><i class="material-icons left">history</i>Historial solicitudes de soporte</a><a name="Soporte" id="soporteLista-solicitudes-btn" href="#!" onclick="display_uPanel(this); listSlctdsSp();" class="solicitudes-sideNav soporteLista collection-item"><i class="material-icons left">view_agenda</i>Soporte en Lista</a><a name="Soporte" id="soportePendientes-solicitudes-btn" href="#!" onclick="display_uPanel(this); Pendientes(this);" class="solicitudes-sideNav soportePendientes collection-item"><i class="material-icons left">build</i><span id="soportePendientes-badge" class="badge">0</span>Soporte pendientes</a></div></div><!--Contenido--><div id="solicitudesPaneles" class="col s12 m9"><div id="soporteHistory-solicitudes" class="UPanel soporteHistory-solicitudes solicitudes-uPanel active-uPanel"><!--Titulo del UPanel--><blockquote><h4>Historial de soporte</h4></blockquote><!--Cuerpo del Upanel--><div class="UpanelBody col s12 m11"><div id="displayHistorySoporte" class="row"></div></div></div><!--Soporte--><div id="soporteLista-solicitudes" class="UPanel soporteLista-solicitudes solicitudes-uPanel"><!--Titulo del UPanel--><blockquote><h4>Soporte en Lista</h4></blockquote><!--Cuerpo del Upanel--><div class="UpanelBody col s12 m11"><div id="displayListSoporte" class="row"></div></div></div><div id="soportePendientes-solicitudes" class="UPanel soportePendientes-solicitudes solicitudes-uPanel"><!--Titulo del UPanel--><blockquote><h4>Soporte Pendientes</h4></blockquote><!--Cuerpo del Upanel--><div class="UpanelBody col s12 m11"><div id="displaySoportePendientes" class="row"></div></div></div></div></div></div>';
                $( "#tools" ).append( elm );
                 
                elm = '<li><a data-constrainwidth="false" data-beloworigin="true" class="dropdown-button grey-text text-lighten-2" href="#!" data-activates="user_options"><i class="material-icons left">account_circle</i>'+_user.nombre+' '+_user.primer_apellido+' '+_user.segundo_apellido+'</a></li>';
                $( "#nav-mobile" ).append( elm );
                 
                elm = '<ul id="user_options" class="dropdown-content grey lighten-3"><li><a onclick="display_Panel(this); MyActivity();" class="actividad" href="#!"><i class="material-icons left">person</i>Usuario</a></li><li class="divider"></li><li><a onclick="signOut()" href="#!"><i class="material-icons left">exit_to_app</i>Cerrar sesión</a>';
                $( "#nav-mobile" ).append( elm ); 
                 
                elm = '<!--Mi Actividad Panel--><div id="actividadPanel" class="Panel adminPanel"><div class="row"><!--Menu de la izquierda--><div id="actividadSideMenu" class="col s12 m3 hide-on-med-and-down"><div class="card"><div class="container"><br><div class="row"><div style="padding-left:0px;" class="col s2 left-align"><h6><i class="material-icons medium  blue-text text-darken-2">account_circle</i></h6></div><div id="userName" style="padding-left:20px; padding-top:6px; font-size:20px;" class="col s10 left-align"></div><div class="col s12 left-align"><blockquote><h6><big id="userType"></big></h6></blockquote></div><br></div></div></div><!--Todos menos los estudiantes--><div class="collection"><a id="ver-actividad-btn" href="#!" onclick="display_uPanel(this); MyActivity();" class="actividad-sideNav ver collection-item active"><i class="material-icons left">timeline</i>Mi Actividad</a></div><div class="collection"><a id="historial-actividad-btn" href="#!" onclick="display_uPanel(this); myHistorySolicitudes();" class="actividad-sideNav historial collection-item"><i class="material-icons left">history</i>Mi historial de solicitudes</a><a id="soporte-actividad-btn" href="#!" onclick="display_uPanel(this); mySoporteLista();" class="actividad-sideNav soporte collection-item"><i class="material-icons left">view_agenda</i>Mi soporte en lista</a><a id="pendientes-actividad-btn" href="#!" onclick="display_uPanel(this); mySolicitudesPendientes();" class="actividad-sideNav pendientes collection-item"><i class="material-icons left">warning</i>Mis solicitudes en pendientes</a></div><div class="collection"><a id="config-actividad-btn" href="#!" onclick="display_uPanel(this); userConfig();" class="actividad-sideNav config collection-item"><i class="material-icons left">settings</i>Configuración del Usuario</a><a onclick="signOut()" href="#!" class="collection-item"><i class="material-icons left">exit_to_app</i>Cerrar Sesión</a></div></div><!--Contenido--><div id="actividadPaneles" class="col s12 m8"><!--Todos menos los estudiantes--><div id="ver-actividad" class="UPanel ver-actividad actividad-uPanel active-uPanel"><!--Titulo del UPanel--><blockquote><div class="row"><div class="col s6"><h4>Mi Actividad</h4></div><div class="input-field col s3"><select multiple><option value="1" selected disabled>Ninguno</option><option value="1">Activos</option><option value="2">Espacios</option><option value="2">Usuarios</option><option disabled>Actividad</option><option value="3">Nuevo</option><option value="4">Edición</option><option value="4">Eliminación</option></select><label>Filtros</label></div><div class="input-field col s3"><input id="last_name" type="text" class="validate"><label for="last_name">Id</label></div></div></blockquote><!--Cuerpo del Upanel--><div class="UpanelBody"><div id="displayMyActivity" class="row"></div></div></div><div id="historial-actividad" class="UPanel historial-actividad actividad-uPanel"><!--Titulo del UPanel--><blockquote><div class="row"><div class="col s6"><h4>Mi historial de solicitudes</h4></div><div class="input-field col s3"><select multiple><option value="1" selected disabled>Ninguno</option></select><label>Filtros</label></div><div class="input-field col s3"><input id="last_name" type="text" class="validate"><label for="last_name">Id</label></div></div></blockquote><!--Cuerpo del Upanel--><div class="UpanelBody"><div id="displayMyHistorialSolicitudes" class="row"></div></div></div><div id="soporte-actividad" class="UPanel soporte-actividad actividad-uPanel"><!--Titulo del UPanel--><blockquote><div class="row"><div class="col s12"><h4>Mi soporte en lista</h4></div></div></blockquote><!--Cuerpo del Upanel--><div class="UpanelBody"><div id="displayMyListSoporte" class="row"></div></div></div><div id="pendientes-actividad" class="UPanel pendientes-actividad actividad-uPanel"><!--Titulo del UPanel--><blockquote><div class="row"><div class="col s6"><h4>Mi solicitudes pendientes</h4></div><div class="input-field col s3"><select multiple><option value="1" selected disabled>Ninguno</option></select><label>Filtros</label></div><div class="input-field col s3"><input id="last_name" type="text" class="validate"><label for="last_name">Id</label></div></div></blockquote><!--Cuerpo del Upanel--><div class="UpanelBody"><div id="displayMyPendientes" class="row"></div></div></div><div id="config-actividad" class="UPanel config-actividad actividad-uPanel"><!--Titulo del UPanel--><blockquote><div class="row"><div class="col s12"><h4>Configuración del usuario</h4></div></div></blockquote><!--Cuerpo del Upanel--><div class="UpanelBody"><div id="config-form" class="col s12 m9 card"><div style="padding-bottom:30px;" class="container"><br><div class="input-field col s12"><input id="config-nombre" class="validate" type="text"><label for="usuarios-editar-nuevo-nombre">Nombre</label></div><div class="input-field col s6"><input id="config-apellido1" class="validate" type="text"><label for="config-apellido1" class="">1° Apellido</label></div><div class="input-field col s6"><input id="config-apellido2" class="validate" type="text"><label for="config-apellido2">2° Apellido</label></div><div class="input-field col s12"><input id="config-pass" class="validate" type="password"><label for="config-pass" class="">Contraseña Actual</label></div><div class="input-field col s12"><input id="config-npass" class="validate" type="password"><label for="config-npass" class="">Contraseña Nueva<small>(Opcional)</small></label></div><br><button id="config-btn" onclick="edituUser()" class="btn waves-effect blue darken-2" type="button"><i style="margin-right:5px;" class="material-icons left">save</i>Guardar</button></div></div></div></div></div></div></div>';
                 $( "#tools" ).append( elm );
                  
                //activos menu
                elm = '<div class="collection"><a id="nuevo-activos-btn" href="#!" onclick="display_uPanel(this)" class="activos-sideNav nuevo collection-item"><i class="material-icons left">add_circle_outline</i>Nuevo Activo</a><a id="editar-activos-btn" href="#!" onclick="display_uPanel(this); nuevoEditarActivos(this);" class="activos-sideNav editar collection-item"><i class="material-icons left">create</i>Editar Activos</a><a id="eliminar-activos-btn" onclick="eliminar_alert(this)" href="#!" class="collection-item"><i class="material-icons left">delete_forever</i>Eliminar Activos</a></div>';
                $( "#activosSideMenu" ).append( elm );
                //activos paneles
                elm = '<!--NUEVO ACTIVO--><div id="nuevo-activos" class="UPanel nuevo-activos activos-uPanel"><!--Titulo del UPanel--><blockquote><h4>Nuevo Activo</h4></blockquote><!--Cuerpo del Upanel--><div class="UpanelBody col s12 m9"><div class="card"><div style="padding-bottom:30px;" class="container"><br><div class="input-field col s6"><select id="nuevoActivo-tipo"><option value="" disabled selected>Elija una opción</option><option value="Auxiliar">Auxiliar</option><option value="Equipo">Equipo</option><option value="Mobiliario">Mobiliario</option></select><label>Tipo de Activo</label></div><div class="input-field col s6"><input id="nuevoActivo-cantidad" type="number" class="validate" value="1"><label for="nuevoActivo-cantidad">Cantidad</label></div><div class="input-field col s12"><input id="nuevoActivo-descripcion" type="text" class="validate"><label for="nuevoActivo-descripcion">Descripción</label></div><div class="input-field col s12"><div id="nuevoActivo-ci" class="chips chips-initial"></div></div><div class="input-field col s12"><select id="nuevoActivo-espacio"></select><label>Espacio del activo</label></div><button onclick="nuevoActivo()" class="btn waves-effect blue darken-2" type="button"><i style="margin-right:5px;" class="material-icons left">save</i>Guardar</button></div></div></div></div><!--EDITAR ACTIVOS--><div id="editar-activos" class="UPanel editar-activos activos-uPanel"><!--Titulo del UPanel--><blockquote><h4>Editar Activos</h4></blockquote><!--Cuerpo del Upanel--><div class="UpanelBody col s12 m9"><div class="card"><ul id="activos-editar-tabs-headers" class="tabs tabs-fixed-width"><li class="tab col s3"><a class="" href="#test-swipe-1">ID-#</a></li><li class="tab col s3"><a class="active" href="#activos-editar-nuevo">Nuevo</a></li></ul></div><div id="activos-editar-tabs"></div></div></div>';
                $( "#activosPaneles" ).append( elm );
                
                //espacios menu
                elm = '<div class="collection"><a id="nuevo-espacios-btn" href="#!" onclick="display_uPanel(this)" class="espacios-sideNav nuevo collection-item"><i class="material-icons left">add_circle_outline</i>Nuevo Espacio</a><a id="editar-espacios-btn" href="#!" onclick="display_uPanel(this); nuevoEditarEspacios(this);" class="espacios-sideNav editar collection-item"><i class="material-icons left">create</i>Editar Espacio</a><a id="eliminar-espacios-btn" onclick="eliminar_alert(this)" href="#!" class="collection-item"><i class="material-icons left">delete_forever</i>Eliminar Espacios</a></div>';
                $( "#espaciosSideMenu" ).append( elm );
                //espacios paneles
                 elm = '<!--NUEVO ESPACIO--><div id="nuevo-espacios" class="UPanel nuevo-espacios espacios-uPanel"><!--Titulo del UPanel--><blockquote><h4>Nuevo Espacio</h4></blockquote><!--Cuerpo del Upanel--><div class="UpanelBody col s12 m9"><div class="card"><div style="padding-bottom:30px;" class="container"><br><div class="input-field col s12"><input id="nuevoEspacio-codigo" type="text" class="validate"><label for="nuevoEspacio-codigo">Código del Espacio</label></div><div class="input-field col s12"><select id="nuevoEspacio-planta"><option value="" disabled selected>Elija una opción</option><option value="1">1° Planta</option><option value="2">2° Planta</option></select><label>Planta</label></div><div class="input-field col s12"><input id="nuevoEspacio-descripcion" type="text" class="validate"><label for="nuevoEspacio-descripcion">Descripción</label></div><p><input type="checkbox" class="filled-in checkbox-blue" id="nuevoEspacio-aireAcondicionado"/><label for="nuevoEspacio-aireAcondicionado">Aire acondicionado</label></p><button onclick="nuevoEspacio()" class="btn waves-effect blue darken-2" type="button"><i style="margin-right:5px;" class="material-icons left">save</i>Guardar</button></div></div></div></div><!--EDITAR ESPACIO--><div id="editar-espacios" class="UPanel editar-espacios espacios-uPanel"><!--Titulo del UPanel--><blockquote><h4>Editar Espacio</h4></blockquote><!--Cuerpo del Upanel--><div class="UpanelBody col s12 m9"><div class="card"><ul id="espacios-editar-tabs-headers" class="tabs tabs-fixed-width"></ul></div><div id="espacios-editar-tabs"></div></div></div>';
                 $( "#espaciosPaneles" ).append( elm );
                 
                 //Nombre y tipo
                $('.chips-initial').material_chip({
                    data: [],
                });
                Materialize.updateTextFields();
                $('#userName').text(_user.nombre+' '+_user.primer_apellido+' '+_user.segundo_apellido);
                $('#userType').text(_user.tipo);
                verUsuarios();
                getSlctdsPndts(_.z.zlk)
                streamSlctds(_.z.zlk);
                MyActivity();
                break;
             case "Docente":
                
                           
                elm = '<li><a data-constrainwidth="false" data-beloworigin="true" class="dropdown-button grey-text text-lighten-2" href="#!" data-activates="user_options"><i class="material-icons left">account_circle</i>'+_user.nombre+' '+_user.primer_apellido+' '+_user.segundo_apellido+'</a></li>';
                $( "#nav-mobile" ).append( elm );
                 
                elm = '<ul id="user_options" class="dropdown-content grey lighten-3"><li><a onclick="display_Panel(this); MyActivity();" class="actividad" href="#!"><i class="material-icons left">person</i>Usuario</a></li><li class="divider"></li><li><a onclick="signOut()" href="#!"><i class="material-icons left">exit_to_app</i>Cerrar sesión</a>';
                $( "#nav-mobile" ).append( elm ); 
                 
                elm = '<!--Mi Actividad Panel--><div id="actividadPanel" class="Panel adminPanel"><div class="row"><!--Menu de la izquierda--><div id="actividadSideMenu" class="col s12 m3 hide-on-med-and-down"><div class="card"><div class="container"><br><div class="row"><div style="padding-left:0px;" class="col s2 left-align"><h6><i class="material-icons medium  blue-text text-darken-2">account_circle</i></h6></div><div id="userName" style="padding-left:20px; padding-top:6px; font-size:20px;" class="col s10 left-align"></div><div class="col s12 left-align"><blockquote><h6><big id="userType"></big></h6></blockquote></div><br></div></div></div><!--Todos menos los estudiantes--><div class="collection"><a id="ver-actividad-btn" href="#!" onclick="display_uPanel(this); MyActivity();" class="actividad-sideNav ver collection-item active"><i class="material-icons left">timeline</i>Mi Actividad</a></div><div class="collection"><a id="historial-actividad-btn" href="#!" onclick="display_uPanel(this); myHistorySolicitudes();" class="actividad-sideNav historial collection-item"><i class="material-icons left">history</i>Mi historial de solicitudes</a><a id="soporte-actividad-btn" href="#!" onclick="display_uPanel(this); mySoporteLista();" class="actividad-sideNav soporte collection-item"><i class="material-icons left">view_agenda</i>Mi soporte en lista</a><a id="pendientes-actividad-btn" href="#!" onclick="display_uPanel(this); mySolicitudesPendientes();" class="actividad-sideNav pendientes collection-item"><i class="material-icons left">warning</i>Mis solicitudes en pendientes</a></div><div class="collection"><a id="config-actividad-btn" href="#!" onclick="display_uPanel(this); userConfig();" class="actividad-sideNav config collection-item"><i class="material-icons left">settings</i>Configuración del Usuario</a><a onclick="signOut()" href="#!" class="collection-item"><i class="material-icons left">exit_to_app</i>Cerrar Sesión</a></div></div><!--Contenido--><div id="actividadPaneles" class="col s12 m8"><!--Todos menos los estudiantes--><div id="ver-actividad" class="UPanel ver-actividad actividad-uPanel active-uPanel"><!--Titulo del UPanel--><blockquote><div class="row"><div class="col s6"><h4>Mi Actividad</h4></div><div class="input-field col s3"><select multiple><option value="1" selected disabled>Ninguno</option><option value="1">Activos</option><option value="2">Espacios</option><option value="2">Usuarios</option><option disabled>Actividad</option><option value="3">Nuevo</option><option value="4">Edición</option><option value="4">Eliminación</option></select><label>Filtros</label></div><div class="input-field col s3"><input id="last_name" type="text" class="validate"><label for="last_name">Id</label></div></div></blockquote><!--Cuerpo del Upanel--><div class="UpanelBody"><div id="displayMyActivity" class="row"></div></div></div><div id="historial-actividad" class="UPanel historial-actividad actividad-uPanel"><!--Titulo del UPanel--><blockquote><div class="row"><div class="col s6"><h4>Mi historial de solicitudes</h4></div><div class="input-field col s3"><select multiple><option value="1" selected disabled>Ninguno</option></select><label>Filtros</label></div><div class="input-field col s3"><input id="last_name" type="text" class="validate"><label for="last_name">Id</label></div></div></blockquote><!--Cuerpo del Upanel--><div class="UpanelBody"><div id="displayMyHistorialSolicitudes" class="row"></div></div></div><div id="soporte-actividad" class="UPanel soporte-actividad actividad-uPanel"><!--Titulo del UPanel--><blockquote><div class="row"><div class="col s12"><h4>Mi soporte en lista</h4></div></div></blockquote><!--Cuerpo del Upanel--><div class="UpanelBody"><div id="displayMyListSoporte" class="row"></div></div></div><div id="pendientes-actividad" class="UPanel pendientes-actividad actividad-uPanel"><!--Titulo del UPanel--><blockquote><div class="row"><div class="col s6"><h4>Mi solicitudes pendientes</h4></div><div class="input-field col s3"><select multiple><option value="1" selected disabled>Ninguno</option></select><label>Filtros</label></div><div class="input-field col s3"><input id="last_name" type="text" class="validate"><label for="last_name">Id</label></div></div></blockquote><!--Cuerpo del Upanel--><div class="UpanelBody"><div id="displayMyPendientes" class="row"></div></div></div><div id="config-actividad" class="UPanel config-actividad actividad-uPanel"><!--Titulo del UPanel--><blockquote><div class="row"><div class="col s12"><h4>Configuración del usuario</h4></div></div></blockquote><!--Cuerpo del Upanel--><div class="UpanelBody"><div id="config-form" class="col s12 m9 card"><div style="padding-bottom:30px;" class="container"><br><div class="input-field col s12"><input id="config-nombre" class="validate" type="text"><label for="usuarios-editar-nuevo-nombre">Nombre</label></div><div class="input-field col s6"><input id="config-apellido1" class="validate" type="text"><label for="config-apellido1" class="">1° Apellido</label></div><div class="input-field col s6"><input id="config-apellido2" class="validate" type="text"><label for="config-apellido2">2° Apellido</label></div><div class="input-field col s12"><input id="config-pass" class="validate" type="password"><label for="config-pass" class="">Contraseña Actual</label></div><div class="input-field col s12"><input id="config-npass" class="validate" type="password"><label for="config-npass" class="">Contraseña Nueva<small>(Opcional)</small></label></div><br><button id="config-btn" onclick="edituUser()" class="btn waves-effect blue darken-2" type="button"><i style="margin-right:5px;" class="material-icons left">save</i>Guardar</button></div></div></div></div></div></div></div>';
                 $( "#tools" ).append( elm );
                 
                //activos menu
                elm = '<div class="collection"><a id="nuevo-activos-btn" href="#!" onclick="display_uPanel(this)" class="activos-sideNav nuevo collection-item"><i class="material-icons left">add_circle_outline</i>Nuevo Activo</a><a id="editar-activos-btn" href="#!" onclick="display_uPanel(this); nuevoEditarActivos(this);" class="activos-sideNav editar collection-item"><i class="material-icons left">create</i>Editar Activos</a><a id="eliminar-activos-btn" onclick="eliminar_alert(this)" href="#!" class="collection-item"><i class="material-icons left">delete_forever</i>Eliminar Activos</a></div>';
                $( "#activosSideMenu" ).append( elm );
                //activos paneles
                elm = '<!--NUEVO ACTIVO--><div id="nuevo-activos" class="UPanel nuevo-activos activos-uPanel"><!--Titulo del UPanel--><blockquote><h4>Nuevo Activo</h4></blockquote><!--Cuerpo del Upanel--><div class="UpanelBody col s12 m9"><div class="card"><div style="padding-bottom:30px;" class="container"><br><div class="input-field col s6"><select id="nuevoActivo-tipo"><option value="" disabled selected>Elija una opción</option><option value="Auxiliar">Auxiliar</option><option value="Equipo">Equipo</option><option value="Mobiliario">Mobiliario</option></select><label>Tipo de Activo</label></div><div class="input-field col s6"><input id="nuevoActivo-cantidad" type="number" class="validate" value="1"><label for="nuevoActivo-cantidad">Cantidad</label></div><div class="input-field col s12"><input id="nuevoActivo-descripcion" type="text" class="validate"><label for="nuevoActivo-descripcion">Descripción</label></div><div class="input-field col s12"><div id="nuevoActivo-ci" class="chips chips-initial"></div></div><div class="input-field col s12"><select id="nuevoActivo-espacio"></select><label>Espacio del activo</label></div><button onclick="nuevoActivo()" class="btn waves-effect blue darken-2" type="button"><i style="margin-right:5px;" class="material-icons left">save</i>Guardar</button></div></div></div></div><!--EDITAR ACTIVOS--><div id="editar-activos" class="UPanel editar-activos activos-uPanel"><!--Titulo del UPanel--><blockquote><h4>Editar Activos</h4></blockquote><!--Cuerpo del Upanel--><div class="UpanelBody col s12 m9"><div class="card"><ul id="activos-editar-tabs-headers" class="tabs tabs-fixed-width"><li class="tab col s3"><a class="" href="#test-swipe-1">ID-#</a></li><li class="tab col s3"><a class="active" href="#activos-editar-nuevo">Nuevo</a></li></ul></div><div id="activos-editar-tabs"></div></div></div>';
                $( "#activosPaneles" ).append( elm );
                 
                 //Nombre y tipo
                $('#userName').text(_user.nombre+' '+_user.primer_apellido+' '+_user.segundo_apellido);
                $('#userType').text(_user.tipo);
                 MyActivity();
                break;
             case "Estudiante":
                
                   //navbar                 
                elm = '<li><a data-constrainwidth="false" data-beloworigin="true" class="dropdown-button grey-text text-lighten-2" href="#!" data-activates="user_options"><i class="material-icons left">account_circle</i>'+_user.nombre+' '+_user.primer_apellido+' '+_user.segundo_apellido+'</a></li>';
                $( "#nav-mobile" ).append( elm );
                 
                elm = '<ul id="user_options" class="dropdown-content grey lighten-3"><li><a onclick="display_Panel(this); myHistorySolicitudes();" class="actividad" href="#!"><i class="material-icons left">person</i>Usuario</a></li><li class="divider"></li><li><a onclick="signOut()" href="#!"><i class="material-icons left">exit_to_app</i>Cerrar sesión</a>';
                $( "#nav-mobile" ).append( elm ); 
                 
                elm = '<!--Mi Actividad Panel--><div id="actividadPanel" class="Panel adminPanel"><div class="row"><!--Menu de la izquierda--><div id="actividadSideMenu" class="col s12 m3 hide-on-med-and-down"><div class="card"><div class="container"><br><div class="row"><div style="padding-left:0px;" class="col s2 left-align"><h6><i class="material-icons medium  blue-text text-darken-2">account_circle</i></h6></div><div id="userName" style="padding-left:20px; padding-top:6px; font-size:20px;" class="col s10 left-align"></div><div class="col s12 left-align"><blockquote><h6><big id="userType"></big></h6></blockquote></div><br></div></div></div><div class="collection"><a id="historial-actividad-btn" href="#!" onclick="display_uPanel(this); myHistorySolicitudes();" class="actividad-sideNav historial collection-item active"><i class="material-icons left">history</i>Mi historial de solicitudes</a><a id="soporte-actividad-btn" href="#!" onclick="display_uPanel(this); mySoporteLista();" class="actividad-sideNav soporte collection-item"><i class="material-icons left">view_agenda</i>Mi soporte en lista</a><a id="pendientes-actividad-btn" href="#!" onclick="display_uPanel(this); mySolicitudesPendientes();" class="actividad-sideNav pendientes collection-item"><i class="material-icons left">warning</i>Mis solicitudes en pendientes</a></div><div class="collection"><a id="config-actividad-btn" href="#!" onclick="display_uPanel(this); userConfig();" class="actividad-sideNav config collection-item"><i class="material-icons left">settings</i>Configuración del Usuario</a><a onclick="signOut()" href="#!" class="collection-item"><i class="material-icons left">exit_to_app</i>Cerrar Sesión</a></div></div><!--Contenido--><div id="actividadPaneles" class="col s12 m8"><div id="historial-actividad" class="UPanel historial-actividad actividad-uPanel active-uPanel"><!--Titulo del UPanel--><blockquote><div class="row"><div class="col s6"><h4>Mi historial de solicitudes</h4></div><div class="input-field col s3"><select multiple><option value="1" selected disabled>Ninguno</option></select><label>Filtros</label></div><div class="input-field col s3"><input id="last_name" type="text" class="validate"><label for="last_name">Id</label></div></div></blockquote><!--Cuerpo del Upanel--><div class="UpanelBody"><div id="displayMyHistorialSolicitudes" class="row"></div></div></div><div id="soporte-actividad" class="UPanel soporte-actividad actividad-uPanel"><!--Titulo del UPanel--><blockquote><div class="row"><div class="col s12"><h4>Mi soporte en lista</h4></div></div></blockquote><!--Cuerpo del Upanel--><div class="UpanelBody"><div id="displayMyListSoporte" class="row"></div></div></div><div id="pendientes-actividad" class="UPanel pendientes-actividad actividad-uPanel"><!--Titulo del UPanel--><blockquote><div class="row"><div class="col s6"><h4>Mi solicitudes pendientes</h4></div><div class="input-field col s3"><select multiple><option value="1" selected disabled>Ninguno</option></select><label>Filtros</label></div><div class="input-field col s3"><input id="last_name" type="text" class="validate"><label for="last_name">Id</label></div></div></blockquote><!--Cuerpo del Upanel--><div class="UpanelBody"><div id="displayMyPendientes" class="row"></div></div></div><div id="config-actividad" class="UPanel config-actividad actividad-uPanel"><!--Titulo del UPanel--><blockquote><div class="row"><div class="col s12"><h4>Configuración del usuario</h4></div></div></blockquote><!--Cuerpo del Upanel--><div class="UpanelBody"><div id="config-form" class="col s12 m9 card"><div style="padding-bottom:30px;" class="container"><br><div class="input-field col s12"><input id="config-nombre" class="validate" type="text"><label for="usuarios-editar-nuevo-nombre">Nombre</label></div><div class="input-field col s6"><input id="config-apellido1" class="validate" type="text"><label for="config-apellido1" class="">1° Apellido</label></div><div class="input-field col s6"><input id="config-apellido2" class="validate" type="text"><label for="config-apellido2">2° Apellido</label></div><div class="input-field col s12"><input id="config-pass" class="validate" type="password"><label for="config-pass" class="">Contraseña Actual</label></div><div class="input-field col s12"><input id="config-npass" class="validate" type="password"><label for="config-npass" class="">Contraseña Nueva<small>(Opcional)</small></label></div><br><button id="config-btn" onclick="edituUser()" class="btn waves-effect blue darken-2" type="button"><i style="margin-right:5px;" class="material-icons left">save</i>Guardar</button></div></div></div></div></div></div></div>';
                 $( "#tools" ).append( elm );
                 
                //Nombre y tipo
                $('#userName').text(_user.nombre+' '+_user.primer_apellido+' '+_user.segundo_apellido);
                $('#userType').text(_user.tipo); 
                 myHistorySolicitudes();
                break;
             default:
                 rfcx();
                 break;
         }
        $('select').material_select();
        $('.tabs').tabs({ 
                        swipeable: true,
                        onShow: function(){}
                    });
        $('.nav-tabs').tabs({ 
                            swipeable: true,
                            onShow: function(){
                                    display_tabPanels();
                            }
        });
        $('.dropdown-button').dropdown({
                                        constrainWidth: true, // Does not change width of dropdown to that of the activator
                                        belowOrigin: true, // Displays dropdown below the button
                                        alignment: 'right', // Displays dropdown with edge aligned to the left of button
                                        stopPropagation: true
                                        }
        );
        $(".button-collapse").sideNav();
        $('.datepicker').pickadate({
            selectMonths: false, // Creates a dropdown to control month
            selectYears: 1, // Creates a dropdown of 15 years to control year,
            closeOnSelect: false, // Close upon selecting a date,
            labelMonthNext: 'Mes siguiente',
            labelMonthPrev: 'Mes anterior',
            labelMonthSelect: 'Seleccione un mes',
            labelYearSelect: 'Seleccione un año',
            monthsFull: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ],
            monthsShort: [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic' ],
            weekdaysFull: [ 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado' ],
            weekdaysShort: [ 'Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab' ],
            weekdaysLetter: [ 'D', 'L', 'K', 'M', 'J', 'V', 'S' ],
            today: 'Hoy',
            clear: 'Reiniciar',
            close: 'Cerrar'
        });
        $('.tooltipped').tooltip({delay: 50});
        verEspacios();
        verActivos();
        $('#loading').modal('close');
    }else{
         rfcx();
    }
}
function display_tabPanels() {
    var tabPanels = document.getElementsByClassName("tabPanels");
    tabPanels[0].style.display ="block";
    var Panels = document.getElementsByClassName("Panel");
    for (var i=0; i<Panels.length; i++){
        Panels[i].style.display="none";
    }
}
function display_Panel(item){
    var tabPanels = document.getElementsByClassName("tabPanels");
    tabPanels[0].style.display="none";
    var Panels = document.getElementsByClassName("Panel");
    for (var i=0; i<Panels.length; i++){
        Panels[i].style.display="none";
    }
    var show = item.classList[0];
    if (item.classList.length>1){
       /* var uPanel = new Object();
        uPanel.addClass(show+"-x "+item.classList.[1]+" "+);
        */
    }
    document.getElementById(show+"Panel").style.display="block";
}
function display_uPanel(item){
    var uPanel_string=item.classList[0];
    var UPanel_array=uPanel_string.split("-");
    var uPanel=UPanel_array[0];
    var tipo=item.classList[1];
    var lista=document.getElementsByClassName(uPanel_string);
    for (var i=0; i<lista.length; i++){
        for (var u=0; u<lista[i].classList.length; u++){
            if (lista[i].classList[u]=="active"){
                $("#"+lista[i].id).removeClass("active");
            }
        }
    }
    var uPanels=document.getElementsByClassName(uPanel+"-uPanel");
    for (var i=0; i<uPanels.length; i++){
        for (var u=0; u<uPanels[i].classList.length; u++){
            if (uPanels[i].classList[u]=="active-uPanel"){
                $("#"+uPanels[i].id).removeClass("active-uPanel");
            }
        }
    }
     for (var i=0; i<lista.length; i++){
        for (var u=0; u<lista[i].classList.length; u++){
            if (lista[i].classList[u]==tipo){
                $("#"+lista[i].id).addClass("active");
            }
        }
    }
    for (var i=0; i<uPanels.length; i++){
        for (var u=0; u<uPanels[i].classList.length; u++){
            if (uPanels[i].classList[u]==tipo+"-"+uPanel){
                $("#"+uPanels[i].id).addClass("active-uPanel");
            }
        }
    }
}
function nuevoEspacio(){
    $('#loading').modal('open');
    //validación
    var valido=true;
    
    if (document.getElementById("nuevoEspacio-codigo").value==""){
        valido=false;
    }else{
        if ($.isNumeric(document.getElementById("nuevoEspacio-codigo").value)==false){
            valido=false;
        }
    }
    if (document.getElementById("nuevoEspacio-planta").value==""){
        valido=false;
    }
    if (document.getElementById("nuevoEspacio-descripcion").value==""){
        valido=false;
    }
    if (valido==true){
        var nuevoEspacio = {
                codigo: document.getElementById("nuevoEspacio-codigo").value,
                planta: document.getElementById("nuevoEspacio-planta").value,
                descripcion: document.getElementById("nuevoEspacio-descripcion").value,
                aireAcondicionado: document.getElementById("nuevoEspacio-aireAcondicionado").checked,
                user:_user.correo
        }
        $.ajax({
                type: "POST",
                url: ruta+"/nuevoEspacio",
                dataType: "json",   
                data: JSON.stringify(nuevoEspacio),
                timeout: 5000,
                success: function(){
                   $('#loading').modal('close');
                   document.getElementById("nuevoEspacio-codigo").value="";
                   document.getElementById("nuevoEspacio-descripcion").value="";
                   document.getElementById("nuevoEspacio-aireAcondicionado").checked=false;
                    var $toastContent = $('<span><i class="material-icons left">check</i> Espacio Guardado<span>');
                   Materialize.toast($toastContent, 5000, "green");
                },
                error: function(){
                   $('#loading').modal('close');
                   var $toastContent = $('<span><i class="material-icons left">error</i> Error de conexión</span>');
                   Materialize.toast($toastContent, 5000, "red");
                }
        }); 
    }else{
         $('#loading').modal('close');
         var $toastContent = $('<span><i class="material-icons left">warning</i> Debe llenar todos los campos correctamente<span>');
         Materialize.toast($toastContent, 5000, "orange");
    }
    
}
function verEspacios(){
    var messenger=new Object();
    $.ajax({
                type: "POST",
                url: ruta+"/verEspacios",
                dataType: "json",   
                data: JSON.stringify(messenger),
                timeout: 5000,
                success: function(res){
                   if (res.resultado==true){
                       displayEspacios(res.datos, true);
                       $('#loading').modal('close');
                   }else{
                       $('#loading').modal('close');
                   }
                },
                error: function(){
                   $('#loading').modal('close');
                }
        });
}
function displayEspacios(espacios, b){
    if (b==true){
        _espacios=espacios;
    }
    document.getElementById("solicitar-espacios-espacio").innerHTML="";
    document.getElementById("solicitar-soporte-espacio").innerHTML="";
    document.getElementById("activos-filtro-espacio").innerHTML='<option value="Todos" selected>Todos</option>';
    for (var i = 0; i<espacios.length; i++){
        var option= '<option value="'+espacios[i].codigo+'">'+espacios[i].codigo+'</option>';
        $( "#solicitar-espacios-espacio" ).append( option );
        $( "#solicitar-soporte-espacio" ).append( option );
        $( "#activos-filtro-espacio" ).append( option );
    }
    $('#solicitar-espacios-espacio').material_select();
    $('#solicitar-soporte-espacio').material_select();
    $('#activos-filtro-espacio').material_select();
    
    document.getElementById("displayEspacios").innerHTML="";
    var displayEspacios="";
    var espacio="";
    var c=0;
    var optLista = '<option value="" disabled selected>Espacios</option>';
    var optg_1='<option disabled>1° Planta</option>';
    var optg_2='<option disabled>2° Planta</option>';
    for (var i=0; i<espacios.length; i++){
        if (espacios[i].planta=="1"){
            optg_1 = optg_1+'<option value="'+espacios[i].codigo+'">'+espacios[i].codigo+'</option>';
        }else{
            optg_2 = optg_2+'<option value="'+espacios[i].codigo+'">'+espacios[i].codigo+'</option>';
        }
        if (c==3){
            c=0;
        }
        if (c==0){
            displayEspacios='<div class="row">';
        } 
        espacio='<div id="elemento_'+espacios[i]._id+'" class="col s12 m4"><div class="card"><div style="padding-top:0px; padding-bottom:0px; padding-left:10px; padding-right:0px;" class="card-action grey lighten-2"><div class="row" style="margin-bottom:0px;"><div class="col s10"><p style="margin-bottom:10px;"><i class="material-icons left">place</i></p></div><div class="col s2"><p style="margin-bottom:10px;"><input type="checkbox" class="filled-in checkbox-blue espaciosCheckbox" id="'+espacios[i]._id+'"><label for="'+espacios[i]._id+'"></label></p></div></div></div><div style="padding-top:0px; padding-bottom:5px; padding-left:10px; padding-right:15px;" class="card-action"><h5>'+espacios[i].codigo+'<span style="cursor:pointer; padding:5px; padding-right:10px; padding-bottom:1px;" onclick="verAgenda('+"'"+espacios[i]._id+"'"+','+"'"+espacios[i].codigo+"'"+')" class="new badge blue darken-2" data-badge-caption=""><i class="material-icons left">today</i><b>Agenda</b></span></h5><h6><i style="margin-right:5px;" class="material-icons left">ac_unit</i></h6>'+get_aireEspacio(espacios[i].aireAcondicionado)+'<h6><i style="margin-right:5px;" class="material-icons left">layers</i>'+espacios[i].planta+'° Planta</h6></div><div style="padding-top:5px; padding-bottom:10px; padding-left:15px; padding-right:15px;" class="card-action"><h6><i style="margin-right:5px;" class="material-icons left">info_outline</i><b>Descripción</b></h6><p style="margin-top:10px; margin-bottom:10px;">'+espacios[i].descripcion+'</p></div></div></div>';
        displayEspacios=displayEspacios+espacio;
        if (c==2 || i==espacios.length-1){
            displayEspacios= displayEspacios+'</div>';
            var display=document.getElementById("displayEspacios").innerHTML+displayEspacios;
            document.getElementById("displayEspacios").innerHTML=display;
        }
        c++;
    }
    optLista = optLista + optg_1+optg_2;
    espaciosList = optLista;
    var select=document.getElementById("nuevoActivo-espacio");
    select.innerHTML=optLista;
   
    $('select').material_select();
}
function get_estadoEspacio(e){var estado="";if (e==true){estado = "Disponible";}else{estado = "Ocupado";}return estado;}
function get_aireEspacio(e){var estado="";if (e==true){estado = "Sí";}else{estado = "No";}return estado;}
function nuevoActivo(){
    $('#loading').modal('open');
    //validación
    var valido=true;
    
    if ($.isNumeric(document.getElementById("nuevoActivo-cantidad").value)==true){
        if (document.getElementById("nuevoActivo-cantidad").value<1){
           valido=false;
           $("#nuevoActivo-cantidad").removeClass("valid");
           $("#nuevoActivo-cantidad").addClass("invalid");
        }
    }else{
        valido=false;
    }
    if (document.getElementById("nuevoActivo-tipo").value==""){
        valido=false;
    }
    if (document.getElementById("nuevoActivo-descripcion").value==""){
        valido=false;
    }
    if (document.getElementById("nuevoActivo-espacio").value==""){
        valido=false;
    }
    var pci = $('.chips-initial').material_chip('data');
    var ci=new Array();
    if (pci.length==0){
        valido=false;
    }else{
        if (pci.length!=parseInt(document.getElementById("nuevoActivo-cantidad").value)){
             valido=false;
        }else{
            for (var i=0; i<pci.length; i++){
                ci.push(pci[i].tag);
            }
        }
    }
    
    
    if (valido==true){
        var nuevoActivo = {
                tipo: document.getElementById("nuevoActivo-tipo").value,
                descripcion: document.getElementById("nuevoActivo-descripcion").value,
                espacio: document.getElementById("nuevoActivo-espacio").value,
                cantidad: parseInt(document.getElementById("nuevoActivo-cantidad").value),
                ci: ci,
                user:_user.correo
        }
        $.ajax({
                type: "POST",
                url: ruta+"/nuevoActivo",
                dataType: "json",   
                data: JSON.stringify(nuevoActivo),
                timeout: 5000,
                success: function(res){
                   $('#loading').modal('close');
                    if (res.dup){
                        var $toastContent = $('<span><i class="material-icons left">warning</i>Almenos uno de los códigos institucionales ya existe<span>');
                        Materialize.toast($toastContent, 5000, "orange");
                    }else{
                       document.getElementById("nuevoActivo-descripcion").value="";
                       document.getElementById("nuevoActivo-cantidad").value="1";
                       $("#nuevoActivo-descripcion").removeClass("valid");
                       var nuevoActivo_tipo=document.getElementById("nuevoActivo-tipo").childNodes;
                       for (var i=0; i<nuevoActivo_tipo.length; i++){
                           if (nuevoActivo_tipo[i].nodeName=="OPTION"){
                               if (nuevoActivo_tipo[i].selected==true){
                                   nuevoActivo_tipo[i].selected=false;
                               }
                           }
                       }
                       nuevoActivo_tipo[1].selected=true;                   
                       var nuevoActivo_espacio=document.getElementById("nuevoActivo-espacio").childNodes;
                       for (var i=0; i<nuevoActivo_espacio.length; i++){
                           if (nuevoActivo_espacio[i].nodeName=="OPTION"){
                               if (nuevoActivo_espacio[i].selected==true){
                                   nuevoActivo_espacio[i].selected=false;
                               }
                           }
                       }
                       nuevoActivo_espacio[0].selected=true;
                       $('select').material_select();
                       var $toastContent = $('<span><i class="material-icons left">check</i> Activo Guardado<span>');
                       Materialize.toast($toastContent, 5000, "green");
                       $('.chips-initial').material_chip({data: []});
                    }
                   
                },
                error: function(){
                   $('#loading').modal('close');
                   var $toastContent = $('<span><i class="material-icons left">error</i> Error de conexión</span>');
                   Materialize.toast($toastContent, 5000, "red");
                }
        });
    }else{
         $('#loading').modal('close');
         var $toastContent = $('<span><i class="material-icons left">warning</i> Debe llenar todos los campos correctamente<span>');
         Materialize.toast($toastContent, 5000, "orange");
    }
    
    
    
}

function verActivos(){
    var messenger=new Object();
    $.ajax({
                type: "POST",
                url: ruta+"/verActivos",
                dataType: "json",   
                data: JSON.stringify(messenger),
                timeout: 5000,
                success: function(res){
                   if (res.resultado==true){
                       displayActivos(res.datos, true);
                       $('#loading').modal('close');
                   }else{
                       $('#loading').modal('close');
                   }
                },
                error: function(){
                   $('#loading').modal('close');
                }
        });
}
function hdfsb(){return JSON.parse(localStorage.x);}
function displayActivos(activos, b){
    if (b==true){
       _activos=activos; 
    }
    document.getElementById("solicitar-activos-lista").innerHTML="";
    for (var i = 0; i<activos.length; i++){
        var option= '<option value="'+activos[i].codigo+'">'+activos[i].codigo+'</option>';
        $( "#solicitar-activos-lista" ).append( option );
    }
    $('#solicitar-activos-lista').material_select();
    
    document.getElementById("displayActivos").innerHTML="";
    var displayActivos="";
    var espacio="";
    var c=0;
    var ids=new Array();
    for (var i=0; i<activos.length; i++){
        if (c==3){
            c=0;
        }
        if (c==0){
            displayActivos='<div class="row">';
        } 
        activo='<div id="elemento_'+activos[i]._id+'" class="col s12 m4"><div class="card"><div style="padding-top:0px; padding-bottom:0px; padding-left:10px; padding-right:0px;" class="card-action grey lighten-2"><div class="row" style="margin-bottom:0px;"><div class="col s9"><p style="margin-bottom:10px;"><i style="margin-right:10px;" class="material-icons left">'+getIconByTipo(activos[i].tipo)+'</i>'+activos[i].codigo+'</p></div><div class="col s3"><p class="right-align" style="margin-bottom:10px;"><input type="checkbox" class="filled-in checkbox-blue activosCheckbox" id="'+activos[i]._id+'" name="'+activos[i].codigo+'"><label for="'+activos[i]._id+'"></label></p></div></div></div><div style="padding-top:0px; padding-bottom:5px; padding-left:10px; padding-right:15px;" class="card-action"><h5>'+activos[i].tipo+'<span class="new badge blue darken-2 tooltipped" data-position="bottom" data-delay="50" data-tooltip="Código Institucional" data-badge-caption="">'+activos[i].codigoInstitucional+'</span></h5><h6><i style="margin-right:5px;" class="material-icons left">place</i><span>'+activos[i].espacio+'</span></h6></div><div style="padding-top:5px; padding-bottom:10px; padding-left:15px; padding-right:15px;" class="card-action"><h6><i style="margin-right:5px;" class="material-icons left">info_outline</i><b>Descripción</b></h6><p style="margin-top:10px; margin-bottom:10px;">'+activos[i].descripcion+'</p></div></div></div>';
        displayActivos=displayActivos+activo;
        ids[c]=activos[i]._id;
        if (c==2 || i==activos.length-1){
            displayActivos= displayActivos+'</div>';
            var display=document.getElementById("displayActivos").innerHTML+displayActivos;
            document.getElementById("displayActivos").innerHTML=display;
        }
        c++;
    }
    $('.tooltipped').tooltip({delay: 50});
}
// HEAD
function updateActivos(){

}
//=======



//>>>>>>> origin/master
function getIconByTipo(tipo){
    var icon="";
    if (tipo=="Auxiliar"){
        icon="power";    
    }
    if (tipo=="Equipo"){
        icon="laptop_mac";    
    }
    if (tipo=="Mobiliario"){
        icon="weekend";    
    }
    return icon;
}
function nuevoUsuario(){
    $('#loading').modal('open');
    var valido=true;
    if (document.getElementById("nuevoUsuario-email").value==""){
        valido=false;
    }else{
        for (var i=0; i<document.getElementById("nuevoUsuario-email").classList.length; i++){
            if (document.getElementById("nuevoUsuario-email").classList[i]=="invalid"){
                 valido=false;
                 $('#loading').modal('close');
                 var $toastContent = $('<span><i class="material-icons left">warning</i> Correo electrónico inválido</span>');
                 Materialize.toast($toastContent, 5000, "orange");
            }
        }
    }
    if (document.getElementById("nuevoUsuario-nombre").value==""){
        valido=false;
    }
    if (document.getElementById("nuevoUsuario-nombre").value==""){
        valido=false;
    }
    if (document.getElementById("nuevoUsuario-apellido1").value==""){
        valido=false;
    }
    if (document.getElementById("nuevoUsuario-apellido2").value==""){
        valido=false;
    }
    if (document.getElementById("nuevoUsuario-tipo").value==""){
        valido=false;
    }
    if (document.getElementById("nuevoUsuario-pass").value==""){
        valido=false;
    }
    if (document.getElementById("nuevoUsuario-cpass").value==""){
        valido=false;
    }else{
         if (document.getElementById("nuevoUsuario-pass").value!=document.getElementById("nuevoUsuario-cpass").value){
              valido=false;
              $('#loading').modal('close');
              var $toastContent = $('<span><i class="material-icons left">warning</i> Las contraseñas no coinciden</span>');
              Materialize.toast($toastContent, 5000, "orange");
              document.getElementById("nuevoUsuario-pass").value="";
              $("#nuevoUsuario-pass").removeClass("valid");
              $("#nuevoUsuario-pass").addClass("invalid");
              document.getElementById("nuevoUsuario-cpass").value="";
              $("#nuevoUsuario-cpass").removeClass("valid");
              $("#nuevoUsuario-cpass").addClass("invalid");
         }       
    }
    if (valido==true){
        var nuevoUsuario = {
                correo: document.getElementById("nuevoUsuario-email").value,
                nombre: document.getElementById("nuevoUsuario-nombre").value,
                primer_apellido: document.getElementById("nuevoUsuario-apellido1").value,
                segundo_apellido: document.getElementById("nuevoUsuario-apellido2").value,
                tipo: document.getElementById("nuevoUsuario-tipo").value,
                contrasena: document.getElementById("nuevoUsuario-pass").value
        }
        $.ajax({
                type: "POST",
                url: ruta+"/nuevoUsuario",
                dataType: "json",   
                data: JSON.stringify(nuevoUsuario),
                timeout: 5000,
                success: function(res){
                    if (res.resultado=="ok"){
                       //reiniciar campos y eso
                       $('#loading').modal('close');
                       document.getElementById("nuevoUsuario-email").value="";
                       $("#nuevoUsuario-email").removeClass("valid");
                       document.getElementById("nuevoUsuario-nombre").value="";
                       $("#nuevoUsuario-nombre").removeClass("valid");
                       document.getElementById("nuevoUsuario-apellido1").value="";
                       $("#nuevoUsuario-apellido1").removeClass("valid");
                       document.getElementById("nuevoUsuario-apellido2").value="";
                       $("#nuevoUsuario-apellido2").removeClass("valid");
                       var nuevoUsuario_tipo=document.getElementById("nuevoUsuario-tipo").childNodes;
                       for (var i=0; i<nuevoUsuario_tipo.length; i++){
                           if (nuevoUsuario_tipo[i].nodeName=="OPTION"){
                               if (nuevoUsuario_tipo[i].selected==true){
                                   nuevoUsuario_tipo[i].selected=false;
                               }
                           }
                       }
                       nuevoUsuario_tipo[1].selected=true;
                       $('select').material_select();
                       document.getElementById("nuevoUsuario-pass").value="";
                       $("#nuevoUsuario-pass").removeClass("valid");
                       document.getElementById("nuevoUsuario-cpass").value="";
                       $("#nuevoUsuario-cpass").removeClass("valid");
                       var $toastContent = $('<span><i class="material-icons left">check</i> Usuario Guardado<span>');
                       Materialize.toast($toastContent, 5000, "green");
                    }else if (res.resultado=="errA"){
                        $('#loading').modal('close');
                        $("#nuevoUsuario-email").removeClass("valid");
                        $("#nuevoUsuario-email").addClass("invalid");
                        var $toastContent = $('<span><i class="material-icons left">warning</i> Correo electrónico ya existe<span>');
                        Materialize.toast($toastContent, 5000, "orange");
                    }else{
                       $('#loading').modal('close');
                       var $toastContent = $('<span><i class="material-icons left">error</i> Error de conexión intente más tarde</span>');
                       Materialize.toast($toastContent, 5000, "red");
                    }
                   
                },
                error: function(){
                   $('#loading').modal('close');
                   var $toastContent = $('<span><i class="material-icons left">error</i> Error de conexión</span>');
                   Materialize.toast($toastContent, 5000, "red");
                }
        }); 
    }else{
         $('#loading').modal('close');
         var $toastContent = $('<span><i class="material-icons left">warning</i> Debe llenar todos los campos de forma válida<span>');
         Materialize.toast($toastContent, 5000, "orange");
    }
}
function verUsuarios(){
    var messenger=new Object();
    $.ajax({
                type: "POST",
                url: ruta+"/verUsuarios",
                dataType: "json",   
                data: JSON.stringify(messenger),
                timeout: 5000,
                success: function(res){
                   if (res.resultado==true){
                       displayUsuarios(res.datos, true);
                       $('#loading').modal('close');
                   }else{
                       $('#loading').modal('close');
                   }
                },
                error: function(){
                   $('#loading').modal('close');
                }
        });
}
function displayUsuarios(usuarios, b){
    if (b==true){
        _usuarios=usuarios;
    }
    document.getElementById("displayUsuarios").innerHTML="";
    var displayActivos="";
    var usuario="";
    for (var i=0; i<usuarios.length; i++){
        usuario='<tr id="elemento_'+usuarios[i]._id+'"><td><p class="center-align"><input type="checkbox" class="filled-in checkbox-blue usuariosCheckbox" id="'+usuarios[i]._id+'"/><label style="margin-left:16px;" for="'+usuarios[i]._id+'"></label></p></td><td>'+usuarios[i].correo+'</td><td>'+usuarios[i].nombre+'</td><td>'+usuarios[i].primer_apellido+'</td><td>'+usuarios[i].segundo_apellido+'</td><td>'+usuarios[i].tipo+'</td></tr>';
        var display=document.getElementById("displayUsuarios").innerHTML+usuario;
        document.getElementById("displayUsuarios").innerHTML=display;
    }
}
function cancelar_alert(){document.getElementById("aux_modals").innerHTML="";}
function eliminar_alert(elm){
    var elmArray=elm.id.split("-");
    var id=elmArray[1];
    var elementos = document.getElementsByClassName(id+"Checkbox");
    var checked= new Array();
    for (var i=0; i<elementos.length; i++){
        if (elementos[i].checked==true){
            checked.push(elementos[i]);
        }
    }
    var item="";
    if (id=="activos"){
        item="activo";
    }
    if (id=="espacios"){
        item="espacio";
    }
    if (id=="usuarios"){
        item="usuario";
    }
    var plural="";
    if (checked.length>1){
        plural="s"
    }
    var modal='<div id="eliminar-'+id+'-warning" class="modal"><div class="modal-content"><h2 class="center-align"><i class="material-icons large orange-text">warning</i></h2><h5 class="center-align">Se eliminarán <medium class="blue-text text-darken-2">'+checked.length+'</medium> '+item+plural+'</h5></div><div class="modal-footer"><a href="#!" onclick="eliminarX('+"'"+id+"'"+')" class="modal-action modal-close waves-effect waves-green btn blue darken-2">Eliminar</a><a href="#!" onclick="$( '+"'"+'#eliminar-'+id+'-warning'+"'"+' ).modal('+"'"+'close'+"'"+'); cancelar_alert();" class="modal-action modal-close waves-effect waves-green btn-flat">Cancelar</a></div></div>';
    document.getElementById("aux_modals").innerHTML=modal;
    $('.modal').modal({dismissible: false});
    $("#eliminar-"+id+"-warning").modal("open");
    document.getElementById("eliminar-"+id+"-warning").style.zIndex="999";
}
function rfcx(){window.location="/";}
function eliminarX(id){
    $("#eliminar-"+id+"-warning").modal("close");
    document.getElementById("aux_modals").innerHTML="";
    $('#loading').modal('open');
    var elementos = document.getElementsByClassName(id+"Checkbox");
    var checked= new Array();
    for (var i=0; i<elementos.length; i++){
        if (elementos[i].checked==true){
            checked.push(elementos[i]);
        }
    }
    var messenger= new Object()
    messenger.elementos = new Array();
    messenger.tipo = id;
    messenger.user=_user.correo;
    for (var i=0; i<checked.length; i++){
        messenger.elementos.push(checked[i].id);
    }
    var item="";
    if (id=="activos"){
        item="Activos";
    }
    if (id=="espacios"){
        item="Espacios";
    }
    if (id=="usuarios"){
        item="Usuarios";
    }
    $.ajax({
        type: "POST",
        url: ruta+"/eliminar"+item,
        dataType: "json",   
        data: JSON.stringify(messenger),
        timeout: 5000,
        success: function(res){
            $('#loading').modal('close');
            if (res.resultado=="ok"){
                if (res.tipo=="Activo"){
                    verActivos();
                }
                if (res.tipo=="Espacio"){
                    verEspacios();
                }
                if (res.tipo=="Usuario"){
                    verUsuarios();
                }
                var mensaje="";
                var plural="";
                if (res.elementos>1){
                    plural="s";
                }
                mensaje='<span><i class="material-icons left">check</i> '+res.tipo+plural+' Eliminado'+plural+'<span>';
                var $toastContent = $(mensaje);
                Materialize.toast($toastContent, 5000, "green");
            }else{
                var $toastContent = $('<span><i class="material-icons left">error</i> Error de conexión intente más     tarde</span>');
                Materialize.toast($toastContent, 5000, "red");
            }
        },
        error: function(){
            $('#loading').modal('close');
            var $toastContent = $('<span><i class="material-icons left">error</i> Error de conexión</span>');
            Materialize.toast($toastContent, 5000, "red");
        }
    });
}
function nuevoEditarActivos(elm){
    document.getElementById("activos-editar-tabs-headers").innerHTML="";
    document.getElementById("activos-editar-tabs").innerHTML="";
    var elmArray=elm.id.split("-");
    var id=elmArray[1];
    var elementos = document.getElementsByClassName(id+"Checkbox");
    var checked= new Array();
    for (var i=0; i<elementos.length; i++){
        if (elementos[i].checked==true){
            checked.push(elementos[i]);
        }
    }
    var active="";
    if (checked.length==0){
        active="active";
    }
    var tab_header= '<li class="tab col s3"><a class="'+active+'" href="#activos-editar-nuevo">Nuevo</a>';    
    $( "#activos-editar-tabs-headers" ).append( tab_header );
    var tab_body='<div id="activos-editar-nuevo" class="col s12 card"><div style="padding-bottom:30px;" class="container"><br><div><h5 class="center-align">Seleccione activos para editar</h5></div></div></div>';
    $( "#activos-editar-tabs" ).append( tab_body );
    if (checked.length>0){
        var descripcionValue="";
        var estadoValue="";
        var espacioValue="";
        var lista_de_options=new Array();
        for (var i=0; i<checked.length; i++){
            if (i==0){
                active="active";
            }else{
               active="";
            }
            tab_header='<li class="tab col s3"><a class="'+active+'" href="#activos-editar-'+checked[i].id+'">'+checked[i].name+'</a>';
           $( "#activos-editar-tabs-headers" ).append( tab_header );

            for (var u=0; u<_activos.length; u++){
                if (_activos[u]._id==checked[i].id){
                   descripcionValue = _activos[u].descripcion;
                   estadoValue= _activos[u].estado;
                   espacioValue= _activos[u].espacio;
                }
            }
            tab_body='<div id="activos-editar-'+checked[i].id+'" class="col s12 card"> <i onclick="editClose(this, '+"'activos'"+')" id="editX-'+checked[i].id+'" style="margin-top:15px; cursor:pointer;" class="material-icons right">clear</i><div style="padding-bottom:30px;" class="container"><br><br> <div class="input-field col s12"><input id="activos-editar-'+checked[i].id+'-descripcion" type="text" class="active validate" value="'+descripcionValue+'"><label for="activos-editar-'+checked[i].id+'-descripcion">Descripción</label></div><div class="input-field col s12"><select  id="activos-editar-'+checked[i].id+'-espacio">'+espaciosList+'</select></div><div class="input-field col s12" style="padding-bottom:20px;"><button id="activos-editar-'+checked[i].id+'-btn" name="'+checked[i].name+'" onclick="editarElemento(this,'+"'activos'"+')" class="btn waves-effect blue darken-2" type="button"><i style="margin-right:5px;" class="material-icons left">save</i>Guardar</button></div><br></div></div>';
            $( "#activos-editar-tabs" ).append( tab_body );
            var editarActivo_espacio=document.getElementById('activos-editar-'+checked[i].id+'-espacio').childNodes;
            for (var u=0; u<editarActivo_espacio.length; u++){
               if (editarActivo_espacio[u].nodeName=="OPTION"){
                   if (editarActivo_espacio[u].innerHTML==espacioValue){
                      lista_de_options.push(editarActivo_espacio[u]);
                      editarActivo_espacio[u].setAttribute("selected", true);
                   }
               }
            }
        }   
    }
     $('#activos-editar-tabs-headers').tabs({ swipeable: true});
     Materialize.updateTextFields();
     $('select').material_select();
}
function nuevoEditarEspacios(elm){
    document.getElementById("espacios-editar-tabs-headers").innerHTML="";
    document.getElementById("espacios-editar-tabs").innerHTML="";
    var elmArray=elm.id.split("-");
    var id=elmArray[1];
    var elementos = document.getElementsByClassName(id+"Checkbox");
    var checked= new Array();
    for (var i=0; i<elementos.length; i++){
        if (elementos[i].checked==true){
            checked.push(elementos[i]);
        }
    }
    var active="";
    if (checked.length==0){
        active="active";
    }
    var tab_header= '<li class="tab col s3"><a class="'+active+'" href="#espacios-editar-nuevo">Nuevo</a>';    
    $( "#espacios-editar-tabs-headers" ).append( tab_header );
    var tab_body='<div id="espacios-editar-nuevo" class="col s12 card"><div style="padding-bottom:30px;" class="container"><br><div><h5 class="center-align">Seleccione espacios para editar</h5></div></div></div>';
    $( "#espacios-editar-tabs" ).append( tab_body );
    if (checked.length>0){
        var descripcionValue="";
        var codigoValue="";
        var plantaValue="";
        var aireValue=false;
        var estadoValue=false;
        for (var i=0; i<checked.length; i++){
            if (i==0){
                active="active";
            }else{
               active="";
            }
            for (var u=0; u<_espacios.length; u++){
                if (_espacios[u]._id==checked[i].id){
                   codigoValue = _espacios[u].codigo;
                   descripcionValue = _espacios[u].descripcion;
                   plantaValue= _espacios[u].planta;
                   aireValue= _espacios[u].aireAcondicionado;
                   estadoValue= _espacios[u].estado;
                }
            }
            tab_header='<li class="tab col s3"><a class="'+active+'" href="#espacios-editar-'+checked[i].id+'">'+codigoValue+'</a>';
            
           $( "#espacios-editar-tabs-headers" ).append( tab_header );
            
            tab_body='<div id="espacios-editar-'+checked[i].id+'" class="col s12 card"><i onclick="editClose(this, '+"'espacios'"+')" id="editX-'+checked[i].id+'" style="margin-top:15px; cursor:pointer;" class="material-icons right">clear</i><div style="padding-bottom:30px;" class="container"><br><div class="input-field col s12"><select id="espacios-editar-'+checked[i].id+'-planta"><option value="" disabled>Elija una opción</option><option value="1">1° Planta</option><option value="2">2° Planta</option></select><label>Planta</label></div><div class="input-field col s12"><input id="espacios-editar-'+checked[i].id+'-descripcion" value="'+descripcionValue+'" type="text" class="validate"><label for="espacios-editar-'+checked[i].id+'-descripcion">Descripción</label></div><p><input type="checkbox" class="filled-in checkbox-blue" id="espacios-editar-'+checked[i].id+'-aire"/><label for="espacios-editar-'+checked[i].id+'-aire">Aire acondicionado</label></p><button id="espacios-editar-'+checked[i].id+'-btn" name="'+codigoValue+'" onclick="editarElemento(this,'+"'espacios'"+')" class="btn waves-effect blue darken-2" type="button"><i style="margin-right:5px;" class="material-icons left">save</i>Guardar</button></div></div>';
            
            $( "#espacios-editar-tabs" ).append( tab_body );
            
            var editarEspacio_planta=document.getElementById('espacios-editar-'+checked[i].id+'-planta').childNodes;
            for (var u=0; u<editarEspacio_planta.length; u++){
               if (editarEspacio_planta[u].nodeName=="OPTION"){
                   if (editarEspacio_planta[u].innerHTML==plantaValue+'° Planta'){
                       editarEspacio_planta[u].setAttribute("selected", true);
                   }
               }
            }
            if (aireValue==true){
                var checkbox=document.getElementById('espacios-editar-'+checked[i].id+'-aire');
                    checkbox.setAttribute("checked", true);
            }
        }   
    }
     $('#espacios-editar-tabs-headers').tabs({ swipeable: true});
     Materialize.updateTextFields();
     $('select').material_select();
}
function editClose(item, tipo){
    var id_elm=item.id;
    var id_elm_array = id_elm.split("-");
    var id=id_elm_array[1];
    document.getElementById(id).checked=false;
    switch(tipo){
        case "activos":
            var objeto=new Object();
            objeto.id="editar-activos-btn";
            nuevoEditarActivos(objeto);
        break;
        case "espacios":
            var objeto=new Object();
            objeto.id="editar-espacios-btn";
            nuevoEditarEspacios(objeto);
        break;
        case "usuarios":
            var objeto=new Object();
            objeto.id="editar-usuarios-btn";
            nuevoEditarUsuarios(objeto);
        break;
    }
}
function editarElemento(item, tipo){
    $('#loading').modal('open');
    var id_elm=item.id;
    var id_elm_array = id_elm.split("-");
    var id=id_elm_array[2];
    var codigo=item.name;
    var messenger=new Object();
    messenger.id=codigo;
    switch(tipo){
        case "activos":
            messenger.descripcion=document.getElementById('activos-editar-'+id+'-descripcion').value;
            messenger.espacio=document.getElementById('activos-editar-'+id+'-espacio').value;
            messenger.user=_user.correo;
            var keys = [];
            for(var k in messenger) keys.push(k);
            var valid= true;
            for (i = 0; i< keys.length; i++){
                if (messenger[keys[i]]==""){
                     valid=false;
                }
            }            
            if ( valid==true){
                $.ajax({
                    type: "POST",
                    url: ruta+"/editarActivo",
                    dataType: "json",   
                    data: JSON.stringify(messenger),
                    timeout: 5000,
                    success: function(res){
                       $('#loading').modal('close');
                       if (res.resultado=="ok"){
                            editClose({id:"a-"+res.id}, "activos");
                            var $toastContent = $('<span><i class="material-icons left">check</i> Activo Editado<span>');
                            Materialize.toast($toastContent, 5000, "green"); 
                       }else{
                           var $toastContent = $('<span><i class="material-icons left">error</i> Error de conexión intente más tarde</span>');
                           Materialize.toast($toastContent, 5000, "red");
                       }
                    },
                    error: function(){
                       $('#loading').modal('close');
                       var $toastContent = $('<span><i class="material-icons left">error</i> Error de conexión</span>');
                       Materialize.toast($toastContent, 5000, "red");
                    }
                });
            }else{
                $('#loading').modal('close');
                var $toastContent = $('<span><i class="material-icons left">warning</i> Debe llenar todos los campos</span>');
                Materialize.toast($toastContent, 5000, "orange");
            }
            
        break;
        case "espacios":
            messenger.descripcion=document.getElementById('espacios-editar-'+id+'-descripcion').value;
            messenger.planta=document.getElementById('espacios-editar-'+id+'-planta').value;   
            messenger.aireAcondicionado = document.getElementById('espacios-editar-'+id+'-aire').checked;
            messenger.user=_user.correo;
            var keys = [];
            for(var k in messenger) keys.push(k);
            var valid= true;
            for (i = 0; i< keys.length; i++){
                if (keys[i]!="aireAcondicionado"){   
                    if (messenger[keys[i]]==""){
                         valid=false;
                    }
                }
            }            
            if ( valid==true){
                $.ajax({
                    type: "POST",
                    url: ruta+"/editarEspacio",
                    dataType: "json",   
                    data: JSON.stringify(messenger),
                    timeout: 5000,
                    success: function(res){
                       $('#loading').modal('close');
                       if (res.resultado=="ok"){
                            editClose({id:"e-"+res.id}, "espacios");
                            var $toastContent = $('<span><i class="material-icons left">check</i> Espacio Editado<span>');
                            Materialize.toast($toastContent, 5000, "green"); 
                       }else{
                           var $toastContent = $('<span><i class="material-icons left">error</i> Error de conexión intente más tarde</span>');
                           Materialize.toast($toastContent, 5000, "red");
                       }
                    },
                    error: function(){
                       $('#loading').modal('close');
                       var $toastContent = $('<span><i class="material-icons left">error</i> Error de conexión</span>');
                       Materialize.toast($toastContent, 5000, "red");
                    }
                });
            }else{
                $('#loading').modal('close');
                var $toastContent = $('<span><i class="material-icons left">warning</i> Debe llenar todos los campos</span>');
                Materialize.toast($toastContent, 5000, "orange"); 
            }
            
        break;
         case "usuarios":
            messenger.nombre=document.getElementById('usuarios-editar-'+id+'-nombre').value;
            messenger.primer_apellido=document.getElementById('usuarios-editar-'+id+'-apellido1').value;
            messenger.segundo_apellido=document.getElementById('usuarios-editar-'+id+'-apellido2').value;
            messenger.contrasena=document.getElementById('usuarios-editar-'+id+'-pass').value;
            messenger.ncontrasena=document.getElementById('usuarios-editar-'+id+'-npass').value;
            messenger.user=_user.correo;
            messenger.tipo=document.getElementById('usuarios-editar-'+id+'-tipo').value;
            
            var keys = [];
            for(var k in messenger) keys.push(k);
            var valid= true;
            for (i = 0; i< keys.length; i++){
                if (messenger[keys[i]]==""){
                    if (keys[i]!="ncontrasena"){
                        valid=false;
                    }
                }
            }            
            if ( valid==true){
                $.ajax({
                    type: "POST",
                    url: ruta+"/editarUsuario",
                    dataType: "json",   
                    data: JSON.stringify(messenger),
                    timeout: 5000,
                    success: function(res){
                       $('#loading').modal('close');
                       if (res.resultado=="ok"){
                            editClose({id:"u-"+res.id}, "usuarios");
                            var $toastContent = $('<span><i class="material-icons left">check</i> Usuario Editado<span>');
                            Materialize.toast($toastContent, 5000, "green"); 
                       }else{
                           if (res.resultado=="ec"){
                               var $toastContent = $('<span><i class="material-icons left">warning</i> Contraseña incorrecta</span>');
                               Materialize.toast($toastContent, 5000, "orange");
                           }else{
                                var $toastContent = $('<span><i class="material-icons left">error</i> Error de conexión intente más tarde</span>');
                                Materialize.toast($toastContent, 5000, "red");   
                           }
                       }
                    },
                    error: function(){
                       $('#loading').modal('close');
                       var $toastContent = $('<span><i class="material-icons left">error</i> Error de conexión</span>');
                       Materialize.toast($toastContent, 5000, "red");
                    }
                });
            }else{
               $('#loading').modal('close');
               var $toastContent = $('<span><i class="material-icons left">warning</i> Debe llenar todos los campos</span>');
               Materialize.toast($toastContent, 5000, "orange"); 
            }
            
        break;
    }
}
function nuevoEditarUsuarios(elm){
    document.getElementById("usuarios-editar-tabs").innerHTML="";
    document.getElementById("usuarios-editar-tabs-headers").innerHTML="";
    var elmArray=elm.id.split("-");
    var id=elmArray[1];
    var elementos = document.getElementsByClassName(id+"Checkbox");
    var checked= new Array();
    for (var i=0; i<elementos.length; i++){
        if (elementos[i].checked==true){
            checked.push(elementos[i]);
        }
    }
    var active="";
    if (checked.length==0){
        active="active";
    }
    var tab_header= '<li class="tab col s3"><a class="'+active+'" href="#usuarios-editar-nuevo">Nuevo</a>';    
    $( "#usuarios-editar-tabs-headers" ).append( tab_header );
    var tab_body='<div id="usuarios-editar-nuevo" class="col s12 m9 card"><div style="padding-bottom:30px;" class="container"><br><div><h5 class="center-align">Seleccione usuarios para editar</h5></div></div></div>';
    $( "#usuarios-editar-tabs" ).append( tab_body );
    if (checked.length>0){
        var nombreValue="";
        var apellido1Value="";
        var apellido2Value="";
        var idValue="";
        for (var i=0; i<checked.length; i++){
            if (i==0){
                active="active";
            }else{
               active="";
            }
            for (var u=0; u<_usuarios.length; u++){
                if (_usuarios[u]._id==checked[i].id){
                   idValue = checked[i].id;
                   correoValue = _usuarios[u].correo;
                   nombreValue = _usuarios[u].nombre;
                   apellido1Value = _usuarios[u].primer_apellido;
                   apellido2Value= _usuarios[u].segundo_apellido;
                   tipoValue = _usuarios[u].tipo;
                }
            }
            var type=new Object();
            type.Administrador="";
            type.Soporte="";
            type.Docente="";
            type.Estudiante="";
            type[tipoValue]="selected";
            tab_header='<li class="tab col s3"><a class="'+active+'" href="#usuarios-editar-'+idValue+'">'+correoValue+'</a>';
           $( "#usuarios-editar-tabs-headers" ).append( tab_header );
            tab_body='<div id="usuarios-editar-'+idValue+'" class="col s12 m9 card"><i onclick="editClose(this, '+"'usuarios'"+')" id="editX-'+idValue+'" style="margin-top:15px; cursor:pointer;" class="material-icons right">clear</i><div style="padding-bottom:30px;" class="container"><br><div class="input-field col s12"><input value="'+nombreValue+'" id="usuarios-editar-'+idValue+'-nombre" type="text" class="validate"><label for="usuarios-editar-'+idValue+'-nombre">Nombre</label></div><div class="input-field col s6"><input value="'+apellido1Value+'" id="usuarios-editar-'+idValue+'-apellido1" type="text" class="validate"><label for="usuarios-editar-'+idValue+'-apellido1">1° Apellido</label></div><div class="input-field col s6"><input value="'+apellido2Value+'" id="usuarios-editar-'+idValue+'-apellido2" type="text" class="validate"><label for="usuarios-editar-'+idValue+'-apellido2">2° Apellido</label></div><div class="input-field col s12"><select id="usuarios-editar-'+idValue+'-tipo"><option value="" disabled>Elija una opción</option><option value="Administrador" '+type.Administrador+'>Administrador</option><option value="Soporte" '+type.Soporte+'>Soporte</option><option value="Docente" '+type.Docente+'> Docente</option><option value="Estudiante" '+ type.Estudiante+'>Estudiante</option></select><label>Tipo</label></div><div class="input-field col s6"><input id="usuarios-editar-'+idValue+'-pass" type="password" class="validate"><label for="usuarios-editar-'+idValue+'-pass">Contraseña</label></div><div class="input-field col s6"><input id="usuarios-editar-'+idValue+'-npass" type="password" class="validate"><label for="usuarios-editar-'+idValue+'-npass">Contraseña nueva <small>(Opcional)</small></label></div><button name="'+correoValue+'" id="usuarios-editar-'+idValue+'-btn" onclick="editarElemento(this,'+"'usuarios'"+')" class="btn waves-effect blue darken-2" type="button"><i style="margin-right:5px;" class="material-icons left">save</i>Guardar</button></div></div>';
            $( "#usuarios-editar-tabs" ).append( tab_body );
        }   
    }
     $('#usuarios-editar-tabs-headers').tabs({ swipeable: true});
     Materialize.updateTextFields();
     $('select').material_select();
}
function signOut(){
    var o = JSON.parse(localStorage.x);
    o.y=false;
    localStorage.x=JSON.stringify(o);
    window.location="/";
}
function nuevaSolicitud(elm){
    $('#loading').modal('open');
    var valido=true;
    switch(elm.name){
        case 'Activos':
            var solicitarActivos_lista=new Array();
            var solicitarActivos_fecha='';
            var solicitarActivos_dias=1;
            var solicitarActivos_comentario='';
            var solicitarActivos_boleta=false;
            var _solicitarActivos=document.getElementById("solicitar-activos-lista").childNodes;
            for (var i=0; i<_solicitarActivos.length; i++){
                if (_solicitarActivos[i].nodeName=="OPTION"){
                    if (_solicitarActivos[i].selected==true && _solicitarActivos[i].value!=''){
                       solicitarActivos_lista.push(_solicitarActivos[i].value);
                    }
                }
            }
            if (solicitarActivos_lista.length==0){
                valido=false;
            }
            solicitarActivos_fecha=document.getElementById("solicitar-activos-fecha").value;
            if (solicitarActivos_fecha==''){
                valido==false;
            }
            if ($.isNumeric(document.getElementById("solicitar-activos-dias").value)==true){

                if (parseInt(document.getElementById("solicitar-activos-dias").value)>0){
                    solicitarActivos_dias=document.getElementById("solicitar-activos-dias").value;
                }else{
                    valido=false;
                    $("#solicitar-activos-dias").removeClass("valid");
                    $("#solicitar-activos-dias").addClass("invalid");
                }
            }else{
                valido=false;
            }

            solicitarActivos_comentario=document.getElementById("solicitar-activos-comentario").value;
            if (solicitarActivos_comentario==''){
                valido==false;
            }
            solicitarActivos_boleta=document.getElementById("solicitar-activos-boleta").checked;
            if (valido==true){
                var solicitudActivo = {
                        solicitante: _user.correo,
                        tipo: "Activo",
                        mensaje: solicitarActivos_comentario,
                        listaDeActivos: solicitarActivos_lista,
                        fecha: solicitarActivos_fecha,
                        dias: solicitarActivos_dias,
                        boleta:solicitarActivos_boleta
                }
                $.ajax({
                        type: "POST",
                        url: ruta+"/nuevaSolicitud",
                        dataType: "json",   
                        data: JSON.stringify(solicitudActivo),
                        timeout: 5000,
                        success: function(){
                           $('#loading').modal('close');

                           document.getElementById("solicitar-activos-fecha").value="";

                           document.getElementById("solicitar-activos-dias").value="1";
                           $("#solicitar-activos-dias").removeClass("valid");

                           document.getElementById("solicitar-activos-comentario").value="";
                           $("#solicitar-activos-comentario").removeClass("valid");

                           document.getElementById("solicitar-activos-boleta").checked=false;

                           var solicitarActivo_lista=document.getElementById("solicitar-activos-lista").childNodes;
                           for (var i=0; i<solicitarActivo_lista.length; i++){
                               if (solicitarActivo_lista[i].nodeName=="OPTION"){
                                   if (solicitarActivo_lista[i].selected==true){
                                       solicitarActivo_lista[i].selected=false;
                                   }
                               }
                           }
                           solicitarActivo_lista[1].selected=true;
                           $('select').material_select();

                           var $toastContent = $('<span><i class="material-icons left">send</i> Solicitud enviada<span>');
                           Materialize.toast($toastContent, 5000, "green");
                        },
                        error: function(){
                           $('#loading').modal('close');
                           var $toastContent = $('<span><i class="material-icons left">error</i> Error de conexión</span>');
                           Materialize.toast($toastContent, 5000, "red");
                        }
                }); 
            }else{
                $('#loading').modal('close');
                var $toastContent = $('<span><i class="material-icons left">warning</i> Debe llenar todos los campos conrrectamente</span>');
                Materialize.toast($toastContent, 5000, "orange");
            }
            break;
        case 'Espacios':
            var solicitarEspacios_espacio='';
            var solicitarEspacios_fecha='';
            var solicitarEspacios_bloques=new Array();
            var solicitarEspacios_comentario='';
            var _solicitarBloques=document.getElementById("solicitar-espacios-bloques").childNodes;
            for (var i=0; i<_solicitarBloques.length; i++){
                if (_solicitarBloques[i].nodeName=="OPTION"){
                    if (_solicitarBloques[i].selected==true && _solicitarBloques[i].value!=''){
                       solicitarEspacios_bloques.push(_solicitarBloques[i].value);
                    }
                }
            }
            if (_solicitarBloques.length==0){
                valido=false;
            }
            solicitarEspacios_fecha=document.getElementById("solicitar-espacios-fecha").value;
            if (solicitarEspacios_fecha==''){
                valido==false;
            }
            solicitarEspacios_comentario=document.getElementById("solicitar-espacios-comentario").value;
            
            if (solicitarEspacios_comentario==''){
                valido==false;
            }
            var _solicitarEspacio=document.getElementById("solicitar-espacios-espacio").childNodes;
            for (var i=0; i<_solicitarEspacio.length; i++){
                if (_solicitarEspacio[i].nodeName=="OPTION"){
                    if (_solicitarEspacio[i].selected==true && _solicitarEspacio[i].value!=''){
                       solicitarEspacios_espacio=_solicitarEspacio[i].value;
                    }
                }
            }
            
            if (solicitarEspacios_espacio==''){
                valido==false;
            }
            
            if (valido==true){
                var solicitudEspacio = {
                        solicitante: _user.correo,
                        tipo: "Espacio",
                        mensaje: solicitarEspacios_comentario,
                        espacio: solicitarEspacios_espacio,
                        fecha: solicitarEspacios_fecha,
                        bloques: solicitarEspacios_bloques,
                }
                $.ajax({
                        type: "POST",
                        url: ruta+"/nuevaSolicitud",
                        dataType: "json",   
                        data: JSON.stringify(solicitudEspacio),
                        timeout: 5000,
                        success: function(){
                           $('#loading').modal('close');

                           document.getElementById("solicitar-espacios-fecha").value="";

                           document.getElementById("solicitar-espacios-comentario").value="";
                           $("#solicitar-espacios-comentario").removeClass("valid");

                           var solicitarEspacio_lista=document.getElementById("solicitar-espacios-espacio").childNodes;
                           for (var i=0; i<solicitarEspacio_lista.length; i++){
                               if (solicitarEspacio_lista[i].nodeName=="OPTION"){
                                   if (solicitarEspacio_lista[i].selected==true){
                                       solicitarEspacio_lista[i].selected=false;
                                   }
                               }
                           }
                           solicitarEspacio_lista[1].selected=true;
                            
                           var solicitarEspacio_bloques=document.getElementById("solicitar-espacios-bloques").childNodes;
                           for (var i=0; i<solicitarEspacio_bloques.length; i++){
                               if (solicitarEspacio_bloques[i].nodeName=="OPTION"){
                                   if (solicitarEspacio_bloques[i].selected==true){
                                       solicitarEspacio_bloques[i].selected=false;
                                   }
                               }
                           }
                           solicitarEspacio_bloques[1].selected=true;
                            
                           $('#solicitar-espacios-espacio').material_select();
                           $('#solicitar-espacios-bloques').material_select();
                            
                           var $toastContent = $('<span><i class="material-icons left">send</i> Solicitud enviada<span>');
                           Materialize.toast($toastContent, 5000, "green");
                        },
                        error: function(){
                           $('#loading').modal('close');
                           var $toastContent = $('<span><i class="material-icons left">error</i> Error de conexión</span>');
                           Materialize.toast($toastContent, 5000, "red");
                        }
                }); 
            }else{
                $('#loading').modal('close');
                var $toastContent = $('<span><i class="material-icons left">warning</i> Debe llenar todos los campos conrrectamente</span>');
                Materialize.toast($toastContent, 5000, "orange");
            }
            break;
        case 'Soporte':
            var solicitarSoporte_espacio='';
            var solicitarSoporte_comentario='';
            var _solicitarEspacio=document.getElementById("solicitar-soporte-espacio").childNodes;
            for (var i=0; i<_solicitarEspacio.length; i++){
                if (_solicitarEspacio[i].nodeName=="OPTION"){
                    if (_solicitarEspacio[i].selected==true && _solicitarEspacio[i].value!=''){
                       solicitarSoporte_espacio=_solicitarEspacio[i].value;
                    }
                }
            }
            if (solicitarSoporte_espacio==''){
                valido==false;
            }
            solicitarSoporte_comentario=document.getElementById("solicitar-soporte-comentario").value;
            if (solicitarSoporte_comentario==''){
                valido==false;
            }
            
            if (valido==true){
                var solicitudSoporte = {
                        solicitante: _user.correo,
                        tipo: "Soporte",
                        mensaje: solicitarSoporte_comentario,
                        espacio: solicitarSoporte_espacio  
                }
                $.ajax({
                        type: "POST",
                        url: ruta+"/nuevaSolicitud",
                        dataType: "json",   
                        data: JSON.stringify(solicitudSoporte),
                        timeout: 5000,
                        success: function(){
                           $('#loading').modal('close');
                           document.getElementById("solicitar-soporte-comentario").value="";
                           var solicitarSoporte_espacio=document.getElementById("solicitar-soporte-espacio").childNodes;
                           for (var i=0; i<solicitarSoporte_espacio.length; i++){
                               if (solicitarSoporte_espacio[i].nodeName=="OPTION"){
                                   if (solicitarSoporte_espacio[i].selected==true){
                                       solicitarSoporte_espacio[i].selected=false;
                                   }
                               }
                           }
                           solicitarSoporte_espacio[1].selected=true;
                           $('#solicitar-soporte-espacio').material_select();

                           var $toastContent = $('<span><i class="material-icons left">send</i> Solicitud enviada<span>');
                           Materialize.toast($toastContent, 5000, "green");
                        },
                        error: function(){
                           $('#loading').modal('close');
                           var $toastContent = $('<span><i class="material-icons left">error</i> Error de conexión</span>');
                           Materialize.toast($toastContent, 5000, "red");
                        }
                }); 
            }else{
                $('#loading').modal('close');
                var $toastContent = $('<span><i class="material-icons left">warning</i> Debe llenar todos los campos conrrectamente</span>');
                Materialize.toast($toastContent, 5000, "orange");
            }
            break;
        default:
            $('#loading').modal('close');
            var $toastContent = $('<span><i class="material-icons left">warning</i> Refrescando el contenido...</span>');
            Materialize.toast($toastContent, 5000, "orange");
            window.location='/dashboard';
            break;
    }
}
function Pendientes(item){
    $('#loading').modal('open');
    var messenger=new Object();
    messenger.tipo = item.name;
    messenger.estado="Espera"
    $.ajax({
                type: "POST",
                url: ruta+"/verSolicitudes",
                dataType: "json",   
                data: JSON.stringify(messenger),
                timeout: 5000,
                success: function(res){
                   if (res.resultado==true){
                       displaySolicitudes(res.tipo, res.estado, res.datos);
                       $('#loading').modal('close');
                   }else{
                       alert("____");
                   }
                },
                error: function(){
                   alert("kdakf");
                }
        });
}
function historySlctds(){
    $('#loading').modal('open');
    var messenger=new Object();
    messenger.a="0";
    $.ajax({
                type: "POST",
                url: ruta+"/verHistorySolicitudes",
                dataType: "json",   
                data: JSON.stringify(messenger),
                timeout: 5000,
                success: function(res){
                   if (res.resultado==true){
                       displayHistoryG(res.datos);
                       $('#loading').modal('close');
                   }else{
                       alert("____");
                   }
                },
                error: function(){
                   alert("kdakf");
                }
        });
}
function displaySolicitudes(tipo, estado, solicitudes){
    switch(tipo){
            case "Soporte":
                switch(estado){
                    case "Espera":
                        document.getElementById("displaySoportePendientes").innerHTML="";
                        for (var i=0; i<solicitudes.length; i++){
                            var solicitud="";
                            var userN="";
                            for (var u=0; u<_usuarios.length; u++){
                                            if (_usuarios[u].correo==solicitudes[i].solicitante){
                                                userN=_usuarios[u].nombre+" "+_usuarios[u].primer_apellido+" "+_usuarios[u].segundo_apellido;
                                            }
                            }
                            solicitud='<div class="col s12"><div class="card"><!--ID y CHECK--><div style="padding-top:0px; padding-bottom:0px; padding-left:10px; padding-right:0px;" class="card-action grey lighten-2"><div class="row" style="margin-bottom:0px;"><div class="col s12"><p style="margin-bottom:10px;"><i style="margin-right:10px;" class="material-icons left">announcement</i>'+solicitudes[i]._id+'</p></div></div></div><!--Titulo y Estado--><div style="padding-top:0px; padding-bottom:0px; margin-bottom:0px; padding-left:10px; padding-right:15px;" class="card-action row"><div class="col s12 m4"><h5><i style="margin-right:10px; cursor:pointer;" class="material-icons left">build</i>Soporte</h5><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Solicitante"><i style="margin-right:5px;" class="material-icons left">person</i>'+userN+'</p><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Fecha de solicitud"><i style="margin-right:5px;" class="material-icons left">date_range</i>'+solicitudes[i].fechaSolicitud+'</p></div><div class="col s12 m8"><div class="col s12"><p><i style="margin-right:5px;" class="material-icons left">info</i>Informacion</p></div><div class="col s12"><div class="divider"></div></div><div class="col s6"><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Estado de soporte"><i style="margin-right:5px;" class="material-icons left">textsms</i>'+solicitudes[i].estadoSoporte+'</p><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Prioridad"><i style="margin-right:5px;" class="material-icons left">new_releases</i>'+solicitudes[i].prioridad+'</p></div><div class="col s6"><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Estado de solicitud"><i style="margin-right:5px;" class="material-icons left">gavel</i>'+solicitudes[i].estado+'</p><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Espacio"><i style="margin-right:5px;" class="material-icons left">place</i>'+solicitudes[i].espacio+'</p></div></div></div><div style="padding-top:20px; padding-bottom:5px" class="card-content"><span class="right"><button onclick=" slctdChngSttSup('+"'"+solicitudes[i]._id+"'"+',false)" class="waves-effect waves-red btn-flat"><i class="material-icons left">block</i>Rechazar</button><button onclick=" slctdChngSttSup('+"'"+solicitudes[i]._id+"'"+', true)" class="btn blue darken-2"><i class="material-icons left">check</i>Aceptar</button>     </span><span style="padding-bottom:10px;" class="card-title activator grey-text text-darken-4"><i class="material-icons left" style="margin-top: 15px;">keyboard_arrow_up</i></span><br></div><!--Descripción--><div style="padding-top:5px; padding-bottom:10px; padding-left:15px; padding-right:15px;" class="card-reveal"><br><span class="card-title grey-text text-darken-4 col s12"><i style="margin-right:5px;" class="material-icons">info</i>Informacion<i class="material-icons right">close</i></span><div class="col s12"><p><i style="margin-right:5px;" class="material-icons left">comment</i>Comentario</p><p>'+solicitudes[i].mensaje+'</p></div></div></div></div>';
                            $( "#displaySoportePendientes" ).append( solicitud );
                        }
                         $('.tooltipped').tooltip({delay: 50});
                        break;
                    default:
                        break;
                }
                break;
            default:
            
                switch (estado){
                    case "Espera":
                        switch (tipo){
                            case "Activo":
                                    document.getElementById("displayActivosPendientes").innerHTML="";
                                    for (var i=0; i<solicitudes.length; i++){
                                        var solicitud="";
                                        var userN="";
                                        var boletaV="";
                                        var activosV="";
                                        var cod="";
                                        var tip="";
                                        var esp="";
                                        var des="";
                                        for (var u=0; u<_usuarios.length; u++){
                                            if (_usuarios[u].correo==solicitudes[i].solicitante){
                                                userN=_usuarios[u].nombre+" "+_usuarios[u].primer_apellido+" "+_usuarios[u].segundo_apellido;
                                            }
                                        }
                                        boletaV=get_aireEspacio(solicitudes[i].boleta);
                                        for (var u=0; u<solicitudes[i].listaDeActivos.length; u++){
                                            for (var q=0; q<_activos.length; q++){
                                                if (solicitudes[i].listaDeActivos[u]==_activos[q].codigo){
                                                    cod=_activos[q].codigo;
                                                    tip=_activos[q].tipo;
                                                    esp=_activos[q].espacio;
                                                    des=_activos[q].descripcion;
                                                }
                                            }
                                            activosV=activosV+'<tr class=""><td>'+cod+'</td><td>'+tip+'</td><td>'+esp+'</td><td>'+des+'</td></tr>';
                                        }
                                        solicitud='<div class="col s12"><div class="card"><!--ID y CHECK--><div style="padding-top:0px; padding-bottom:0px; padding-left:10px; padding-right:0px;" class="card-action grey lighten-2"><div class="row" style="margin-bottom:0px;"><div class="col s12"><p style="margin-bottom:10px;"><i style="margin-right:10px;" class="material-icons left">announcement</i>'+solicitudes[i]._id+'</p></div></div></div><!--Titulo y Estado--><div style="padding-top:0px; padding-bottom:0px; margin-bottom:0px; padding-left:10px; padding-right:15px;" class="card-action row"><div class="col s12 m4"><h5><i style="margin-right:10px; cursor:pointer;" class="material-icons left">dashboard</i>Activos</h5><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Solicitante"><i style="margin-right:5px;" class="material-icons left">person</i>'+userN+'</p><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Fecha de solicitud"><i style="margin-right:5px;" class="material-icons left">date_range</i>'+solicitudes[i].fechaSolicitud+'</p></div><div class="col s12 m8"><div class="col s12"><p><i style="margin-right:5px;" class="material-icons left">info</i>Informacion</p></div><div class="col s12"><div class="divider"></div></div><div class="col s6"><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Fecha de préstamo"><i style="margin-right:5px;" class="material-icons left">today</i>'+solicitudes[i].fecha+'</p><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Cantidad de dias"><i style="margin-right:5px;" class="material-icons left">timelapse</i>'+solicitudes[i].dias+' días</p></div><div class="col s6"><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Estado de solicitud"><i style="margin-right:5px;" class="material-icons left">gavel</i>'+solicitudes[i].estado+'</p><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Requiere boleta"><i style="margin-right:5px;" class="material-icons left">note</i>'+boletaV+'</p></div></div></div><div style="padding-top:20px; padding-bottom:5px" class="card-content"><span class="right">        <button onclick=" slctdChngStt('+"'"+solicitudes[i]._id+"'"+',false)" class="waves-effect waves-red btn-flat"><i class="material-icons left">block</i>Rechazar</button><button onclick=" slctdChngStt('+"'"+solicitudes[i]._id+"'"+', true)" class="btn blue darken-2"><i class="material-icons left">check</i>Aceptar</button>      </span><span style="padding-bottom:10px;" class="card-title activator grey-text text-darken-4"><i class="material-icons left" style="margin-top: 15px;">keyboard_arrow_up</i></span><br></div><!--Descripción--><div style="padding-top:5px; padding-bottom:10px; padding-left:15px; padding-right:15px;" class="card-reveal"><br><span class="card-title grey-text text-darken-4 col s12"><i style="margin-right:5px;" class="material-icons">info</i>Informacion<i class="material-icons right">close</i></span><div class="col s12"><p><i style="margin-right:5px;" class="material-icons left">comment</i>Comentario</p><p>'+solicitudes[i].mensaje+'</p></div><table class="centered responsive-table striped"><thead><tr><th>Codigo</th><th>Tipo</th><th>Espacio</th><th>Descripcion</th></tr></thead><tbody>'+activosV+'</tbody></table></div></div></div>';
                                        $( "#displayActivosPendientes" ).append( solicitud );
                                     }
                                     $('.tooltipped').tooltip({delay: 50});
                                break;
                            case "Espacio":
                                    document.getElementById("displayEspaciosPendientes").innerHTML="";
                                    for (var i=0; i<solicitudes.length; i++){
                                        var solicitud="";
                                        var userN="";
                                        var espacioV="";
                                        var cod="";
                                        var plnt="";
                                        var air="";
                                        var des="";
                                        var bloques="";
                                        for (var u=0; u<_usuarios.length; u++){
                                            if (_usuarios[u].correo==solicitudes[i].solicitante){
                                                userN=_usuarios[u].nombre+" "+_usuarios[u].primer_apellido+" "+_usuarios[u].segundo_apellido;
                                            }
                                        }
                                        
                                        for (var q=0; q<solicitudes[i].bloques.length; q++){
                                            bloques=bloques+solicitudes[i].bloques[q];
                                            if (q!=solicitudes[i].bloques.length-1){
                                               bloques=bloques+", "
                                            }
                                        }        
                                        
                                        for (var q=0; q<_espacios.length; q++){
                                            if (solicitudes[i].espacio==_espacios[q].codigo){
                                                    cod=_espacios[q].codigo;
                                                    plnt=_espacios[q].planta;
                                                    air=get_aireEspacio(_espacios[q].aireAcondicionado);
                                                    des=_espacios[q].descripcion;
                                            }
                                        }
                                        espacioV='<tr class=""><td>'+cod+'</td><td>'+plnt+'° Planta</td><td>'+air+'</td><td>'+des+'</td></tr>';
                                        
                                        
                                        solicitud='<div class="col s12"><div class="card"><!--ID y CHECK--><div style="padding-top:0px; padding-bottom:0px; padding-left:10px; padding-right:0px;" class="card-action grey lighten-2"><div class="row" style="margin-bottom:0px;"><div class="col s12"><p style="margin-bottom:10px;"><i style="margin-right:10px;" class="material-icons left">announcement</i>'+solicitudes[i]._id+'</p></div></div></div><!--Titulo y Estado--><div style="padding-top:0px; padding-bottom:0px; margin-bottom:0px; padding-left:10px; padding-right:15px;" class="card-action row"><div class="col s12 m4"><h5><i style="margin-right:10px; cursor:pointer;" class="material-icons left">place</i>Espacio</h5><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Solicitante"><i style="margin-right:5px;" class="material-icons left">person</i>'+userN+'</p><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Fecha de solicitud"><i style="margin-right:5px;" class="material-icons left">date_range</i>'+solicitudes[i].fechaSolicitud+'</p></div><div class="col s12 m8"><div class="col s12"><p><i style="margin-right:5px;" class="material-icons left">info</i>Informacion</p></div><div class="col s12"><div class="divider"></div></div><div class="col s6"><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Fecha de prestamo"><i style="margin-right:5px;" class="material-icons left">today</i>'+solicitudes[i].fecha+'</p><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Bloques"><i style="margin-right:5px;" class="material-icons left">widgets</i>'+bloques+'</p></div><div class="col s6"><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Estado de solicitud"><i style="margin-right:5px;" class="material-icons left">gavel</i>'+solicitudes[i].estado+'</p></div></div></div><div style="padding-top:20px; padding-bottom:5px" class="card-content"><span class="right"> <button onclick=" slctdChngStt('+"'"+solicitudes[i]._id+"'"+',false)" class="waves-effect waves-red btn-flat"><i class="material-icons left">block</i>Rechazar</button><button onclick=" slctdChngStt('+"'"+solicitudes[i]._id+"'"+', true)" class="btn blue darken-2"><i class="material-icons left">check</i>Aceptar</button>      </span><span style="padding-bottom:10px;" class="card-title activator grey-text text-darken-4"><i class="material-icons left" style="margin-top: 15px;">keyboard_arrow_up</i></span><br></div><!--Descripción--><div style="padding-top:5px; padding-bottom:10px; padding-left:15px; padding-right:15px;" class="card-reveal"><br><span class="card-title grey-text text-darken-4 col s12"><i style="margin-right:5px;" class="material-icons">info</i>Informacion<i class="material-icons right">close</i></span><div class="col s12"><p><i style="margin-right:5px;" class="material-icons left">comment</i>Comentario</p><p>'+solicitudes[i].mensaje+'</p></div><table class="centered responsive-table striped"><thead><tr><th>Codigo</th><th>Planta</th><th>Aire</th><th>Descripcion</th></tr></thead><tbody>'+espacioV+'</tbody></table></div></div></div>';
                                        
                                        $( "#displayEspaciosPendientes" ).append( solicitud );
                                     }
                                     $('.tooltipped').tooltip({delay: 50});
                                break;
                           default:
                                 
                                break;
                        }
                        break;
                }
            break;
        }
}   
function displayHistoryG(solicitudes){
    document.getElementById("displayHistorialSolicitudesG").innerHTML="";
    for (var i=0; i<solicitudes.length; i++){
        switch (solicitudes[i].tipo){
            case "Activo":
                    var solicitud="";
                    var boletaV="";
                    var activosV="";
                    var cod="";
                    var tip="";
                    var esp="";
                    var des="";
                    for (var u=0; u<_usuarios.length; u++){
                        if (_usuarios[u].correo==solicitudes[i].solicitante){
                            userN=_usuarios[u].nombre+" "+_usuarios[u].primer_apellido+" "+_usuarios[u].segundo_apellido;
                        }
                    }
                    boletaV=get_aireEspacio(solicitudes[i].boleta);
                    for (var u=0; u<solicitudes[i].listaDeActivos.length; u++){
                        for (var q=0; q<_activos.length; q++){
                            if (solicitudes[i].listaDeActivos[u]==_activos[q].codigo){
                                cod=_activos[q].codigo;
                                tip=_activos[q].tipo;
                                esp=_activos[q].espacio;
                                des=_activos[q].descripcion;
                            }
                        }
                        activosV=activosV+'<tr class=""><td>'+cod+'</td><td>'+tip+'</td><td>'+esp+'</td>    <td>'+des+'</td></tr>';
                    }   
                    solicitud='<div class="col s12"><div class="card"><!--ID y CHECK--><div style="padding-top:0px; padding-bottom:0px; padding-left:10px; padding-right:0px;"  class="card-action grey lighten-2"><div class="row" style="margin-bottom:0px;"><div     class="col s12"><p style="margin-bottom:10px;"><i style="margin-right:10px;" class="material-icons left">announcement</i>'+solicitudes[i]._id+'</p></div></div></div>  <!--Titulo y Estado--><div style="padding-top:0px; padding-bottom:0px; margin-  bottom:0px; padding-left:10px; padding-right:15px;" class="card-action row"><div    class="col s12 m4"><h5><i style="margin-right:10px; cursor:pointer;" class="material-icons left">dashboard</i>Activos</h5><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Solicitante"><i style="margin-right:5px;" class="material-icons left">person</i>'+userN+'</p><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Fecha de solicitud"><i style="margin-right:5px;" class="material-icons left">date_range</i>'+solicitudes[i].fechaSolicitud+'</p></div><div class="col s12 m8"><div class="col s12"><p><i style="margin-right:5px;" class="material-icons left">info</i>Informacion</p></div><div class="col s12"><div class="divider"></div></div><div class="col s6"><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Fecha de préstamo"><i style="margin-right:5px;" class="material-icons left">today</i>'+solicitudes[i].fecha+'</p><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Cantidad de dias"><i style="margin-right:5px;" class="material-icons left">timelapse</i>'+solicitudes[i].dias+' días</p></div><div class="col s6"><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Estado de solicitud"><i style="margin-right:5px;" class="material-icons left">gavel</i>'+solicitudes[i].estado+'</p><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Requiere boleta"><i style="margin-right:5px;" class="material-icons left">note</i>'+boletaV+'</p></div></div></div><div style="padding-top:20px; padding-bottom:5px" class="card-content"><span class="right">  </span><span style="padding-bottom:10px;" class="card-title activator grey-text text-darken-4"><i class="material-icons left" style="margin-top: 15px;">keyboard_arrow_up</i></span><br></div><!--Descripción--><div style="padding-top:5px; padding-bottom:10px; padding-left:15px; padding-right:15px;" class="card-reveal"><br><span class="card-title grey-text text-darken-4 col s12"><i style="margin-right:5px;" class="material-icons">info</i>Informacion<i class="material-icons right">close</i></span>  <div class="row">   <div class="col s6"><p><i style="margin-right:5px;" class="material-icons left">comment</i>Comentario</p><p>'+solicitudes[i].mensaje+'</p></div><div class="col s6"><p><i style="margin-right:5px;" class="material-icons left">question_answer</i>Respuesta</p><p>'+solicitudes[i].respuesta+'</p></div></div><table class="centered responsive-table striped"><thead><tr><th>Codigo</th><th>Tipo</th><th>Espacio</th><th>Descripcion</th></tr></thead><tbody>'+activosV+'</tbody></table></div></div></div>';
                    $( "#displayHistorialSolicitudesG" ).append( solicitud );
                break;
            case "Espacio":
                    var solicitud="";
                    var userN="";
                    var espacioV="";
                    var cod="";
                    var plnt="";
                    var air="";
                    var des="";
                    var bloques="";
                    for (var u=0; u<_usuarios.length; u++){
                        if (_usuarios[u].correo==solicitudes[i].solicitante){
                            userN=_usuarios[u].nombre+" "+_usuarios[u].primer_apellido+" "+_usuarios[u].segundo_apellido;
                        }
                    }                            
                    for (var q=0; q<solicitudes[i].bloques.length; q++){
                        bloques=bloques+solicitudes[i].bloques[q];
                        if (q!=solicitudes[i].bloques.length-1){
                            bloques=bloques+", "
                        }
                    }                            
                    for (var q=0; q<_espacios.length; q++){
                        if (solicitudes[i].espacio==_espacios[q].codigo){
                            cod=_espacios[q].codigo;
                            plnt=_espacios[q].planta;
                            air=get_aireEspacio(_espacios[q].aireAcondicionado);
                            des=_espacios[q].descripcion;
                        }
                    }
                    espacioV='<tr class=""><td>'+cod+'</td><td>'+plnt+'° Planta</td><td>'+air+'</td><td>'+des+'</td></tr>';
                    solicitud='<div class="col s12"><div class="card"><!--ID y CHECK--><div style="padding-top:0px; padding-bottom:0px; padding-left:10px; padding-right:0px;" class="card-action grey lighten-2"><div class="row" style="margin-bottom:0px;"><div class="col s12"><p style="margin-bottom:10px;"><i style="margin-right:10px;" class="material-icons left">announcement</i>'+solicitudes[i]._id+'</p></div></div></div><!--Titulo y Estado--><div style="padding-top:0px; padding-bottom:0px; margin-bottom:0px; padding-left:10px; padding-right:15px;" class="card-action row"><div class="col s12 m4"><h5><i style="margin-right:10px; cursor:pointer;" class="material-icons left">place</i>Espacio</h5><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Solicitante"><i style="margin-right:5px;" class="material-icons left">person</i>'+userN+'</p><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Fecha de solicitud"><i style="margin-right:5px;" class="material-icons left">date_range</i>'+solicitudes[i].fechaSolicitud+'</p></div><div class="col s12 m8"><div class="col s12"><p><i style="margin-right:5px;" class="material-icons left">info</i>Informacion</p></div><div class="col s12"><div class="divider"></div></div><div class="col s6"><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Fecha de prestamo"><i style="margin-right:5px;" class="material-icons left">today</i>'+solicitudes[i].fecha+'</p><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Bloques"><i style="margin-right:5px;" class="material-icons left">widgets</i>'+bloques+'</p></div><div class="col s6"><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Estado de solicitud"><i style="margin-right:5px;" class="material-icons left">gavel</i>'+solicitudes[i].estado+'</p></div></div></div><div style="padding-top:20px; padding-bottom:5px" class="card-content"><span class="right"></span><span style="padding-bottom:10px;" class="card-title activator grey-text text-darken-4"><i class="material-icons left" style="margin-top: 15px;">keyboard_arrow_up</i></span><br></div><!--Descripción--><div style="padding-top:5px; padding-bottom:10px; padding-left:15px; padding-right:15px;" class="card-reveal"><br><span class="card-title grey-text text-darken-4 col s12"><i style="margin-right:5px;" class="material-icons">info</i>Informacion<i class="material-icons right">close</i></span><div class="row"><div class="col s6"><p><i style="margin-right:5px;" class="material-icons left">comment</i>Comentario</p><p>'+solicitudes[i].mensaje+'</p></div><div class="col s6"><p><i style="margin-right:5px;" class="material-icons left">question_answer</i>Respuesta</p><p>'+solicitudes[i].respuesta+'</p></div></div><table class="centered responsive-table striped"><thead><tr><th>Codigo</th><th>Planta</th><th>Aire</th><th>Descripcion</th></tr></thead><tbody>'+espacioV+'</tbody></table></div></div></div>';                    
                    $( "#displayHistorialSolicitudesG" ).append( solicitud );
                break;
                
                
        }    
    }
    $('.tooltipped').tooltip({delay: 50});
    
}    
function streamSlctds(t){
   // setInterval(getSlctdsPndts(t), 3000);
    setInterval(function(){
        var ob=new Object();
        ob.tipo=t;
        $.ajax({
                type: "POST",
                url: ruta+"/Pendientes",
                dataType: "json",   
                data: JSON.stringify(ob),
                timeout: 5000,
                success: function(res){
                    if (res.resultado == true){
                        var d = document;              
                        var c=0;
                        var current_c=parseInt(d.getElementById("solicitudes-badge").innerHTML);
                        if (res.tipo=="Administrador"){
                            c=res.activosCount+res.espaciosCount+res.soporteCount;
                            d.getElementById("solicitudes-badge").innerHTML=c;
                            if (parseInt(d.getElementById("activosPendientes-badge").innerHTML)<res.activosCount){
                                Pendientes({name:"Activo"});
                                
                                var $toastContent = $('<span><i class="material-icons left">announcement</i>Hay nuevas solicitudes de <b>activos</b> pendientes</span>');
                                Materialize.toast($toastContent, 5000, "blue darken-2");
                            }
                            d.getElementById("activosPendientes-badge").innerHTML=res.activosCount;
                            if (parseInt(d.getElementById("espaciosPendientes-badge").innerHTML)<res.espaciosCount){
                                 Pendientes({name:"Espacio"});
                               
                                 var $toastContent = $('<span><i class="material-icons left">announcement</i>Hay nuevas solicitudes de <b>espacios</b> pendientes</span>');
                                 Materialize.toast($toastContent, 5000, "blue darken-2");
                            }
                            d.getElementById("espaciosPendientes-badge").innerHTML=res.espaciosCount;
                            
                            if (parseInt(d.getElementById("soportePendientes-badge").innerHTML)<res.soporteCount){
                                Pendientes({name:"Soporte"});
                                var $toastContent = $('<span><i class="material-icons left">announcement</i>Hay nuevas solicitudes de <b>soporte</b> pendientes</span>');
                                Materialize.toast($toastContent, 5000, "blue darken-2");
                            }
                            d.getElementById("soportePendientes-badge").innerHTML=res.soporteCount;
                        }
                        if (res.tipo=="Soporte"){
                           c=res.soporteCount;
                           d.getElementById("solicitudes-badge").innerHTML=c;
                            if (parseInt(d.getElementById("soportePendientes-badge").innerHTML)<res.soporteCount){
                                Pendientes({name:"Soporte"});
                                var $toastContent = $('<span><i class="material-icons left">announcement</i>Hay solicitudes de <b>soporte</b> pendientes</span>');
                                Materialize.toast($toastContent, 5000, "blue darken-2");
                            }
                            d.getElementById("soportePendientes-badge").innerHTML=res.soporteCount;
                        }
                        if (c>current_c){
                             audioAlert.play();
                        }
                    }
                },
                error: function(err){

                     var $toastContent = $('<span><i class="material-icons left">warning</i>Se ha perdido la conexión, intentando conectar...</span>');
                     Materialize.toast($toastContent, 2999, "orange");
                   
                }
            });
    }, 4000);
}
function getSlctdsPndts(t){
    var ob=new Object();
    ob.tipo=t;
    $.ajax({
            type: "POST",
            url: ruta+"/Pendientes",
            dataType: "json",   
            data: JSON.stringify(ob),
            timeout: 5000,
            success: function(res){
                if (res.resultado == true){
                    var d = document;              
                    var c=0;
                    if (res.tipo=="Administrador"){
                        c=res.activosCount+res.espaciosCount+res.soporteCount;
                        d.getElementById("solicitudes-badge").innerHTML=c;
                        
                        if (parseInt(d.getElementById("activosPendientes-badge").innerHTML)<res.activosCount){
                            var $toastContent = $('<span><i class="material-icons left">announcement</i>Hay <b>'+res.activosCount+'</b> solicitudes de <b>activos</b> pendientes</span>');
                            Materialize.toast($toastContent, 8000, "blue darken-2");
                        }
                        d.getElementById("activosPendientes-badge").innerHTML=res.activosCount;
                        if (parseInt(d.getElementById("espaciosPendientes-badge").innerHTML)<res.espaciosCount){
                             var $toastContent = $('<span><i class="material-icons left">announcement</i>Hay <b>'+res.espaciosCount+'</b> solicitudes de <b>espacio</b> pendientes</span>');
                             Materialize.toast($toastContent, 8000, "blue darken-2");
                        }
                        d.getElementById("espaciosPendientes-badge").innerHTML=res.espaciosCount;
                        if (parseInt(d.getElementById("soportePendientes-badge").innerHTML)<res.soporteCount){
                            var $toastContent = $('<span><i class="material-icons left">announcement</i>Hay <b>'+res.soporteCount+'</b> solicitudes de <b>soporte</b> pendientes</span>');
                            Materialize.toast($toastContent, 8000, "blue darken-2");
                        }
                        d.getElementById("soportePendientes-badge").innerHTML=res.soporteCount;
                    }
                    if (res.tipo=="Soporte"){
                       c=res.soporteCount;
                       d.getElementById("solicitudes-badge").innerHTML=c;
                        if (parseInt(d.getElementById("soportePendientes-badge").innerHTML)<res.soporteCount){
                            var $toastContent = $('<span><i class="material-icons left">announcement</i>Hay <b>'+res.soporteCount+'</b> solicitudes de <b>soporte</b> pendientes</span>');
                            Materialize.toast($toastContent, 8000, "blue darken-2");
                        }
                        d.getElementById("soportePendientes-badge").innerHTML=res.soporteCount;
                    }
                    if (c>0){
                        audioAlert.play();
                    }
                }
            },
            error: function(err){
                
                 var $toastContent = $('<span><i class="material-icons left">warning</i>Se ha perdido la conexión, intentando conectar...</span>');
                 Materialize.toast($toastContent, 2999, "orange");
                
            }
    });
}
function slctdChngStt(id, state){
    document.getElementById("solicitud-respuesta").name=id+" "+state;
    $('#solicitudRespuesta').modal('open');
}
function slctdChngSttSup(id, state){
    document.getElementById("solicitud-respuestaSup").name=id+" "+state;
    if (state==false){
        document.getElementById("prioridadSelect").disabled=true;

    }else{
        document.getElementById("prioridadSelect").disabled=false;
    }
    $('#prioridadSelect').material_select();
    $('#solicitudRespuestaSup').modal('open'); 
}
function slctdRspstSp(){
    var info= document.getElementById("solicitud-respuestaSup").name;
    var arr=info.split(" ");
    var ob=new Object();
    ob.id=arr[0];
    ob.state=arr[1];
    ob.res=document.getElementById("solicitud-respuestaSup").value;
    if (ob.state=="true"){
        ob.prioridad=document.getElementById("prioridadSelect").value;
    }
    $.ajax({
        type: "POST",
        url: ruta+"/solicitudRespuestaSup",
        dataType: "json",   
        data: JSON.stringify(ob),
        timeout: 5000,
        success: function(res){
           document.getElementById("solicitud-respuestaSup").value="";
           document.getElementById("solicitud-respuestaSup").name="";
           if (res.resultado==true){
                  Pendientes({name:"Soporte"});
           }else{
                var $toastContent = $('<span><i class="material-icons left">warning</i>Se ha perdido la conexión</span>');
                Materialize.toast($toastContent, 2999, "orange");
           }
        }
    });
}
function slctdRspst(){
    var info= document.getElementById("solicitud-respuesta").name;
    var arr=info.split(" ");
    var ob=new Object();
    ob.id=arr[0];
    ob.state=arr[1];
    ob.res=document.getElementById("solicitud-respuesta").value;
    $.ajax({
        type: "POST",
        url: ruta+"/solicitudRespuesta",
        dataType: "json",   
        data: JSON.stringify(ob),
        timeout: 5000,
        success: function(res){
           document.getElementById("solicitud-respuesta").value="";
           document.getElementById("solicitud-respuesta").name="";
           if (res.resultado==true){
                  Pendientes({name:"Activo"});
                  Pendientes({name:"Espacio"});
           }else{
                var $toastContent = $('<span><i class="material-icons left">warning</i>Se ha perdido la conexión</span>');
                Materialize.toast($toastContent, 2999, "orange");
           }
        }
    });
}
function historySlctdsSp(){
    $('#loading').modal('open');
    var messenger=new Object();
    messenger.a="0";
    $.ajax({
        type: "POST",
        url: ruta+"/verHistorySolicitudesSup",
        dataType: "json",   
        data: JSON.stringify(messenger),
        timeout: 5000,
        success: function(res){
            if (res.resultado==true){
                dsplyHstrySlctdsSp(res.datos);
                $('#loading').modal('close');
            }else{
                var $toastContent = $('<span><i class="material-icons left">warning</i>Se ha perdido la conexión</span>');
                Materialize.toast($toastContent, 2999, "orange");
            }
        },
        error: function(){
            var $toastContent = $('<span><i class="material-icons left">warning</i>Se ha perdido la conexión</span>');
            Materialize.toast($toastContent, 2999, "orange");
        }
    });
}
function dsplyHstrySlctdsSp(solicitudes){
    document.getElementById("displayHistorySoporte").innerHTML="";
    for (var i=solicitudes.length-1 ; i > -1 ; i--){
        var solicitud="";
        var userN="";
        for (var u=0; u<_usuarios.length; u++){
            if (_usuarios[u].correo==solicitudes[i].solicitante){
                userN=_usuarios[u].nombre+" "+_usuarios[u].primer_apellido+" "+_usuarios[u].segundo_apellido;
                }
        }
        solicitud='<div class="col s12"><div class="card"><!--ID y CHECK--><div style="padding-top:0px; padding-bottom:0px; padding-left:10px; padding-right:0px;" class="card-action grey lighten-2"><div class="row" style="margin-bottom:0px;"><div class="col s12"><p style="margin-bottom:10px;"><i style="margin-right:10px;" class="material-icons left">announcement</i>'+solicitudes[i]._id+'</p></div></div></div><!--Titulo y Estado--><div style="padding-top:0px; padding-bottom:0px; margin-bottom:0px; padding-left:10px; padding-right:15px;" class="card-action row"><div class="col s12 m4"><h5><i style="margin-right:10px; cursor:pointer;" class="material-icons left">build</i>Soporte</h5><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Solicitante"><i style="margin-right:5px;" class="material-icons left">person</i>'+userN+'</p><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Fecha de solicitud"><i style="margin-right:5px;" class="material-icons left">date_range</i>'+solicitudes[i].fechaSolicitud+'</p></div><div class="col s12 m8"><div class="col s12"><p><i style="margin-right:5px;" class="material-icons left">info</i>Informacion</p></div><div class="col s12"><div class="divider"></div></div><div class="col s6"><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Estado de soporte"><i style="margin-right:5px;" class="material-icons left">textsms</i>'+solicitudes[i].estadoSoporte+'</p><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Prioridad"><i style="margin-right:5px;" class="material-icons left">new_releases</i>'+solicitudes[i].prioridad+'</p></div><div class="col s6"><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Estado de solicitud"><i style="margin-right:5px;" class="material-icons left">gavel</i>'+solicitudes[i].estado+'</p><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Espacio"><i style="margin-right:5px;" class="material-icons left">place</i>'+solicitudes[i].espacio+'</p></div></div></div><div style="padding-top:20px; padding-bottom:5px" class="card-content"><span style="padding-bottom:10px;" class="card-title activator grey-text text-darken-4"><i class="material-icons left" style="margin-top: 15px;">keyboard_arrow_up</i></span><br></div><!--Descripción--><div style="padding-top:5px; padding-bottom:10px; padding-left:15px; padding-right:15px;" class="card-reveal"><br><span class="card-title grey-text text-darken-4 col s12"><i style="margin-right:5px;" class="material-icons">info</i>Informacion<i class="material-icons right">close</i></span><div class="col s6"><p><i style="margin-right:5px;" class="material-icons left">comment</i>Comentario</p><p>'+solicitudes[i].mensaje+'</p></div><div class="col s6"><p><i style="margin-right:5px;" class="material-icons left">question_answer</i>Respuesta</p><p>'+solicitudes[i].respuesta+'</p></div>';
        $( "#displayHistorySoporte" ).append( solicitud );
    }
    $('.tooltipped').tooltip({delay: 50});
}
function listSlctdsSp(){
    $('#loading').modal('open');
    var messenger=new Object();
    messenger.a="0";
    $.ajax({
        type: "POST",
        url: ruta+"/verSolicitudesSup",
        dataType: "json",   
        data: JSON.stringify(messenger),
        timeout: 5000,
        success: function(res){
            if (res.resultado==true){
                dsplyLstSlctdsSp(res.datos);
                $('#loading').modal('close');
            }else{
                var $toastContent = $('<span><i class="material-icons left">warning</i>Se ha perdido la conexión</span>');
                Materialize.toast($toastContent, 2999, "orange");
            }
        },
        error: function(){
            var $toastContent = $('<span><i class="material-icons left">warning</i>Se ha perdido la conexión</span>');
            Materialize.toast($toastContent, 2999, "orange");
        }
    });
}
function dsplyLstSlctdsSp(solicitudez){
    document.getElementById("displayListSoporte").innerHTML="";
    var solicitudes=new Array();
    for (var i=0; i<solicitudez.length; i++){
        if (solicitudez[i].prioridad=="Alta"){
            solicitudes.push(solicitudez[i]);
        }
    }
    for (var i=0; i<solicitudez.length; i++){
        if (solicitudez[i].prioridad=="Media"){
            solicitudes.push(solicitudez[i]);
        }
    }
    for (var i=0; i<solicitudez.length; i++){
        if (solicitudez[i].prioridad=="Baja"){
            solicitudes.push(solicitudez[i]);
        }
    }
    for (var i=0; i<solicitudes.length; i++){
        var solicitud="";
        var userN="";
        for (var u=0; u<_usuarios.length; u++){
            if (_usuarios[u].correo==solicitudes[i].solicitante){
                userN=_usuarios[u].nombre+" "+_usuarios[u].primer_apellido+" "+_usuarios[u].segundo_apellido;
                }
        }
        solicitud='<div class="col s12"><div class="card"><!--ID y CHECK--><div style="padding-top:0px; padding-bottom:0px; padding-left:10px; padding-right:0px;" class="card-action grey lighten-2"><div class="row" style="margin-bottom:0px;"><div class="col s12"><p style="margin-bottom:10px;"><i style="margin-right:10px;" class="material-icons left">announcement</i>'+solicitudes[i]._id+'</p></div></div></div><!--Titulo y Estado--><div style="padding-top:0px; padding-bottom:0px; margin-bottom:0px; padding-left:10px; padding-right:15px;" class="card-action row"><div class="col s12 m4"><h5><i style="margin-right:10px; cursor:pointer;" class="material-icons left">build</i>Soporte</h5><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Solicitante"><i style="margin-right:5px;" class="material-icons left">person</i>'+userN+'</p><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Fecha de solicitud"><i style="margin-right:5px;" class="material-icons left">date_range</i>'+solicitudes[i].fechaSolicitud+'</p></div><div class="col s12 m8"><div class="col s12"><p><i style="margin-right:5px;" class="material-icons left">info</i>Informacion</p></div><div class="col s12"><div class="divider"></div></div><div class="col s6"><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Estado de soporte"><i style="margin-right:5px;" class="material-icons left">textsms</i>'+solicitudes[i].estadoSoporte+'</p><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Prioridad"><i style="margin-right:5px;" class="material-icons left">new_releases</i>'+solicitudes[i].prioridad+'</p></div><div class="col s6"><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Estado de solicitud"><i style="margin-right:5px;" class="material-icons left">gavel</i>'+solicitudes[i].estado+'</p><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Espacio"><i style="margin-right:5px;" class="material-icons left">place</i>'+solicitudes[i].espacio+'</p></div></div></div><div style="padding-top:20px; padding-bottom:5px" class="card-content"><span style="padding-bottom:10px;" class="card-title activator grey-text text-darken-4"><i class="material-icons left" style="margin-top: 15px;">keyboard_arrow_up</i></span><div style="position:relative; margin-top: 10px; z-index:3;" class="right fixed-action-btn horizontal"><a class="btn-floating btn-large blue darken-2"><i class="large material-icons">settings</i></a><ul><li><a class="btn-floating grey darken-2 tooltipped" data-position="top" data-delay="50" data-tooltip="Finalizar" onclick="NdSp('+"'"+solicitudes[i]._id+"'"+')"><i class="material-icons">check</i></a></li><li><a class="btn-floating grey darken-2 tooltipped" data-position="top" data-delay="50" data-tooltip="Cambiar estado de soporte" onclick="chngSttsSp('+"'"+solicitudes[i]._id+"'"+')"><i class="material-icons">textsms</i></a></li><li><a class="btn-floating grey darken-2 tooltipped" data-position="top" data-delay="50" data-tooltip="Cambiar prioridad" onclick="chngPrrty('+"'"+solicitudes[i]._id+"'"+')"><i class="material-icons">new_releases</i></a></li></ul></div><br></div><!--Descripción--><div style="padding-top:5px; padding-bottom:10px; padding-left:15px; padding-right:15px;" class="card-reveal"><br><span class="card-title grey-text text-darken-4 col s12"><i style="margin-right:5px;" class="material-icons">info</i>Informacion<i class="material-icons right">close</i></span><div class="col s6"><p><i style="margin-right:5px;" class="material-icons left">comment</i>Comentario</p><p>'+solicitudes[i].mensaje+'</p></div><div class="col s6"><p><i style="margin-right:5px;" class="material-icons left">question_answer</i>Respuesta</p><p>'+solicitudes[i].respuesta+'</p></div>';
        $( "#displayListSoporte" ).append( solicitud );
    }
    $('.tooltipped').tooltip({delay: 50});
 }
function chngPrrty(id){
     document.getElementById("changePrioridadSelect").name=id;
     $('#changePrioritySup').modal('open');
}
function chngSttsSp(id){
     document.getElementById("statusSelect").name=id;
     $('#changeStatusSup').modal('open');
}
function NdSp(id){
    var messenger=new Object();
    messenger.id=id;
    $.ajax({
        type: "POST",
        url: ruta+"/EndSlctdSp",
        dataType: "json",   
        data: JSON.stringify(messenger),
        timeout: 5000,
        success: function(res){
            $('#loading').modal('close');
            if (res.resultado==true){
                listSlctdsSp();
            }else{
                var $toastContent = $('<span><i class="material-icons left">warning</i>Se ha perdido la conexión</span>');
                Materialize.toast($toastContent, 2999, "orange");
            }
        },
        error: function(){
            $('#loading').modal('close');
            var $toastContent = $('<span><i class="material-icons left">warning</i>Se ha perdido la conexión</span>');
            Materialize.toast($toastContent, 2999, "orange");
        }
    });
}
function chngePsp(){
   id = document.getElementById("changePrioridadSelect").name;
    var messenger=new Object();
    messenger.id=id;
    messenger.val=document.getElementById("changePrioridadSelect").value;
    $.ajax({
        type: "POST",
        url: ruta+"/_chngePsp",
        dataType: "json",   
        data: JSON.stringify(messenger),
        timeout: 5000,
        success: function(res){
            $('#loading').modal('close');
            if (res.resultado==true){
                listSlctdsSp();
            }else{
                var $toastContent = $('<span><i class="material-icons left">warning</i>Se ha perdido la conexión</span>');
                Materialize.toast($toastContent, 2999, "orange");
            }
        },
        error: function(){
            $('#loading').modal('close');
            var $toastContent = $('<span><i class="material-icons left">warning</i>Se ha perdido la conexión</span>');
            Materialize.toast($toastContent, 2999, "orange");
        }
    });
}
function chngeSsp(){
    id = document.getElementById("statusSelect").name;
    var messenger=new Object();
    messenger.id=id;
    messenger.val=document.getElementById("statusSelect").value;
    $.ajax({
        type: "POST",
        url: ruta+"/_chngeSsp",
        dataType: "json",   
        data: JSON.stringify(messenger),
        timeout: 5000,
        success: function(res){
            $('#loading').modal('close');
            if (res.resultado==true){
                listSlctdsSp();
            }else{
                var $toastContent = $('<span><i class="material-icons left">warning</i>Se ha perdido la conexión</span>');
                Materialize.toast($toastContent, 2999, "orange");
            }
        },
        error: function(){
            $('#loading').modal('close');
            var $toastContent = $('<span><i class="material-icons left">warning</i>Se ha perdido la conexión</span>');
            Materialize.toast($toastContent, 2999, "orange");
        }
    });
}
function MyActivity(){
    var messenger = new Object();
    messenger.user = _user.correo;
    $.ajax({
        type: "POST",
        url: ruta+"/myActivity",
        dataType: "json",   
        data: JSON.stringify(messenger),
        timeout: 5000,
        success: function(res){
            $('#loading').modal('close');
            if (res.resultado==true){
                displayMyActivity(res.actividad, true);
            }else{
                var $toastContent = $('<span><i class="material-icons left">error</i> Error de conexión intente más     tarde</span>');
                Materialize.toast($toastContent, 5000, "red");
            }
        },
        error: function(){
            $('#loading').modal('close');
            var $toastContent = $('<span><i class="material-icons left">error</i> Error de conexión</span>');
            Materialize.toast($toastContent, 5000, "red");
        }
    });
}
function displayMyActivity(actividad, b){
    if (b==true){
        _myActivity=actividad;
    }
    var d = document;
    d.getElementById("displayMyActivity").innerHTML="";
    var mainIcon="";
    var secondIcon="";
    var clase=new Array();
    for (var i=actividad.length-1; i>-1; i--){
        var table='<table class="centered responsive-table bordered">';
        var tbody="";
        switch (actividad[i].tipo){
            case "Creado":
                secondIcon="add_circle_outliner";
                switch (actividad[i].categoria){
                    case "Espacio":
                        tbody='<tbody><tr class="green accent-1"><td>'+actividad[i].datos[0].codigo+'</td><td>'+actividad[i].datos[0].planta+'° Planta</td><td>'+get_aireEspacio(actividad[i].datos[0].aireAcondicionado)+'</td><td>'+actividad[i].datos[0].descripcion+'</td></tr></tbody>';
                        break;
                    case "Activo":
                        tbody='<tbody><tr class="green accent-1"><td>'+actividad[i].datos[0].codigo+'</td><td>'+actividad[i].datos[0].tipo+'</td><td>'+actividad[i].datos[0].espacio+'</td><td>'+actividad[i].datos[0].descripcion+'</td></tr></tbody>';
                        break;
                    case "Usuario":
                        tbody='<tbody><tr class="green accent-1"><td>'+actividad[i].datos[0].correo+'</td><td>'+actividad[i].datos[0].nombre+'</td><td>'+actividad[i].datos[0].primer_apellido+'</td><td>'+actividad[i].datos[0].segundo_apellido+'</td><td>'+actividad[i].datos[0].tipo+'</td></tr></tbody>';
                        break;  
                } 
                break;
            case "Editado":
                secondIcon="create";
                switch (actividad[i].categoria){
                    case "Espacio":
                        tbody='<tbody><tr class="red lighten-4"><td>'+actividad[i].datos[1].codigo+'</td><td>'+actividad[i].datos[1].planta+'° Planta</td><td>'+get_aireEspacio(actividad[i].datos[1].aireAcondicionado)+'</td><td>'+actividad[i].datos[1].descripcion+'</td></tr><tr class="green accent-1"><td>'+actividad[i].datos[0].codigo+'</td><td>'+actividad[i].datos[0].planta+'° Planta</td><td>'+get_aireEspacio(actividad[i].datos[0].aireAcondicionado)+'</td><td>'+actividad[i].datos[0].descripcion+'</td></tr></tbody>';
                        break;
                    case "Activo":
                        tbody='<tbody><tr class="red lighten-4"><td>'+actividad[i].datos[1].codigo+'</td><td>'+actividad[i].datos[1].tipo+'</td><td>'+actividad[i].datos[1].espacio+'</td><td>'+actividad[i].datos[1].descripcion+'</td></tr><tr class="green accent-1"><td>'+actividad[i].datos[0].codigo+'</td><td>'+actividad[i].datos[0].tipo+'</td><td>'+actividad[i].datos[0].espacio+'</td><td>'+actividad[i].datos[0].descripcion+'</td></tr></tbody>';
                        break;
                    case "Usuario":
                        tbody='<tbody><tr class="red lighten-4"><td>'+actividad[i].datos[1].correo+'</td><td>'+actividad[i].datos[1].nombre+'</td><td>'+actividad[i].datos[1].primer_apellido+'</td><td>'+actividad[i].datos[1].segundo_apellido+'</td><td>'+actividad[i].datos[1].tipo+'</td></tr><tr class="green accent-1"><td>'+actividad[i].datos[0].correo+'</td><td>'+actividad[i].datos[0].nombre+'</td><td>'+actividad[i].datos[0].primer_apellido+'</td><td>'+actividad[i].datos[0].segundo_apellido+'</td><td>'+actividad[i].datos[0].tipo+'</td></tr></tbody>';
                        break;  
                } 
                break;
            case "Eliminado":
                secondIcon="delete_forever";
                switch (actividad[i].categoria){
                    case "Espacio":
                        tbody='<tbody>'
                        for (var u=0; u<actividad[i].datos[0].deletedList.length; u++){
                            tbody+='<tr class="red lighten-4"><td>'+actividad[i].datos[0].deletedList[u].codigo+'</td><td>'+actividad[i].datos[0].deletedList[u].planta+'° Planta</td><td>'+get_aireEspacio(actividad[i].datos[0].deletedList[u].aireAcondicionado)+'</td><td>'+actividad[i].datos[0].deletedList[u].descripcion+'</td></tr>'
                        }
                        tbody+='</tbody>';
                        break;
                    case "Activo":
                        tbody='<tbody>'
                        for (var u=0; u<actividad[i].datos[0].deletedList.length; u++){
                            tbody+='<tr class="red lighten-4"><td>'+actividad[i].datos[0].deletedList[u].codigo+'</td><td>'+actividad[i].datos[0].deletedList[u].tipo+'</td><td>'+actividad[i].datos[0].deletedList[u].espacio+'</td><td>'+actividad[i].datos[0].deletedList[u].descripcion+'</td></tr>'
                        }
                        tbody+='</tbody>';
                        break;
                    case "Usuario":
                        tbody='<tbody>'
                        for (var u=0; u<actividad[i].datos[0].deletedList.length; u++){
                            tbody+='<tr class="red lighten-4"><td>'+actividad[i].datos[0].deletedList[u].correo+'</td><td>'+actividad[i].datos[0].deletedList[u].nombre+'</td><td>'+actividad[i].datos[0].deletedList[u].primer_apellido+'</td><td>'+actividad[i].datos[0].deletedList[u].segundo_apellido+'</td><td>'+actividad[i].datos[0].deletedList[u].tipo+'</td></tr>'
                        }
                        tbody+='</tbody>';
                        break;  
                } 
                break;    
        }
        switch (actividad[i].categoria){
            case "Espacio":
                mainIcon="place";
                table+='<thead><tr><th>Código</th><th>Planta</th><th>Aire</th><th>Descripción</th></tr></thead>';
              
                break;
            case "Activo":
                mainIcon="dashboard";
                table+='<thead><tr><th>Código</th><th>Tipo</th><th>Espacio</th><th>Descripción</th></tr></thead>';
                break;
            case "Usuario":
                mainIcon="people";
                table+='<thead><tr><th>Correo</th><th>Nombre</th><th>1° Apellido</th><th>2° Apellido</th><th>Tipo</th></tr></thead>';
                break;    
        }
        table+=tbody+"</table>";
        var display='<div class="col s12"><div class="card"><!--ID y CHECK--><div style="padding-top:0px; padding-bottom:0px; padding-left:10px; padding-right:0px;" class="card-action grey lighten-2"><div class="row" style="margin-bottom:0px;"><div class="col s12"><p style="margin-bottom:10px;"><i style="margin-right:10px;" class="material-icons left">timeline</i>'+actividad[i]._id+'</p></div></div></div><!--Titulo y Estado--><div style="padding-top:0px; padding-bottom:0px; margin-bottom:0px; padding-left:10px; padding-right:15px;" class="card-action row"><div class="col s9"><h5><i style="margin-right:10px; cursor:pointer;" class="material-icons left">'+mainIcon+'</i>'+actividad[i].categoria+'</h5><p><i style="margin-right:5px;" class="material-icons left">'+secondIcon+'</i>'+actividad[i].tipo+'</p></div><div class="col s3"><p><i style="margin-right:10px; cursor:pointer;" class="material-icons left">date_range</i>'+actividad[i].fecha+'</p></div></div><!--Descripción--><div style="padding-top:5px; padding-bottom:10px; padding-left:15px; padding-right:15px;" class="card-action">'+table+'</div></div></div>';
        $( "#displayMyActivity" ).append( display );
    }
}
function verAgenda(id, codigo){
    document.getElementById("displayAgenda").innerHTML="";
    document.getElementById("labelAgenda").innerHTML=codigo;
    $('#verAgenda').modal('open');
    for (var i=0; i<_espacios.length; i++){
        if (_espacios[i]._id==id){
            for (var u=_espacios[i].agenda.length-1; u>-1; u--){
                var display="<tr><td>"+_espacios[i].agenda[u].fecha+"</td><td>"+_espacios[i].agenda[u].bloques+"</td></tr>";
                 $( "#displayAgenda" ).append( display );
            }
        }
    }
}
function Activity(){
    var messenger = new Object();
    messenger.a = "a";
    $.ajax({
        type: "POST",
        url: ruta+"/Activity",
        dataType: "json",   
        data: JSON.stringify(messenger),
        timeout: 5000,
        success: function(res){
            $('#loading').modal('close');
            if (res.resultado==true){
                displayActivity(res.actividad, true);
            }else{
                var $toastContent = $('<span><i class="material-icons left">error</i> Error de conexión intente más     tarde</span>');
                Materialize.toast($toastContent, 5000, "red");
            }
        },
        error: function(){
            $('#loading').modal('close');
            var $toastContent = $('<span><i class="material-icons left">error</i> Error de conexión</span>');
            Materialize.toast($toastContent, 5000, "red");
        }
    });
}
function displayActivity(actividad, b){
    if (b==true){
          _activity=actividad;
    }
    var d = document;
    d.getElementById("displayActivity").innerHTML="";
    var mainIcon="";
    var secondIcon="";
    var clase=new Array();
    for (var i=actividad.length-1; i>-1; i--){
        var userName="";
        for (var u=0; u<_usuarios.length; u++){
            if (actividad[i].usuario==_usuarios[u].correo){
                userName=_usuarios[u].nombre+" "+_usuarios[u].primer_apellido+" "+_usuarios[u].segundo_apellido;
            }
        }
        var table='<table class="centered responsive-table bordered">';
        var tbody="";
        switch (actividad[i].tipo){
            case "Creado":
                secondIcon="add_circle_outliner";
                switch (actividad[i].categoria){
                    case "Espacio":
                        tbody='<tbody><tr class="green accent-1"><td>'+actividad[i].datos[0].codigo+'</td><td>'+actividad[i].datos[0].planta+'° Planta</td><td>'+get_aireEspacio(actividad[i].datos[0].aireAcondicionado)+'</td><td>'+actividad[i].datos[0].descripcion+'</td></tr></tbody>';
                        break;
                    case "Activo":
                        tbody='<tbody><tr class="green accent-1"><td>'+actividad[i].datos[0].codigo+'</td><td>'+actividad[i].datos[0].tipo+'</td><td>'+actividad[i].datos[0].espacio+'</td><td>'+actividad[i].datos[0].descripcion+'</td></tr></tbody>';
                        break;
                    case "Usuario":
                        tbody='<tbody><tr class="green accent-1"><td>'+actividad[i].datos[0].correo+'</td><td>'+actividad[i].datos[0].nombre+'</td><td>'+actividad[i].datos[0].primer_apellido+'</td><td>'+actividad[i].datos[0].segundo_apellido+'</td><td>'+actividad[i].datos[0].tipo+'</td></tr></tbody>';
                        break;  
                } 
                break;
            case "Editado":
                secondIcon="create";
                switch (actividad[i].categoria){
                    case "Espacio":
                        tbody='<tbody><tr class="red lighten-4"><td>'+actividad[i].datos[1].codigo+'</td><td>'+actividad[i].datos[1].planta+'° Planta</td><td>'+get_aireEspacio(actividad[i].datos[1].aireAcondicionado)+'</td><td>'+actividad[i].datos[1].descripcion+'</td></tr><tr class="green accent-1"><td>'+actividad[i].datos[0].codigo+'</td><td>'+actividad[i].datos[0].planta+'° Planta</td><td>'+get_aireEspacio(actividad[i].datos[0].aireAcondicionado)+'</td><td>'+actividad[i].datos[0].descripcion+'</td></tr></tbody>';
                        break;
                    case "Activo":
                        tbody='<tbody><tr class="red lighten-4"><td>'+actividad[i].datos[1].codigo+'</td><td>'+actividad[i].datos[1].tipo+'</td><td>'+actividad[i].datos[1].espacio+'</td><td>'+actividad[i].datos[1].descripcion+'</td></tr><tr class="green accent-1"><td>'+actividad[i].datos[0].codigo+'</td><td>'+actividad[i].datos[0].tipo+'</td><td>'+actividad[i].datos[0].espacio+'</td><td>'+actividad[i].datos[0].descripcion+'</td></tr></tbody>';
                        break;
                    case "Usuario":
                        tbody='<tbody><tr class="red lighten-4"><td>'+actividad[i].datos[1].correo+'</td><td>'+actividad[i].datos[1].nombre+'</td><td>'+actividad[i].datos[1].primer_apellido+'</td><td>'+actividad[i].datos[1].segundo_apellido+'</td><td>'+actividad[i].datos[1].tipo+'</td></tr><tr class="green accent-1"><td>'+actividad[i].datos[0].correo+'</td><td>'+actividad[i].datos[0].nombre+'</td><td>'+actividad[i].datos[0].primer_apellido+'</td><td>'+actividad[i].datos[0].segundo_apellido+'</td><td>'+actividad[i].datos[0].tipo+'</td></tr></tbody>';
                        break;  
                } 
                break;
            case "Eliminado":
                secondIcon="delete_forever";
                switch (actividad[i].categoria){
                    case "Espacio":
                        tbody='<tbody>'
                        for (var u=0; u<actividad[i].datos[0].deletedList.length; u++){
                            tbody+='<tr class="red lighten-4"><td>'+actividad[i].datos[0].deletedList[u].codigo+'</td><td>'+actividad[i].datos[0].deletedList[u].planta+'° Planta</td><td>'+get_aireEspacio(actividad[i].datos[0].deletedList[u].aireAcondicionado)+'</td><td>'+actividad[i].datos[0].deletedList[u].descripcion+'</td></tr>'
                        }
                        tbody+='</tbody>';
                        break;
                    case "Activo":
                        tbody='<tbody>'
                        for (var u=0; u<actividad[i].datos[0].deletedList.length; u++){
                            tbody+='<tr class="red lighten-4"><td>'+actividad[i].datos[0].deletedList[u].codigo+'</td><td>'+actividad[i].datos[0].deletedList[u].tipo+'</td><td>'+actividad[i].datos[0].deletedList[u].espacio+'</td><td>'+actividad[i].datos[0].deletedList[u].descripcion+'</td></tr>'
                        }
                        tbody+='</tbody>';
                        break;
                    case "Usuario":
                        tbody='<tbody>'
                        for (var u=0; u<actividad[i].datos[0].deletedList.length; u++){
                            tbody+='<tr class="red lighten-4"><td>'+actividad[i].datos[0].deletedList[u].correo+'</td><td>'+actividad[i].datos[0].deletedList[u].nombre+'</td><td>'+actividad[i].datos[0].deletedList[u].primer_apellido+'</td><td>'+actividad[i].datos[0].deletedList[u].segundo_apellido+'</td><td>'+actividad[i].datos[0].deletedList[u].tipo+'</td></tr>'
                        }
                        tbody+='</tbody>';
                        break;  
                } 
                break;    
        }
        switch (actividad[i].categoria){
            case "Espacio":
                mainIcon="place";
                table+='<thead><tr><th>Código</th><th>Planta</th><th>Aire</th><th>Descripción</th></tr></thead>';
              
                break;
            case "Activo":
                mainIcon="dashboard";
                table+='<thead><tr><th>Código</th><th>Tipo</th><th>Espacio</th><th>Descripción</th></tr></thead>';
                break;
            case "Usuario":
                mainIcon="people";
                table+='<thead><tr><th>Correo</th><th>Nombre</th><th>1° Apellido</th><th>2° Apellido</th><th>Tipo</th></tr></thead>';
                break;    
        }
        table+=tbody+"</table>";
        var display='<div class="col s12"><div class="card"><!--ID y CHECK--><div style="padding-top:0px; padding-bottom:0px; padding-left:10px; padding-right:0px;" class="card-action grey lighten-2"><div class="row" style="margin-bottom:0px;"><div class="col s12"><p style="margin-bottom:10px;"><i style="margin-right:10px;" class="material-icons left">timeline</i>'+actividad[i]._id+'</p></div></div></div><!--Titulo y Estado--><div style="padding-top:0px; padding-bottom:0px; margin-bottom:0px; padding-left:10px; padding-right:15px;" class="card-action row"><div class="col s9"><h5><i style="margin-right:10px; cursor:pointer;" class="material-icons left">'+mainIcon+'</i>'+actividad[i].categoria+'</h5><p><i style="margin-right:5px;" class="material-icons left">person</i>'+userName+'</p><p><i style="margin-right:5px;" class="material-icons left">'+secondIcon+'</i>'+actividad[i].tipo+'</p></div><div class="col s3"><p><i style="margin-right:10px; cursor:pointer;" class="material-icons left">date_range</i>'+actividad[i].fecha+'</p></div></div><!--Descripción--><div style="padding-top:5px; padding-bottom:10px; padding-left:15px; padding-right:15px;" class="card-action">'+table+'</div></div></div>';
        $( "#displayActivity" ).append( display );
    }
}
function myHistorySolicitudes(){
    $('#loading').modal('open');
    var messenger=new Object();
    messenger.user=_user.correo;
    $.ajax({
        type: "POST",
        url: ruta+"/verMyHistorySolicitudes",
        dataType: "json",   
        data: JSON.stringify(messenger),
        timeout: 5000,
        success: function(res){
            if (res.resultado==true){
                displayMyHistorySolicitudes(res.datos);
                $('#loading').modal('close');
            }else{
                $('#loading').modal('close');
                var $toastContent = $('<span><i class="material-icons left">warning</i>Se ha perdido la conexión</span>');
                Materialize.toast($toastContent, 2999, "orange");
            }
        },
        error: function(){
            $('#loading').modal('close');
            var $toastContent = $('<span><i class="material-icons left">warning</i>Se ha perdido la conexión</span>');
            Materialize.toast($toastContent, 2999, "orange");
        }
    });
}
function displayMyHistorySolicitudes(solicitudes){
    document.getElementById("displayMyHistorialSolicitudes").innerHTML="";
    for (var i=0; i<solicitudes.length; i++){
        switch (solicitudes[i].tipo){
            case "Activo":
                    var solicitud="";
                    var boletaV="";
                    var activosV="";
                    var cod="";
                    var tip="";
                    var esp="";
                    var des="";
                    boletaV=get_aireEspacio(solicitudes[i].boleta);
                    for (var u=0; u<solicitudes[i].listaDeActivos.length; u++){
                        for (var q=0; q<_activos.length; q++){
                            if (solicitudes[i].listaDeActivos[u]==_activos[q].codigo){
                                cod=_activos[q].codigo;
                                tip=_activos[q].tipo;
                                esp=_activos[q].espacio;
                                des=_activos[q].descripcion;
                            }
                        }
                        activosV=activosV+'<tr class=""><td>'+cod+'</td><td>'+tip+'</td><td>'+esp+'</td>    <td>'+des+'</td></tr>';
                    }   
                    solicitud='<div class="col s12"><div class="card"><!--ID y CHECK--><div style="padding-top:0px; padding-bottom:0px; padding-left:10px; padding-right:0px;"  class="card-action grey lighten-2"><div class="row" style="margin-bottom:0px;"><div     class="col s12"><p style="margin-bottom:10px;"><i style="margin-right:10px;" class="material-icons left">announcement</i>'+solicitudes[i]._id+'</p></div></div></div>  <!--Titulo y Estado--><div style="padding-top:0px; padding-bottom:0px; margin-  bottom:0px; padding-left:10px; padding-right:15px;" class="card-action row"><div    class="col s12 m4"><h5><i style="margin-right:10px; cursor:pointer;" class="material-icons left">dashboard</i>Activos</h5><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Fecha de solicitud"><i style="margin-right:5px;" class="material-icons left">date_range</i>'+solicitudes[i].fechaSolicitud+'</p></div><div class="col s12 m8"><div class="col s12"><p><i style="margin-right:5px;" class="material-icons left">info</i>Informacion</p></div><div class="col s12"><div class="divider"></div></div><div class="col s6"><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Fecha de préstamo"><i style="margin-right:5px;" class="material-icons left">today</i>'+solicitudes[i].fecha+'</p><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Cantidad de dias"><i style="margin-right:5px;" class="material-icons left">timelapse</i>'+solicitudes[i].dias+' días</p></div><div class="col s6"><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Estado de solicitud"><i style="margin-right:5px;" class="material-icons left">gavel</i>'+solicitudes[i].estado+'</p><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Requiere boleta"><i style="margin-right:5px;" class="material-icons left">note</i>'+boletaV+'</p></div></div></div><div style="padding-top:20px; padding-bottom:5px" class="card-content"><span class="right">  </span><span style="padding-bottom:10px;" class="card-title activator grey-text text-darken-4"><i class="material-icons left" style="margin-top: 15px;">keyboard_arrow_up</i></span><br></div><!--Descripción--><div style="padding-top:5px; padding-bottom:10px; padding-left:15px; padding-right:15px;" class="card-reveal"><br><span class="card-title grey-text text-darken-4 col s12"><i style="margin-right:5px;" class="material-icons">info</i>Informacion<i class="material-icons right">close</i></span>  <div class="row">   <div class="col s6"><p><i style="margin-right:5px;" class="material-icons left">comment</i>Comentario</p><p>'+solicitudes[i].mensaje+'</p></div><div class="col s6"><p><i style="margin-right:5px;" class="material-icons left">question_answer</i>Respuesta</p><p>'+solicitudes[i].respuesta+'</p></div></div><table class="centered responsive-table striped"><thead><tr><th>Codigo</th><th>Tipo</th><th>Espacio</th><th>Descripcion</th></tr></thead><tbody>'+activosV+'</tbody></table></div></div></div>';
                    $( "#displayMyHistorialSolicitudes" ).append( solicitud );
                break;
            case "Espacio":
                    var solicitud="";
                    
                    var espacioV="";
                    var cod="";
                    var plnt="";
                    var air="";
                    var des="";
                    var bloques="";
                                               
                    for (var q=0; q<solicitudes[i].bloques.length; q++){
                        bloques=bloques+solicitudes[i].bloques[q];
                        if (q!=solicitudes[i].bloques.length-1){
                            bloques=bloques+", "
                        }
                    }                            
                    for (var q=0; q<_espacios.length; q++){
                        if (solicitudes[i].espacio==_espacios[q].codigo){
                            cod=_espacios[q].codigo;
                            plnt=_espacios[q].planta;
                            air=get_aireEspacio(_espacios[q].aireAcondicionado);
                            des=_espacios[q].descripcion;
                        }
                    }
                    espacioV='<tr class=""><td>'+cod+'</td><td>'+plnt+'° Planta</td><td>'+air+'</td><td>'+des+'</td></tr>';
                    solicitud='<div class="col s12"><div class="card"><!--ID y CHECK--><div style="padding-top:0px; padding-bottom:0px; padding-left:10px; padding-right:0px;" class="card-action grey lighten-2"><div class="row" style="margin-bottom:0px;"><div class="col s12"><p style="margin-bottom:10px;"><i style="margin-right:10px;" class="material-icons left">announcement</i>'+solicitudes[i]._id+'</p></div></div></div><!--Titulo y Estado--><div style="padding-top:0px; padding-bottom:0px; margin-bottom:0px; padding-left:10px; padding-right:15px;" class="card-action row"><div class="col s12 m4"><h5><i style="margin-right:10px; cursor:pointer;" class="material-icons left">place</i>Espacio</h5><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Fecha de solicitud"><i style="margin-right:5px;" class="material-icons left">date_range</i>'+solicitudes[i].fechaSolicitud+'</p></div><div class="col s12 m8"><div class="col s12"><p><i style="margin-right:5px;" class="material-icons left">info</i>Informacion</p></div><div class="col s12"><div class="divider"></div></div><div class="col s6"><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Fecha de prestamo"><i style="margin-right:5px;" class="material-icons left">today</i>'+solicitudes[i].fecha+'</p><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Bloques"><i style="margin-right:5px;" class="material-icons left">widgets</i>'+bloques+'</p></div><div class="col s6"><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Estado de solicitud"><i style="margin-right:5px;" class="material-icons left">gavel</i>'+solicitudes[i].estado+'</p></div></div></div><div style="padding-top:20px; padding-bottom:5px" class="card-content"><span class="right"></span><span style="padding-bottom:10px;" class="card-title activator grey-text text-darken-4"><i class="material-icons left" style="margin-top: 15px;">keyboard_arrow_up</i></span><br></div><!--Descripción--><div style="padding-top:5px; padding-bottom:10px; padding-left:15px; padding-right:15px;" class="card-reveal"><br><span class="card-title grey-text text-darken-4 col s12"><i style="margin-right:5px;" class="material-icons">info</i>Informacion<i class="material-icons right">close</i></span><div class="row"><div class="col s6"><p><i style="margin-right:5px;" class="material-icons left">comment</i>Comentario</p><p>'+solicitudes[i].mensaje+'</p></div><div class="col s6"><p><i style="margin-right:5px;" class="material-icons left">question_answer</i>Respuesta</p><p>'+solicitudes[i].respuesta+'</p></div></div><table class="centered responsive-table striped"><thead><tr><th>Codigo</th><th>Planta</th><th>Aire</th><th>Descripcion</th></tr></thead><tbody>'+espacioV+'</tbody></table></div></div></div>';                    
                    $( "#displayMyHistorialSolicitudes" ).append( solicitud );
                break;
            case "Soporte":
                    var solicitud="";
                    solicitud='<div class="col s12"><div class="card"><!--ID y CHECK--><div style="padding-top:0px; padding-bottom:0px; padding-left:10px; padding-right:0px;" class="card-action grey lighten-2"><div class="row" style="margin-bottom:0px;"><div class="col s12"><p style="margin-bottom:10px;"><i style="margin-right:10px;" class="material-icons left">announcement</i>'+solicitudes[i]._id+'</p></div></div></div><!--Titulo y Estado--><div style="padding-top:0px; padding-bottom:0px; margin-bottom:0px; padding-left:10px; padding-right:15px;" class="card-action row"><div class="col s12 m4"><h5><i style="margin-right:10px; cursor:pointer;" class="material-icons left">build</i>Soporte</h5><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Fecha de solicitud"><i style="margin-right:5px;" class="material-icons left">date_range</i>'+solicitudes[i].fechaSolicitud+'</p></div><div class="col s12 m8"><div class="col s12"><p><i style="margin-right:5px;" class="material-icons left">info</i>Informacion</p></div><div class="col s12"><div class="divider"></div></div><div class="col s6"><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Estado de soporte"><i style="margin-right:5px;" class="material-icons left">textsms</i>'+solicitudes[i].estadoSoporte+'</p><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Prioridad"><i style="margin-right:5px;" class="material-icons left">new_releases</i>'+solicitudes[i].prioridad+'</p></div><div class="col s6"><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Estado de solicitud"><i style="margin-right:5px;" class="material-icons left">gavel</i>'+solicitudes[i].estado+'</p><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Espacio"><i style="margin-right:5px;" class="material-icons left">place</i>'+solicitudes[i].espacio+'</p></div></div></div><div style="padding-top:20px; padding-bottom:5px" class="card-content"><span style="padding-bottom:10px;" class="card-title activator grey-text text-darken-4"><i class="material-icons left" style="margin-top: 15px;">keyboard_arrow_up</i></span><br></div><!--Descripción--><div style="padding-top:5px; padding-bottom:10px; padding-left:15px; padding-right:15px;" class="card-reveal"><br><span class="card-title grey-text text-darken-4 col s12"><i style="margin-right:5px;" class="material-icons">info</i>Informacion<i class="material-icons right">close</i></span><div class="col s6"><p><i style="margin-right:5px;" class="material-icons left">comment</i>Comentario</p><p>'+solicitudes[i].mensaje+'</p></div><div class="col s6"><p><i style="margin-right:5px;" class="material-icons left">question_answer</i>Respuesta</p><p>'+solicitudes[i].respuesta+'</p></div>';
                    $( "#displayMyHistorialSolicitudes" ).append( solicitud );
                break;
        }    
    }
    $('.tooltipped').tooltip({delay: 50});
}
function mySoporteLista(){
    $('#loading').modal('open');
    var messenger=new Object();
    messenger.user=_user.correo;
    $.ajax({
        type: "POST",
        url: ruta+"/verMySolicitudesSup",
        dataType: "json",   
        data: JSON.stringify(messenger),
        timeout: 5000,
        success: function(res){
            if (res.resultado==true){
                displayMySoporteLista(res.datos);
                $('#loading').modal('close');
            }else{
                 $('#loading').modal('close');
                var $toastContent = $('<span><i class="material-icons left">warning</i>Se ha perdido la conexión</span>');
                Materialize.toast($toastContent, 2999, "orange");
            }
        },
        error: function(){
             $('#loading').modal('close');
            var $toastContent = $('<span><i class="material-icons left">warning</i>Se ha perdido la conexión</span>');
            Materialize.toast($toastContent, 2999, "orange");
        }
    });
}
function displayMySoporteLista(solicitudez){
    document.getElementById("displayMyListSoporte").innerHTML="";
    var solicitudes=new Array();
    for (var i=0; i<solicitudez.length; i++){
        if (solicitudez[i].prioridad=="Alta"){
            solicitudes.push(solicitudez[i]);
        }
    }
    for (var i=0; i<solicitudez.length; i++){
        if (solicitudez[i].prioridad=="Media"){
            solicitudes.push(solicitudez[i]);
        }
    }
    for (var i=0; i<solicitudez.length; i++){
        if (solicitudez[i].prioridad=="Baja"){
            solicitudes.push(solicitudez[i]);
        }
    }
    for (var i=0; i<solicitudes.length; i++){
        var solicitud="";
        solicitud='<div class="col s12"><div class="card"><!--ID y CHECK--><div style="padding-top:0px; padding-bottom:0px; padding-left:10px; padding-right:0px;" class="card-action grey lighten-2"><div class="row" style="margin-bottom:0px;"><div class="col s12"><p style="margin-bottom:10px;"><i style="margin-right:10px;" class="material-icons left">announcement</i>'+solicitudes[i]._id+'</p></div></div></div><!--Titulo y Estado--><div style="padding-top:0px; padding-bottom:0px; margin-bottom:0px; padding-left:10px; padding-right:15px;" class="card-action row"><div class="col s12 m4"><h5><i style="margin-right:10px; cursor:pointer;" class="material-icons left">build</i>Soporte</h5><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Fecha de solicitud"><i style="margin-right:5px;" class="material-icons left">date_range</i>'+solicitudes[i].fechaSolicitud+'</p></div><div class="col s12 m8"><div class="col s12"><p><i style="margin-right:5px;" class="material-icons left">info</i>Informacion</p></div><div class="col s12"><div class="divider"></div></div><div class="col s6"><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Estado de soporte"><i style="margin-right:5px;" class="material-icons left">textsms</i>'+solicitudes[i].estadoSoporte+'</p><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Prioridad"><i style="margin-right:5px;" class="material-icons left">new_releases</i>'+solicitudes[i].prioridad+'</p></div><div class="col s6"><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Estado de solicitud"><i style="margin-right:5px;" class="material-icons left">gavel</i>'+solicitudes[i].estado+'</p><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Espacio"><i style="margin-right:5px;" class="material-icons left">place</i>'+solicitudes[i].espacio+'</p></div></div></div><div style="padding-top:20px; padding-bottom:5px" class="card-content"><span style="padding-bottom:10px;" class="card-title activator grey-text text-darken-4"><i class="material-icons left" style="margin-top: 15px;">keyboard_arrow_up</i></span>        <br></div><!--Descripción--><div style="padding-top:5px; padding-bottom:10px; padding-left:15px; padding-right:15px;" class="card-reveal"><br><span class="card-title grey-text text-darken-4 col s12"><i style="margin-right:5px;" class="material-icons">info</i>Informacion<i class="material-icons right">close</i></span><div class="col s6"><p><i style="margin-right:5px;" class="material-icons left">comment</i>Comentario</p><p>'+solicitudes[i].mensaje+'</p></div><div class="col s6"><p><i style="margin-right:5px;" class="material-icons left">question_answer</i>Respuesta</p><p>'+solicitudes[i].respuesta+'</p></div>';
        $( "#displayMyListSoporte" ).append( solicitud );
    }
    $('.tooltipped').tooltip({delay: 50});
}
function mySolicitudesPendientes(){
    $('#loading').modal('open');
    var messenger=new Object();
    messenger.user=_user.correo;
    $.ajax({
                type: "POST",
                url: ruta+"/verMySolicitudesPendientes",
                dataType: "json",   
                data: JSON.stringify(messenger),
                timeout: 5000,
                success: function(res){
                   if (res.resultado==true){
                       displayMySolicitudesPendientes(res.datos);
                       $('#loading').modal('close');
                   }else{
                        $('#loading').modal('close');
                        var $toastContent = $('<span><i class="material-icons left">warning</i>Se ha perdido la conexión</span>');
                        Materialize.toast($toastContent, 2999, "orange");
                   }
                },
                error: function(){
                   $('#loading').modal('close');
                    var $toastContent = $('<span><i class="material-icons left">warning</i>Se ha perdido la conexión</span>');
                    Materialize.toast($toastContent, 2999, "orange");
                }
        });
}
function displayMySolicitudesPendientes(solicitudes){
    document.getElementById("displayMyPendientes").innerHTML="";
    for (var i=0; i<solicitudes.length; i++){
        switch (solicitudes[i].tipo){
            case "Activo":
                    var solicitud="";
                    var boletaV="";
                    var activosV="";
                    var cod="";
                    var tip="";
                    var esp="";
                    var des="";
                    boletaV=get_aireEspacio(solicitudes[i].boleta);
                    for (var u=0; u<solicitudes[i].listaDeActivos.length; u++){
                        for (var q=0; q<_activos.length; q++){
                            if (solicitudes[i].listaDeActivos[u]==_activos[q].codigo){
                                cod=_activos[q].codigo;
                                tip=_activos[q].tipo;
                                esp=_activos[q].espacio;
                                des=_activos[q].descripcion;
                            }
                        }
                        activosV=activosV+'<tr class=""><td>'+cod+'</td><td>'+tip+'</td><td>'+esp+'</td><td>'+des+'</td></tr>';
                    }
                    solicitud=' <div class="col s12"><div class="card"><!--ID y CHECK--><div style="padding-top:0px; padding-bottom:0px; padding-left:10px; padding-right:0px;" class="card-action grey lighten-2"><div class="row" style="margin-bottom:0px;"><div class="col s12"><p style="margin-bottom:10px;"><i style="margin-right:10px;" class="material-icons left">announcement</i>'+solicitudes[i]._id+'</p></div></div></div><!--Titulo y Estado--><div style="padding-top:0px; padding-bottom:0px; margin-bottom:0px; padding-left:10px; padding-right:15px;" class="card-action row"><div class="col s12 m4"><h5><i style="margin-right:10px; cursor:pointer;" class="material-icons left">dashboard</i>Activos</h5><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Fecha de solicitud"><i style="margin-right:5px;" class="material-icons left">date_range</i>'+solicitudes[i].fechaSolicitud+'</p></div><div class="col s12 m8"><div class="col s12"><p><i style="margin-right:5px;" class="material-icons left">info</i>Informacion</p></div><div class="col s12"><div class="divider"></div></div><div class="col s6"><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Fecha de préstamo"><i style="margin-right:5px;" class="material-icons left">today</i>'+solicitudes[i].fecha+'</p><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Cantidad de dias"><i style="margin-right:5px;" class="material-icons left">timelapse</i>'+solicitudes[i].dias+' días</p></div><div class="col s6"><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Estado de solicitud"><i style="margin-right:5px;" class="material-icons left">gavel</i>'+solicitudes[i].estado+'</p><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Requiere boleta"><i style="margin-right:5px;" class="material-icons left">note</i>'+boletaV+'</p></div></div></div><div style="padding-top:20px; padding-bottom:5px" class="card-content"><span style="padding-bottom:10px;" class="card-title activator grey-text text-darken-4"><i class="material-icons left" style="margin-top: 15px;">keyboard_arrow_up</i></span><br></div><!--Descripción--><div style="padding-top:5px; padding-bottom:10px; padding-left:15px; padding-right:15px;" class="card-reveal"><br><span class="card-title grey-text text-darken-4 col s12"><i style="margin-right:5px;" class="material-icons">info</i>Informacion<i class="material-icons right">close</i></span><div class="col s12"><p><i style="margin-right:5px;" class="material-icons left">comment</i>Comentario</p><p>'+solicitudes[i].mensaje+'</p></div><table class="centered responsive-table striped"><thead><tr><th>Codigo</th><th>Tipo</th><th>Espacio</th><th>Descripcion</th></tr></thead><tbody>'+activosV+'</tbody></table></div></div></div>';
                    $( "#displayMyPendientes" ).append( solicitud );
                break;
            case "Espacio":
                    var solicitud="";                                          
                    var espacioV="";
                    var cod="";
                    var plnt="";
                    var air="";
                    var des="";
                    var bloques="";                           
                    for (var q=0; q<solicitudes[i].bloques.length; q++){
                        bloques=bloques+solicitudes[i].bloques[q];
                        if (q!=solicitudes[i].bloques.length-1){
                            bloques=bloques+", "
                        }
                    }        
                    for (var q=0; q<_espacios.length; q++){
                        if (solicitudes[i].espacio==_espacios[q].codigo){
                            cod=_espacios[q].codigo;
                            plnt=_espacios[q].planta;
                            air=get_aireEspacio(_espacios[q].aireAcondicionado);
                            des=_espacios[q].descripcion;
                        }
                    }
                    espacioV='<tr class=""><td>'+cod+'</td><td>'+plnt+'° Planta</td><td>'+air+'</td><td>'+des+'</td></tr>';
                    solicitud='<div class="col s12"><div class="card"><!--ID y CHECK--><div style="padding-top:0px; padding-bottom:0px; padding-left:10px; padding-right:0px;" class="card-action grey lighten-2"><div class="row" style="margin-bottom:0px;"><div class="col s12"><p style="margin-bottom:10px;"><i style="margin-right:10px;" class="material-icons left">announcement</i>'+solicitudes[i]._id+'</p></div></div></div><!--Titulo y Estado--><div style="padding-top:0px; padding-bottom:0px; margin-bottom:0px; padding-left:10px; padding-right:15px;" class="card-action row"><div class="col s12 m4"><h5><i style="margin-right:10px; cursor:pointer;" class="material-icons left">place</i>Espacio</h5><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Fecha de solicitud"><i style="margin-right:5px;" class="material-icons left">date_range</i>'+solicitudes[i].fechaSolicitud+'</p></div><div class="col s12 m8"><div class="col s12"><p><i style="margin-right:5px;" class="material-icons left">info</i>Informacion</p></div><div class="col s12"><div class="divider"></div></div><div class="col s6"><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Fecha de prestamo"><i style="margin-right:5px;" class="material-icons left">today</i>'+solicitudes[i].fecha+'</p><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Bloques"><i style="margin-right:5px;" class="material-icons left">widgets</i>'+bloques+'</p></div><div class="col s6"><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Estado de solicitud"><i style="margin-right:5px;" class="material-icons left">gavel</i>'+solicitudes[i].estado+'</p></div></div></div><div style="padding-top:20px; padding-bottom:5px" class="card-content"><span style="padding-bottom:10px;" class="card-title activator grey-text text-darken-4"><i class="material-icons left" style="margin-top: 15px;">keyboard_arrow_up</i></span><br></div><!--Descripción--><div style="padding-top:5px; padding-bottom:10px; padding-left:15px; padding-right:15px;" class="card-reveal"><br><span class="card-title grey-text text-darken-4 col s12"><i style="margin-right:5px;" class="material-icons">info</i>Informacion<i class="material-icons right">close</i></span><div class="col s12"><p><i style="margin-right:5px;" class="material-icons left">comment</i>Comentario</p><p>'+solicitudes[i].mensaje+'</p></div><table class="centered responsive-table striped"><thead><tr><th>Codigo</th><th>Planta</th><th>Aire</th><th>Descripcion</th></tr></thead><tbody>'+espacioV+'</tbody></table></div></div></div>';                                            
                    $( "#displayMyPendientes" ).append( solicitud );
                break;
            case "Soporte":
                    var solicitud="";
                    solicitud='<div class="col s12"><div class="card"><!--ID y CHECK--><div style="padding-top:0px; padding-bottom:0px; padding-left:10px; padding-right:0px;" class="card-action grey lighten-2"><div class="row" style="margin-bottom:0px;"><div class="col s12"><p style="margin-bottom:10px;"><i style="margin-right:10px;" class="material-icons left">announcement</i>'+solicitudes[i]._id+'</p></div></div></div><!--Titulo y Estado--><div style="padding-top:0px; padding-bottom:0px; margin-bottom:0px; padding-left:10px; padding-right:15px;" class="card-action row"><div class="col s12 m4"><h5><i style="margin-right:10px; cursor:pointer;" class="material-icons left">build</i>Soporte</h5><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Fecha de solicitud"><i style="margin-right:5px;" class="material-icons left">date_range</i>'+solicitudes[i].fechaSolicitud+'</p></div><div class="col s12 m8"><div class="col s12"><p><i style="margin-right:5px;" class="material-icons left">info</i>Informacion</p></div><div class="col s12"><div class="divider"></div></div><div class="col s6"><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Estado de soporte"><i style="margin-right:5px;" class="material-icons left">textsms</i>'+solicitudes[i].estadoSoporte+'</p><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Prioridad"><i style="margin-right:5px;" class="material-icons left">new_releases</i>'+solicitudes[i].prioridad+'</p></div><div class="col s6"><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Estado de solicitud"><i style="margin-right:5px;" class="material-icons left">gavel</i>'+solicitudes[i].estado+'</p><p class="tooltipped" data-position="left" data-delay="50" data-tooltip="Espacio"><i style="margin-right:5px;" class="material-icons left">place</i>'+solicitudes[i].espacio+'</p></div></div></div><div style="padding-top:20px; padding-bottom:5px" class="card-content"><span style="padding-bottom:10px;" class="card-title activator grey-text text-darken-4"><i class="material-icons left" style="margin-top: 15px;">keyboard_arrow_up</i></span><br></div><!--Descripción--><div style="padding-top:5px; padding-bottom:10px; padding-left:15px; padding-right:15px;" class="card-reveal"><br><span class="card-title grey-text text-darken-4 col s12"><i style="margin-right:5px;" class="material-icons">info</i>Informacion<i class="material-icons right">close</i></span><div class="col s12"><p><i style="margin-right:5px;" class="material-icons left">comment</i>Comentario</p><p>'+solicitudes[i].mensaje+'</p></div></div></div></div>';
                    $( "#displayMyPendientes" ).append( solicitud );
                break;
        }
    }
    $('.tooltipped').tooltip({delay: 50});
}
function userConfig(){
    document.getElementById("config-nombre").value=_user.nombre;
    document.getElementById("config-apellido1").value=_user.primer_apellido;
    document.getElementById("config-apellido2").value=_user.segundo_apellido;
    Materialize.updateTextFields();
    $( "#config-nombre" ).addClass( "valid" );
    $( "#config-apellido1" ).addClass( "valid" );
    $( "#config-apellido2" ).addClass( "valid" );
}
function edituUser(){
    var d=document;
    $('#loading').modal('open');
    var messenger=new Object();
    messenger.correo=_user.correo;
    messenger.nombre=d.getElementById("config-nombre").value;
    messenger.apellido1=d.getElementById("config-apellido1").value;
    messenger.apellido2=d.getElementById("config-apellido2").value;
    messenger.pass=d.getElementById("config-pass").value;
    messenger.npass=d.getElementById("config-npass").value;
    var valid=true;
    if (messenger.nombre==""){
        valid=false;
    }
    if (messenger.apellido1==""){
        valid=false;
    }
    if (messenger.apellido2==""){
        valid=false;
    }
    if (messenger.pass==""){
        valid=false;
        $( "#config-pass" ).addClass( "invalid" );
    }
    if (valid==true){
        $.ajax({
                type: "POST",
                url: ruta+"/editUser",
                dataType: "json",   
                data: JSON.stringify(messenger),
                timeout: 5000,
                success: function(res){
                   if (res.resultado==true){
                        var $toastContent = $('<span><i class="material-icons left">check</i>Configuración guardada</span>');
                        Materialize.toast($toastContent, 2999, "green");
                        window.location="/dashboard";
                   }else{
                       if (res.causa){
                            $('#loading').modal('close');
                            var $toastContent = $('<span><i class="material-icons left">error</i>Contraseña incorrecta</span>');
                            Materialize.toast($toastContent, 2999, "red");
                       }else{
                            $('#loading').modal('close');
                            var $toastContent = $('<span><i class="material-icons left">warning</i>Se ha perdido la conexión</span>');
                            Materialize.toast($toastContent, 2999, "orange");
                       }
                   }
                },
                error: function(){
                   $('#loading').modal('close');
                    var $toastContent = $('<span><i class="material-icons left">warning</i>Se ha perdido la conexión</span>');
                    Materialize.toast($toastContent, 2999, "orange");
                }
        });
    }else{
        $('#loading').modal('close');
        var $toastContent = $('<span><i class="material-icons left">warning</i>Debe llenar todos los campos</span>');
        Materialize.toast($toastContent, 2999, "orange");
    }
}
