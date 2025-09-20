const { response } = require('express');
const { executeQuery } = require('../database/operations');
const moment = require('moment');
const sql = require('mssql');
const { config } = require('../database/config');



 InsertarPicaje = async(req, res = response ) => {

    const { empleado } = req.query; 
    const ahora = new Date(); 
    let fecha = formatoFecha(ahora,2);      
  
    let row ;   
    let data;
    let tipo;

    try{
        
        let query = `SELECT TOP 1 Tipo FROM Picajes WHERE Empleado = ${empleado} AND CONVERT(date, fecha ) = '${fecha}'  ORDER BY Fecha DESC`;      

        fecha = formatoFecha(ahora,1);
        const fechaFormateada = moment(fecha, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');              

        data = await executeQuery(query);         
        const row = data[0];

        if (!row) {            
            tipo ='E';
            
        }else{
            
            if (row.Tipo =='E'){
                tipo ='S'
            }else{
                tipo ='E';
            }
        }      
        query ="INSERT INTO Picajes (Fecha,Empleado,Tipo) VALUES ('" + fechaFormateada + "'," + empleado  + ",'" + tipo + "')";               
        await executeQuery(query);                
        return res.json({
             resul: 1});
    
     }catch(err){
         console.log('Error insertando '  + err);
         return res.json({
             resul: 0});
     }

 }

 ComprobarDni = async(req, res = response ) => {
    
    let row ;   
    let data;
    
    const { dni } = req.query;    
   
     if (!dni || dni.length === 0) {
         return res.json({ resul: 0 });
     }

      try {

        const query = `SELECT * FROM Empleados WHERE DNI = '${dni}'`;

        
        data = await executeQuery(query);  
        row = data[0];         

        if (!row) {
            return res.json({ resul: -3 }); // No encontrado
        }

        const regexDNI = /^\d{8}[A-Z]$/;
        const regexNIE = /^[XYZ]\d{7}[A-Z]$/;

        const letrasControl = 'TRWAGMYFPDXBNJZSQVHLCKE';
        let numeroStr = '';
        let numero = 0;

        if (regexDNI.test(dni)) {
            numeroStr = dni.substring(0, 8);
        } else if (regexNIE.test(dni)) {
            const letraInicial = dni[0];
            const num = dni.substring(1, 8);
            switch (letraInicial) {
                case 'X': numeroStr = '0' + num; break;
                case 'Y': numeroStr = '1' + num; break;
                case 'Z': numeroStr = '2' + num; break;
                default: return res.json({ resul: 2 });
            }
        } else {
            return res.json({ resul: -2 }); // Formato inválido
        }

        if (!/^\d+$/.test(numeroStr)) {
            return res.json({ resul: 0 });
        }

        numero = parseInt(numeroStr);
        const letraCalculada = letrasControl[numero % 23];
        const letraReal = dni[dni.length - 1];

        if (letraCalculada !== letraReal) {
            return res.json({ resul: 0 }); // Letra incorrecta
        }

    // Si todo es correcto, devolver el número del empleado
    return res.json({ resul: row.Numero });

      } catch (err) {
        console.error('Error al comprobar el DNI:', err);
        return res.status(500).json({ resul: -1, error: 'Error en el servidor' });
      }     
  
   }


   
   Status = async(req, res = response ) => {

     return res.json({ resul: 1});
   }

   

  function formatoFecha(fecha, tipoFormato){
       
    const dd = String(fecha.getUTCDate()).padStart(2, '0');
    const mm = String(fecha.getUTCMonth() + 1).padStart(2, '0'); // Mes empieza en 0
    const yyyy = fecha.getUTCFullYear();
    const hh =String(fecha.getHours()).padStart(2, '0');   
   // const hh = String(fecha.getUTCHours()).padStart(2, '0'); // **Obtener la hora en UTC**
    const min = String(fecha.getUTCMinutes()).padStart(2, '0');
    const ss = String(fecha.getUTCSeconds()).padStart(2, '0');

    let fechaNueva;

    if(tipoFormato == 1){
        fechaNueva = dd + '/' + mm + '/' + yyyy + ' ' + hh + ':' + min + ':' + ss;
    }else{
        fechaNueva = yyyy + '-' + mm + '-' + dd;
    }
    

    return fechaNueva;
 }






    module.exports = {       
    ComprobarDni,InsertarPicaje,Status
 }