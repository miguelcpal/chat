class Controlador {

  nombreControlador="";
  idControlador="";
  nombreMonitor="";
  idMonitor="";

  constructor(_nombreControlador, _idControlador, _nombreMonitor, _idMonitor) {
      this.nombreControlador=_nombreControlador;
      this.idControlador=_idControlador;
      this.nombreMonitor=_nombreMonitor;
      this.idMonitor=_idMonitor;
  }

  añadeMonitor(_monitor)
  {
this.nombreMonitor=_monitor;
  }
  
  añadeIdMonitor(_idMonitor)
  {
this.idMonitor=_idMonitor;
  }
}
exports.Controlador = Controlador;
