//Paquetes
var express= require('express'); //Express se encarga del intercambio de datos del protocolo HTTP
var mongoose= require("mongoose"); //Mongoose se de las conexiones con la base de datos de MongoDB
var dotenv = require('dotenv');//Permite leer datos sensibles desde el archivo .env, estos se leen desde el objeto process.env
dotenv.load();
//Aun no voy a usar estos
//var nodemailer = require('nodemailer');//NodeMailer se encarga del envio de correos electronicos
//var xoauth2 = require('xoauth2'); //XOAuth2 se encarga de las credenciales del servicio de la api de Gmail
//Creacion del servidor
var app = new express();

mongoose.connect (process.env.urldb); //Ruta de conexion con la base de datos de TICS
mongoose.connection.on('connected', function () {  
  console.log('Conexion con la base de datos ha sido exitosa');
});
mongoose.connection.on('error',function (err) {  
  console.log('Error al conectar con la base de datos: '+err);
});
//MODELO de datos
var Schema = mongoose.Schema; //Se inicializa el modelo de esquemas
//Se declaran las TABLAS y sus ATRIBUTOS
var usuario_esquema={
    correo: String,
    nombre: String,
    primer_apellido: String,
    segundo_apellido: String,
    tipo: String,
    contrasena: String
};
var espacios_esquema={
    codigo: String,
    planta: String,
    descripcion: String,
    aireAcondicionado: Boolean,
    estado: Boolean,
    agenda: [] //sistema de bloques y fechas      
};
var activos_esquema={
    codigo: String,
    tipo: String,
    descripcion: String,
    estado: String,
    espacio: String,
    agenda: []
};
var solicitudes_esquema={
    tipo: String,
    fechaSolicitud:String,
    solicitante: String,
    mensaje: String,
    fecha:String,
    estado: String,
    respuesta: String,
    listaDeActivos: [],
    dias: String,
    boleta: Boolean,
    espacio: String,
    bloques: [], 
    prioridad: String,
    estadoSoporte: String 
};
var actividad_esquema={
    categoria: String,
    tipo: String,
    usuario:String,
    datos: [], 
    fecha: String
}
//Se crean las instancias y las tablas
//En esta seccion se crean la funciones de manejamiento de consultas con las diferentes colecciones
var Usuario = mongoose.model("usuarios", usuario_esquema);
var Espacio = mongoose.model("espacios", espacios_esquema);
var Activo = mongoose.model("activos", activos_esquema);
var Solicitud = mongoose.model("solicitudes", solicitudes_esquema);
var Actividad = mongoose.model("actividad", actividad_esquema);
//Recursos
//Esta es la ruta a partir de la cual el servidor servirá los archivos necesarios en las paginas
app.use(express.static("public")); 
//GET
app.get("/", function(req, res){
    res.render("login.jade");
    res.end();
});
app.get("/dashboard", function(req, res){
    res.render("dashboard.jade");
    res.end();
});
//usuarioS
app.post("/signIn", function(req, res){
    var store = {};var binario;var datos;
    req.on('data', function(data){store = data;binario=(store.toString('utf8'));datos=JSON.parse(binario);});
    req.on('end', function(){
        Usuario.findOne( { 'correo' : datos.correo, 'contrasena' : datos.pass }, function (err, results){
            var respuesta= new Object();
            if (results==null){
                respuesta.resultado="error";
                res.setHeader("Content-Type", "text/json", "Access-Control-Allow-Origin", "*");
                res.send(respuesta);
                res.end();
            }else{
                respuesta.resultado="ok";
                respuesta.nombreCompleto=results.nombre+" "+results.primer_apellido;
                respuesta.key={ncrt: results.correo,
                               bnr: results._id,
                               zlk: results.tipo
                              }
                res.setHeader("Content-Type", "text/json", "Access-Control-Allow-Origin", "*");
                res.send(respuesta);
                res.end();
            }
        });
    });   
});
app.post("/_", function(req, res){
    var store = {};var binario;var datos;
    req.on('data', function(data){store = data;binario=(store.toString('utf8'));datos=JSON.parse(binario);});
    req.on('end', function(){
        Usuario.findOne( { 'correo' : datos.ncrt, '_id' : datos.bnr }, function (err, results){
            var respuesta= new Object();
            if (results==null){
                respuesta.resultado=false;
                res.setHeader("Content-Type", "text/json", "Access-Control-Allow-Origin", "*");
                res.send(respuesta);
                res.end();
            }else{
                respuesta.resultado=true;
                respuesta.u={
                  correo : results.correo,
                  nombre : results.nombre,
                  primer_apellido : results.primer_apellido,
                  segundo_apellido : results.segundo_apellido,
                  tipo : results.tipo,    
                }
                res.setHeader("Content-Type", "text/json", "Access-Control-Allow-Origin", "*");
                res.send(respuesta);
                res.end();
            }
        });
    });   
});
app.post("/nuevoUsuario", function(req, res){
    var store = {};var binario;var datos;  
    req.on('data', function(data){store = data;binario=(store.toString('utf8'));datos=JSON.parse(binario);});
    req.on('end', function(){
        Usuario.findOne( { 'correo' : datos.correo }, 'correo', function (err, results){
            var respuesta= new Object();
            respuesta.resultado="";
            if (results==null){
                var usuarioData =  new Usuario(datos);
                usuarioData.save(function(err){
                    respuesta.resultado="ok";    
                    if (err){
                        respuesta.resultado="errB";  
                    }
                    res.setHeader("Content-Type", "text/json", "Access-Control-Allow-Origin", "*");
                    res.send(respuesta);
                    res.end();
                }); 
            }else{
                respuesta.resultado="errA";
                res.setHeader("Content-Type", "text/json", "Access-Control-Allow-Origin", "*");
                res.send(respuesta);
                res.end();
            }
            
        });
    });   
});
app.post("/cambiar_contrasena_usuario", function(req, res){
    var store = {};var binario;var datos;  
    req.on('data', function(data){store = data;binario=(store.toString('utf8'));datos=JSON.parse(binario);});
    req.on('end', function(){  
       Usuario.findOne( { 'correo' : datos.correo, 'contraseña' : datos.pass }, function (err, results){  
           var respuesta=new Object(); 
           if (results==null){
                respuesta.resultado="error-a";
            }else{ 
                Usuario.update({ 'correo': datos.correo }, { $set: { 'contrasena': datos.nueva_contrasena }}, function(err){
                    if (err){
                        respuesta.resultado="error-b";
                    }
                    respuesta.resultado="ok";
                }); 
            }
            res.setHeader("Content-Type", "text/json", "Access-Control-Allow-Origin", "*");
            res.send(respuesta);
            res.end();
        });
    }); 
});
app.post("/eliminarUsuarios", function(req, res){
    var store = {};var binario;var datos;  
    req.on('data', function(data){store = data;binario=(store.toString('utf8'));datos=JSON.parse(binario);});
    req.on('end', function(){
        Usuario.remove({_id:{ $in: datos.elementos }}, function(err){
            var respuesta=new Object();
            respuesta.resultado="ok";
            if (err){
                respuesta.resultado="err";
            }
            respuesta.elementos=datos.elementos.length;
            respuesta.tipo="Usuario";
            res.setHeader("Content-Type", "text/json", "Access-Control-Allow-Origin", "*");
            res.send(respuesta);
            res.end();
        });
    });
});
//espacios
app.post("/nuevoEspacio", function(req, res){
    var store = {};var binario;var datos;  
    req.on('data', function(data){store = data;binario=(store.toString('utf8'));datos=JSON.parse(binario);});
    req.on('end', function(){
        var respuesta= new Object();
        respuesta.resultado="";
        var espacioData =  new Espacio(datos);
        espacioData.estado=false;
        espacioData.save(function(err, doc){
            respuesta.resultado="ok";    
            if (err){
                respuesta.resultado="error-a";     
            }else{
                 var arr=new Array();
                 arr[0]= doc;
                 newActivity('Espacio', 'Creado', datos.user, arr);
            }
            res.setHeader("Content-Type", "text/json", "Access-Control-Allow-Origin", "*");
            res.send(respuesta);
            res.end();
        }); 
    });   
});
app.post("/editarEspacio", function(req, res){
    var store = {};var binario;var datos;  
    req.on('data', function(data){store = data;binario=(store.toString('utf8'));datos=JSON.parse(binario);});
    req.on('end', function(){  
        var respuesta=new Object();   
        respuesta.resultado="error-a";
        Espacio.findOne({ 'codigo': datos.id }, function(err, predoc){
            Espacio.update({ 'codigo': datos.id }, 
                           { $set: { 
                                'descripcion': datos.descripcion,
                                'planta': datos.planta,
                                'estado': datos.estado,
                                'aireAcondicionado': datos.aireAcondicionado
                                }
                            }, 
            function(err){
                var respuesta=new Object(); 
                if (err){
                    respuesta.resultado="error-b";
                    res.setHeader("Content-Type", "text/json", "Access-Control-Allow-Origin", "*");
                    res.send(respuesta);
                    res.end();
                }else{
                    Espacio.findOne({ 'codigo': datos.id }, function(err, doc){
                        respuesta.id=doc._id;
                        if (err){
                            respuesta.resultado="error-b";
                        }else{
                            respuesta.resultado="ok";
                             var arr=new Array();
                             arr[0]= doc;
                             arr[1]= predoc;
                             newActivity('Espacio', 'Editado', datos.user, arr);
                        }
                        res.setHeader("Content-Type", "text/json", "Access-Control-Allow-Origin", "*");
                        res.send(respuesta);
                        res.end();
                    });
                }
            });
        }); 
    }); 
});
app.post("/eliminarEspacios", function(req, res){
    var store = {};var binario;var datos;  
    req.on('data', function(data){store = data;binario=(store.toString('utf8'));datos=JSON.parse(binario);});
    req.on('end', function(){
        Espacio.find({_id:{ $in: datos.elementos }}, function(err, docs){
            Espacio.remove({_id:{ $in: datos.elementos }}, function(err){
                var respuesta=new Object();
                respuesta.resultado="ok";
                if (err){
                    respuesta.resultado="err";
                }else{
                    var doc=new Object();
                    doc.deletedList=docs;
                    var arr=new Array();
                    arr[0]= doc;
                    newActivity('Espacio', 'Eliminado', datos.user, arr);
                }
                respuesta.elementos=datos.elementos.length;
                respuesta.tipo="Espacio";
                res.setHeader("Content-Type", "text/json", "Access-Control-Allow-Origin", "*");
                res.send(respuesta);
                res.end();
            });  
        });
    });
});
app.post("/nuevoActivo", function(req, res){
    var store = {};var binario;var datos;  
    req.on('data', function(data){store = data;binario=(store.toString('utf8'));datos=JSON.parse(binario);});
    req.on('end', function(){
        var respuesta= new Object();
        respuesta.resultado="";
        for (var i=0; i < datos.cantidad; i++){
            guardarActivos(datos, i);
            if (i==datos.cantidad-1){
                res.setHeader("Content-Type", "text/json", "Access-Control-Allow-Origin", "*");
                res.send(respuesta);
                res.end();
            }
        }
    });   
});
function guardarActivos(datos, i){
    var activoData =  new Activo(datos);
    activoData.codigo = "";
    Activo.findOne({'tipo':datos.tipo}, function(err, pack){
        if (pack==null){
                    activoData.codigo="";
                    if (datos.tipo=="Auxiliar"){
                        activoData.codigo="AUX";
                    }
                    if (datos.tipo=="Equipo"){
                        activoData.codigo="EQU";
                    }
                     if (datos.tipo=="Mobiliario"){
                        activoData.codigo="MOB";
                    }
                    activoData.codigo=activoData.codigo+"-1";
                    activoData.save(function(err){
                        /*respuesta.resultado="ok";    
                        if (err){
                            respuesta.resultado="error-a";     
                        }*/
                    });
        }else{
                    var disponible="";
                    var packCode=pack.codigo;
                    var arrayPack= packCode.split("-");
                    var num_text=arrayPack[1];
                    var num_n=  parseInt(num_text);
                    var n_num= num_n+1+i;
                    var numero= n_num.toString();
                    if (datos.tipo=="Auxiliar"){
                        activoData.codigo="AUX";
                    }
                    if (datos.tipo=="Equipo"){
                        activoData.codigo="EQU";
                    }
                     if (datos.tipo=="Mobiliario"){
                        activoData.codigo="MOB";
                    }
                    activoData.codigo=activoData.codigo+"-"+numero;
                    activoData.save(function(err){
                        /*respuesta.resultado="ok";    
                        if (err){
                            respuesta.resultado="error-a";     
                        }*/
                    }); 
        }   
    }).sort({ _id : -1 });
}
app.post("/editarActivo", function(req, res){
    var store = {};var binario;var datos;  
    req.on('data', function(data){store = data;binario=(store.toString('utf8'));datos=JSON.parse(binario);});
    req.on('end', function(){   
           Activo.update({ 'codigo': datos.id }, 
                          { $set: { 
                              'descripcion': datos.descripcion,
                              'estado':datos.estado,
                              'espacio':datos.espacio
                            }
                          }, 
            function(err){
               var respuesta=new Object(); 
                if (err){
                    respuesta.resultado="error-b";
                     res.setHeader("Content-Type", "text/json", "Access-Control-Allow-Origin", "*");
                     res.send(respuesta);
                     res.end();
                }else{
                    Activo.findOne({ 'codigo': datos.id }, function(err, doc){
                        respuesta.id=doc._id;
                        if (err){
                            respuesta.resultado="error-b";
                        }else{
                            respuesta.resultado="ok";
                        }
                        res.setHeader("Content-Type", "text/json", "Access-Control-Allow-Origin", "*");
                        res.send(respuesta);
                        res.end();
                    });
                }
            }); 
    }); 
});
app.post("/eliminarActivos", function(req, res){
    var store = {};var binario;var datos;  
    req.on('data', function(data){store = data;binario=(store.toString('utf8'));datos=JSON.parse(binario);});
    req.on('end', function(){
        Activo.remove({_id:{ $in: datos.elementos }}, function(err){
            var respuesta=new Object();
            respuesta.resultado="ok";
            if (err){
                respuesta.resultado="err";
            }
            respuesta.elementos=datos.elementos.length;
            respuesta.tipo="Activo";
            res.setHeader("Content-Type", "text/json", "Access-Control-Allow-Origin", "*");
            res.send(respuesta);
            res.end();
        });
    });
});
app.post("/nuevaSolicitud", function(req, res){
    var store = {};var binario;var datos;  
    req.on('data', function(data){store = data;binario=(store.toString('utf8'));datos=JSON.parse(binario);});
    req.on('end', function(){
        var respuesta= new Object();
        respuesta.resultado="";
        
        var m_names = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
        var d = new Date();
        var curr_date = d.getDate();
        var curr_month = d.getMonth();
        var curr_year = d.getFullYear();
        var fecha_=curr_date + " " + m_names[curr_month] + ", " + curr_year;
        switch(datos.tipo){
            case "Activo":
                var solicitudData =  new Solicitud({
                    fechaSolicitud: fecha_,
                    estado: "Espera",//Aprobada, Rechazada, espera
                    tipo: datos.tipo,
                    solicitante: datos.solicitante,
                    mensaje: datos.mensaje,
                    fecha:datos.fecha,
                    listaDeActivos: datos.listaDeActivos,
                    dias: datos.dias,
                    boleta: datos.boleta,
                    respuesta: ""
                });
                solicitudData.save(function(err){
                    respuesta.resultado="ok";    
                    if (err){
                        respuesta.resultado="error-a";     
                    }
                    res.setHeader("Content-Type", "text/json", "Access-Control-Allow-Origin", "*");
                    res.send(respuesta);
                    res.end();
                });
                break;
            case "Espacio":
                 var solicitudData =  new Solicitud({
                    fechaSolicitud: fecha_,
                    estado: "Espera",//Aprobada, Rechazada, espera
                    tipo: datos.tipo,
                    solicitante: datos.solicitante,
                    mensaje: datos.mensaje,
                    fecha:datos.fecha,
                    espacio: datos.espacio,
                    bloques: datos.bloques,
                    respuesta: ""
                });
                solicitudData.save(function(err){
                    respuesta.resultado="ok";    
                    if (err){
                        respuesta.resultado="error-a";     
                    }
                    res.setHeader("Content-Type", "text/json", "Access-Control-Allow-Origin", "*");
                    res.send(respuesta);
                    res.end();
                });
                break;
            case "Soporte":
                 var solicitudData =  new Solicitud({
                    fechaSolicitud: fecha_,
                    estado: "Espera",//Aprobada, Rechazada, espera
                    tipo: datos.tipo,
                    solicitante: datos.solicitante,
                    mensaje: datos.mensaje,
                    prioridad: 'Sin definir',
                    estadoSoporte: 'Sin definir',
                    espacio: datos.espacio,
                    respuesta: ""
                });
                solicitudData.save(function(err){
                    respuesta.resultado="ok";    
                    if (err){
                        respuesta.resultado="error-a";     
                    }
                    res.setHeader("Content-Type", "text/json", "Access-Control-Allow-Origin", "*");
                    res.send(respuesta);
                    res.end();
                });
                break;
        }
        
    });   
});
app.post("/editar_solicitud", function(req, res){
    var store = {};var binario;var datos;  
    req.on('data', function(data){store = data;binario=(store.toString('utf8'));datos=JSON.parse(binario);});
    req.on('end', function(){  
        var respuesta=new Object(); 
        switch(datos.tipo){
            case "soporte":
                 Solicitud.update({ '_id': datos._id }, 
                                  { $set: { 
                                        solicitante: datos.solicitante, 
                                        descripcion: datos.descripcion,
                                        problema: datos.problema
                                    }
                                  }, 
                    function(err){
                        if (err){
                            respuesta.resultado="error-b";
                        }
                        respuesta.resultado="ok";
                }); 
            break;
            case "activo":
                Solicitud.update({ '_id': datos._id }, 
                                  { $set: { 
                                        solicitante: datos.solicitante,
                                        descripcion: datos.descripcion,
                                        codigo_activo: datos.activo,
                                        nuevo_espacio: datos.espacio
                                    }
                                  }, 
                    function(err){
                        if (err){
                            respuesta.resultado="error-b";
                        }
                        respuesta.resultado="ok";
                });
            break;
            case "espacio":
                Solicitud.update({ '_id': datos._id }, 
                                  { $set: { 
                                        solicitante: datos.solicitante,
                                        descripcion: datos.descripcion,
                                        codigo_lab: datos.lab,
                                        tiempo: datos.tiempo
                                    }
                                  }, 
                    function(err){
                        if (err){
                            respuesta.resultado="error-b";
                        }
                        respuesta.resultado="ok";
                });
            break;
        }
        res.setHeader("Content-Type", "text/json", "Access-Control-Allow-Origin", "*");
        res.send(respuesta);
        res.end();
    }); 
});
app.post("/eliminar_solicitud", function(req, res){
    var store = {};var binario;var datos;  
    req.on('data', function(data){store = data;binario=(store.toString('utf8'));datos=JSON.parse(binario);});
    req.on('end', function(){
        Solicitud.remove({_id:datos._id}, function(err){
            var respuesta=new Object();
            respuesta.resultado="ok";
            if (err){
                respuesta.resultado="error-a";
            }
            respuesta.id=datos.id;
            res.setHeader("Content-Type", "text/json", "Access-Control-Allow-Origin", "*");
            res.send(respuesta);
            res.end();
        });
    });
});

