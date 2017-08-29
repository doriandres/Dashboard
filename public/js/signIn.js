var ruta="http://localhost:8080";
function rdrct(){window.location="/dashboard";}
adfadc();
function signIn(){
    $('#loading').modal('open');
    //validación
    var valido=true;
    if (document.getElementById("email").value=="" || document.getElementById("email").classList[1]=="invalid"){
        valido=false;
    }
    if (document.getElementById("pass").value==""){
        valido=false;
    }
    if (valido==true){
        var credenciales = {
                correo: document.getElementById("email").value,
                pass: document.getElementById("pass").value
        }
        $.ajax({
                type: "POST",
                url: ruta+"/signIn",
                dataType: "json",   
                data: JSON.stringify(credenciales),
                timeout: 5000,
                success: function(res){
                   $('#loading').modal('close');    
                   if (res.resultado=="ok"){
                       document.getElementById("email").value="";
                       document.getElementById("pass").value="";
                       var $toastContent = $('<span><i class="material-icons left">account_circle</i>¡Bienvenido '+res.nombreCompleto+'!</span>');
                       Materialize.toast($toastContent, 5000, "blue");
                       setUser(res.key);
                   }else{
                       var $toastContent = $('<span><i class="material-icons left">warning</i> Credenciales incorrectas</span>');
                       Materialize.toast($toastContent, 5000, "orange");
                       $("#email").removeClass("valid");
                       $("#email").addClass("invalid");
                       $("#pass").removeClass("valid");
                       $("#pass").addClass("invalid");
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
         var $toastContent = $('<span><i class="material-icons left">warning</i> Debe llenar todos los campos<span>');
         Materialize.toast($toastContent, 5000, "orange");
    }
}
function adfadc(){
    if (localStorage.x != null || localStorage.x != undefined){
        var h=JSON.parse(localStorage.x);
        if (h.y==true){
            rdrct();
        }
    }
}
function setUser(krx){
    var x= {z:{ncrt: krx.ncrt, bnr: krx.bnr, zlk: krx.zlk},y:true};
    localStorage.setItem("x",JSON.stringify(x));
    rdrct();
}
