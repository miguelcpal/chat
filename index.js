const { huerfano, monitor } = require("./monitor");
const { Controlador } = require("./Controlador");

let app = require('express')();
let server = require('http').createServer(app);
let io = require('socket.io')(server, {
cors: {
    methods: ["GET", "POST"]
  }
});



let Controladores=[];
let Monitores=[];


io.on('connection', (socket) => {
 
  socket.on('disconnect', function(){
    io.emit('users-changed', {user: socket.username, event: 'left'});  
  });
  
  socket.on('set-name', (name) => {
    socket.username = name;
   // io.emit('users-changed', {user: name, event: 'joined'});
   let result = name.includes("Monitor");
    if (result==true)
    {
      _monitor=new monitor(name,socket.id);
      Monitores.push(_monitor);
     // console.log(Monitores);
    }
    if (result==false)
    {
      let _controlador=new Controlador(name,socket.id,null,null);
      Controladores.push(_controlador);
    }

    if (Monitores.length>0)
    {
    for (let el=0;el<Monitores.length;el++)
    {
        let texto=Monitores[el].nombreMonitor.substring(0,Monitores[el].nombreMonitor.length-7);
    //    console.log("***  "+texto + "  ***");

        for (let n=0;n<Controladores.length;n++)
        {
       //   console.log(Controladores[n].nombreControlador);
          if (Controladores[n].nombreControlador==(texto))
          {
            console.log(texto);
            Controladores[n].añadeMonitor(Monitores[el].nombreMonitor);
            Controladores[n].añadeIdMonitor(Monitores[el].idMonitor);
          }
        }
      }
    }

  // console.log(Controladores);
   
  });
  


  socket.on('send-message', (message) => {
 //  console.log(socket.username);
    
   if (Monitores.length>0)
    {
    for (let el=0;el<Monitores.length;el++)
    {
        let texto=Monitores[el].nombreMonitor.substring(0,Monitores[el].nombreMonitor.length-7);
       

        for (let n=0;n<Controladores.length;n++)
        {
       //   console.log(Controladores[n].nombreControlador);
          if (socket.username==(texto))
          {
            io.to(Monitores[el].idMonitor).emit('message', {msg: message.text, user: socket.username, createdAt: new Date()});    
            console.log("Enviando de: " + socket.username +" a " +Monitores[el].nombreMonitor);
            console.log(message.text);
           
          }
        }
      }
    }
 

 
  });

  socket.onAny((event, ...args) => {
   // console.log(event, args);
  });
});
var port = process.env.PORT || 3001;
server.listen(port, function(){
   console.log('listening in http://localhost:' + port);
});