//SELECCIONES
app.post("/verUsuarios", function(req, res){
    var store = {};var binario;var datos;  
    req.on('data', function(data){store = data;binario=(store.toString('utf8'));datos=JSON.parse(binario);});
    req.on('end', function(){
        Usuario.find({}, '_id correo nombre primer_apellido segundo_apellido tipo', function (err, results){
                var respuesta= new Object();
                respuesta.tipo=datos.tipo;
                respuesta.resultado=true;
                if (results==null){
                    respuesta.resultado=false;
                    res.setHeader("Content-Type", "text/json", "Access-Control-Allow-Origin", "*");
                    res.send(respuesta);
                    res.end();
                }else{
                    respuesta.datos=results;
                    res.setHeader("Content-Type", "text/json", "Access-Control-Allow-Origin", "*");
                    res.send(respuesta);
                    res.end(); 
                }    
        });
    });   
});
app.post("/verActivos", function(req, res){
    var store = {};var binario;var datos;  
    req.on('data', function(data){store = data;binario=(store.toString('utf8'));datos=JSON.parse(binario);});
    req.on('end', function(){
        Activo.find({}, function (err, results){
                var respuesta= new Object();
                respuesta.tipo=datos.tipo;
                respuesta.resultado=true;
                if (results==null){
                    respuesta.resultado=false;
                }
                if (respuesta.resultado==true){
                    respuesta.datos=results;
                }
                res.setHeader("Content-Type", "text/json", "Access-Control-Allow-Origin", "*");
                res.send(respuesta);
                res.end();   
        });
    });   
});
app.post("/verEspacios", function(req, res){
    var store = {};var binario;var datos;  
    req.on('data', function(data){store = data;binario=(store.toString('utf8'));datos=JSON.parse(binario);});
    req.on('end', function(){
        Espacio.find({}, function (err, results){
                var respuesta= new Object();
                respuesta.resultado=true;
                if (results==null){
                    respuesta.resultado=false;
                }
                if (respuesta.resultado==true){
                    respuesta.datos=results;
                }
                res.setHeader("Content-Type", "text/json", "Access-Control-Allow-Origin", "*");
                res.send(respuesta);
                res.end();   
        });
    });   
});
app.post("/verSolicitudes", function(req, res){
    var store = {};var binario;var datos;  
    req.on('data', function(data){store = data;binario=(store.toString('utf8'));datos=JSON.parse(binario);});
    req.on('end', function(){
        
        Solicitud.find({estado:datos.estado, tipo:datos.tipo}, function (err, results){
            var respuesta= new Object();
            respuesta.tipo=datos.tipo;
            respuesta.estado=datos.estado;
            respuesta.resultado=true;
            if (err){
                respuesta.resultado=false;
            }
            respuesta.datos=results;
            res.setHeader("Content-Type", "text/json", "Access-Control-Allow-Origin", "*");
            res.send(respuesta);
            res.end();   
        });        
    });   
});
app.post("/verMySolicitudesPendientes", function(req, res){
    var store = {};var binario;var datos;  
    req.on('data', function(data){store = data;binario=(store.toString('utf8'));datos=JSON.parse(binario);});
    req.on('end', function(){
        Solicitud.find({estado:"Espera", solicitante:datos.user}, function (err, results){
            var respuesta= new Object();
            respuesta.tipo=datos.tipo;
            respuesta.estado=datos.estado;
            respuesta.resultado=true;
            if (err){
                respuesta.resultado=false;
            }
            respuesta.datos=results;
            res.setHeader("Content-Type", "text/json", "Access-Control-Allow-Origin", "*");
            res.send(respuesta);
            res.end();   
        });        
    });   
});
app.post("/Pendientes", function(req, res){
    var store = {};var binario;var datos;  
    req.on('data', function(data){store = data;binario=(store.toString('utf8'));datos=JSON.parse(binario);});
    req.on('end', function(){
        switch (datos.tipo){
            case "Administrador":
                    var respuesta= new Object();
                    respuesta.tipo=datos.tipo;
                    respuesta.resultado=true;
                    respuesta.activosCount=0;
                    respuesta.espaciosCount=0;
                    respuesta.soporteCount=0;
                    Solicitud.count({estado:"Espera", tipo:"Activo"}, function (err, resultA){
                        respuesta.activosCount=resultA;
                        if (err){
                            respuesta.resultado=false;
                        }
                        Solicitud.count({estado:"Espera", tipo:"Espacio"}, function (err, resultB){
                            respuesta.espaciosCount=resultB;
                             if (err){
                                respuesta.resultado=false;
                            }
                            Solicitud.count({estado:"Espera", tipo:"Soporte"}, function (err, resultC){
                                respuesta.soporteCount=resultC;
                                 if (err){
                                    respuesta.resultado=false;
                                }
                                res.setHeader("Content-Type", "text/json", "Access-Control-Allow-Origin", "*");
                                res.send(respuesta);
                                res.end(); 
                            });
                        });
                    });
                break;
            case "Soporte":
                    var respuesta= new Object();
                    respuesta.tipo=datos.tipo;
                    respuesta.resultado=true;
                    respuesta.soporteCount=0;
                     Solicitud.count({estado:"Espera", tipo:"Soporte"}, function (err, resultC){
                        respuesta.soporteCount=resultC;
                        if (err){
                            respuesta.resultado=false;
                        }
                        res.setHeader("Content-Type", "text/json", "Access-Control-Allow-Origin", "*");
                        res.send(respuesta);
                        res.end(); 
                    });
            break;
        }               
    });   
});
app.post("/solicitudRespuesta", function(req, res){
    var store = {};var binario;var datos;  
    req.on('data', function(data){store = data;binario=(store.toString('utf8'));datos=JSON.parse(binario);});
    req.on('end', function(){
        
       
        var std="";
        if (datos.state=="true"){
            std="Aceptada";
        }else{
            std="Rechazada";
        }
        //Solicitud.update({ '_id': datos.id }, { $set: { 'estado': std, 'respuesta': datos.res }}, function(err, doc){
        Solicitud.findByIdAndUpdate(datos.id , { $set: { 'estado': std, 'respuesta': datos.res }}, function(err, doc){
            var respuesta=new Object();
            respuesta.resultado=true;
            if (err){
                respuesta.resultado=false;
            }else{
                if (std=="Aceptada" && doc.tipo=="Espacio"){
                    addSchedule(doc);
                }
            }
            res.setHeader("Content-Type", "text/json", "Access-Control-Allow-Origin", "*");
            res.send(respuesta);
            res.end();
        });
        
    });
});
function addSchedule(data){
    var ob=new Object();
    ob.fecha=data.fecha;
    ob.bloques=data.bloques;
    Espacio.update({'codigo':data.espacio}, { $push: { agenda: ob }});
}
app.post("/solicitudRespuestaSup", function(req, res){
    var store = {};var binario;var datos;  
    req.on('data', function(data){store = data;binario=(store.toString('utf8'));datos=JSON.parse(binario);});
    req.on('end', function(){
        
        
        var std="";
        var priority="";
        var stdSp="";
        if (datos.state=="true"){
            std="Aceptada";
            priority=datos.prioridad;
            stdSp='En cola';
        }else{
            std="Rechazada";
            priority="Sin definir";
            stdSp='Sin definir';
        }
        Solicitud.update({ '_id': datos.id }, { $set: { 'estado': std, 'respuesta': datos.res, 'prioridad': priority, 'estadoSoporte':stdSp}}, function(err){
            var respuesta=new Object();
            respuesta.resultado=true;
            if (err){
                respuesta.resultado=false;
            }
            res.setHeader("Content-Type", "text/json", "Access-Control-Allow-Origin", "*");
            res.send(respuesta);
            res.end();
        });
    });
});
app.post("/verSolicitudesSup", function(req, res){
    var store = {};var binario;var datos;  
    req.on('data', function(data){store = data;binario=(store.toString('utf8'));datos=JSON.parse(binario);});
    req.on('end', function(){
      Solicitud.find({'estado': "Aceptada", 'tipo': "Soporte", 'estadoSoporte':{ $in: ["En cola", "En ejecución"] }}, function(err, results){
            var respuesta= new Object();
            respuesta.resultado=true;
            if (err){
                respuesta.resultado=false;
            }
            respuesta.datos=results;
            res.setHeader("Content-Type", "text/json", "Access-Control-Allow-Origin", "*");
            res.send(respuesta);
            res.end();   
      });
    });
});
app.post("/verMySolicitudesSup", function(req, res){
    var store = {};var binario;var datos;  
    req.on('data', function(data){store = data;binario=(store.toString('utf8'));datos=JSON.parse(binario);});
    req.on('end', function(){
      Solicitud.find({'estado': "Aceptada", 'solicitante':datos.user, 'tipo': "Soporte", 'estadoSoporte':{ $in: ["En cola", "En ejecución"] }}, function(err, results){
            var respuesta= new Object();
            respuesta.resultado=true;
            if (err){
                respuesta.resultado=false;
            }
            respuesta.datos=results;
            res.setHeader("Content-Type", "text/json", "Access-Control-Allow-Origin", "*");
            res.send(respuesta);
            res.end();   
      });
    });
});
app.post("/verHistorySolicitudesSup", function(req, res){
    var store = {};var binario;var datos;  
    req.on('data', function(data){store = data;binario=(store.toString('utf8'));datos=JSON.parse(binario);});
    req.on('end', function(){
      Solicitud.find({'estado': { $in: ["Aceptada", "Rechazada"] }, 'tipo': "Soporte", 'estadoSoporte':{ $in: ["Sin definir", "Finalizada"] } }, function(err, results){
            var respuesta= new Object();
            respuesta.resultado=true;
            if (err){
                respuesta.resultado=false;
            }
            respuesta.datos=results;
            res.setHeader("Content-Type", "text/json", "Access-Control-Allow-Origin", "*");
            res.send(respuesta);
            res.end();   
      }).sort({'_id': -1});
    });
});
app.post("/verHistorySolicitudes", function(req, res){
    var store = {};var binario;var datos;  
    req.on('data', function(data){store = data;binario=(store.toString('utf8'));datos=JSON.parse(binario);});
    req.on('end', function(){
      Solicitud.find({'estado': { $in: ["Aceptada", "Rechazada"] }, 'tipo': { $in: ["Activo", "Espacio"] }}, function(err, results){
            var respuesta= new Object();
            respuesta.resultado=true;
            if (err){
                respuesta.resultado=false;
            }
            respuesta.datos=results;
            res.setHeader("Content-Type", "text/json", "Access-Control-Allow-Origin", "*");
            res.send(respuesta);
            res.end();   
      }).sort({'_id': -1});
        
    });
});
app.post("/verMyHistorySolicitudes", function(req, res){
    var store = {};var binario;var datos;  
    req.on('data', function(data){store = data;binario=(store.toString('utf8'));datos=JSON.parse(binario);});
    req.on('end', function(){
      Solicitud.find({'estado': { $in: ["Aceptada", "Rechazada"] }, 'solicitante':datos.user}, function(err, results){
            var respuesta= new Object();
            respuesta.resultado=true;
            if (err){
                respuesta.resultado=false;
            }
            respuesta.datos=results;
            res.setHeader("Content-Type", "text/json", "Access-Control-Allow-Origin", "*");
            res.send(respuesta);
            res.end();   
      }).sort({'_id': -1});
        
    });
});
app.post("/EndSlctdSp", function(req, res){
    var store = {};var binario;var datos;  
    req.on('data', function(data){store = data;binario=(store.toString('utf8'));datos=JSON.parse(binario);});
    req.on('end', function(){
      Solicitud.update({ '_id': datos.id }, { $set: { 'estadoSoporte': "Finalizada" }}, function(err){
            var respuesta= new Object();
            respuesta.resultado=true;
            if (err){
                respuesta.resultado=false;
            }
            res.setHeader("Content-Type", "text/json", "Access-Control-Allow-Origin", "*");
            res.send(respuesta);
            res.end();   
      });
    });
});
app.post("/_chngePsp", function(req, res){
    var store = {};var binario;var datos;  
    req.on('data', function(data){store = data;binario=(store.toString('utf8'));datos=JSON.parse(binario);});
    req.on('end', function(){
      Solicitud.update({ '_id': datos.id }, { $set: { 'prioridad': datos.val }}, function(err){
            var respuesta= new Object();
            respuesta.resultado=true;
            if (err){
                respuesta.resultado=false;
            }
            res.setHeader("Content-Type", "text/json", "Access-Control-Allow-Origin", "*");
            res.send(respuesta);
            res.end();   
      });
    });
});
app.post("/_chngeSsp", function(req, res){
    var store = {};var binario;var datos;  
    req.on('data', function(data){store = data;binario=(store.toString('utf8'));datos=JSON.parse(binario);});
    req.on('end', function(){
      Solicitud.update({ '_id': datos.id }, { $set: { 'estadoSoporte': datos.val }}, function(err){
            var respuesta= new Object();
            respuesta.resultado=true;
            if (err){
                respuesta.resultado=false;
            }
            res.setHeader("Content-Type", "text/json", "Access-Control-Allow-Origin", "*");
            res.send(respuesta);
            res.end();   
      });
    });
});
app.post("/myActivity", function(req, res){
    var store = {};var binario;var datos;  
    req.on('data', function(data){store = data;binario=(store.toString('utf8'));datos=JSON.parse(binario);});
    req.on('end', function(){
         Actividad.find({'usuario':datos.user}, function(err, docs){
             var respuesta= new Object();
             respuesta.resultado=true;
             if (err){
                  respuesta.resultado=false;
             }
             respuesta.actividad=docs;
             res.setHeader("Content-Type", "text/json", "Access-Control-Allow-Origin", "*");
             res.send(respuesta);
             res.end();
        });
    });
});
app.post("/Activity", function(req, res){
    var store = {};var binario;var datos;  
    req.on('data', function(data){store = data;binario=(store.toString('utf8'));datos=JSON.parse(binario);});
    req.on('end', function(){
         Actividad.find({}, function(err, docs){
             var respuesta= new Object();
             respuesta.resultado=true;
             if (err){
                  respuesta.resultado=false;
             }
             respuesta.actividad=docs;
             res.setHeader("Content-Type", "text/json", "Access-Control-Allow-Origin", "*");
             res.send(respuesta);
             res.end();
        });
    });
});
app.post("/editUser", function(req, res){
    var store = {};var binario;var datos;  
    req.on('data', function(data){store = data;binario=(store.toString('utf8'));datos=JSON.parse(binario);});
    req.on('end', function(){
        Usuario.findOne({'correo':datos.correo, 'contrasena':datos.pass}, function(err, doc){
            if (doc==null){
                var respuesta= new Object();
                respuesta.resultado=false;
                respuesta.causa=true;
                res.setHeader("Content-Type", "text/json", "Access-Control-Allow-Origin", "*");
                res.send(respuesta);
                res.end(); 
            }else{
                if (datos.npass==""){
                    Usuario.update({ 'correo': datos.correo }, { $set: { 'nombre': datos.nombre, 'primer_apellido': datos.apellido1, 'segundo_apellido': datos.apellido2 }}, function(err){
                        var respuesta= new Object();
                        respuesta.resultado=true;
                        if (err){
                            respuesta.resultado=false;
                        }
                        res.setHeader("Content-Type", "text/json", "Access-Control-Allow-Origin", "*");
                        res.send(respuesta);
                        res.end();   
                    });
                }else{
                   Usuario.update({ 'correo': datos.correo }, { $set: { 'nombre': datos.nombre, 'primer_apellido': datos.apellido1, 'segundo_apellido': datos.apellido2, 'contrasena':datos.npass }}, function(err){
                        var respuesta= new Object();
                        respuesta.resultado=true;
                        if (err){
                            respuesta.resultado=false;
                        }
                        res.setHeader("Content-Type", "text/json", "Access-Control-Allow-Origin", "*");
                        res.send(respuesta);
                        res.end();   
                    }); 
                }
            }             
        });
          
    });
});
function newActivity(cat, tipo, user, data){
    var m_names = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth();
    var curr_year = d.getFullYear();
    var fecha_=curr_date + " " + m_names[curr_month] + ", " + curr_year;
    var datos= new Object();
    datos.categoria=cat;
    datos.tipo=tipo;
    datos.usuario=user;
    datos.datos=data;
    datos.fecha=fecha_;
    var actividadData =  new Actividad(datos);
    actividadData.save(); 
}
app.listen(8080, function(err){
  if (err){
      console.log(err);
  }else{
    console.log('Express listo en el puerto 8080!');    
  }
});
