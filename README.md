<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Convertidor</title>

    <style>
       h1 {
            text-align: center;
        }
        .container {
            max-width: 800px;
            margin: auto;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        th, td {
            border: 1px solid #0d0a0a;
            padding: 8px;
            text-align: center;
        }
        th {
            background-color: #f2f2f2;
        }
        input[type="number"] {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            box-sizing: border-box;
        }
        
    </style>

</head>
<body>
<div class="container">
    <!--------------------------------------------------------------------->
    <h1>Representación interna de números de Punto Flotante IEEE 754</h1>
    <input type="number" id="inputNumero" step="any" placeholder="Ingrese un número">
    <button onclick="convertir()">Convertir</button>
    <!--------------------------------------------------------------------->
    <h2>Parte entera</h2>
    <table id="tablaEntera">
        <tr>
            <th>Valor</th>
            <th>Divisor</th>
            <th>Cociente</th>
            <th>Residuo</th>
        </tr>
    </table>
    <!--------------------------------------------------------------------->
    <h2>Parte fraccionaria</h2>
    <table id="tablaFraccionaria">
        <tr>
            <th>Valor</th>
            <th>Multiplicador</th>
            <th>Producto</th>
            <th>Digito</th>
        </tr>
    </table>
    <!--------------------------------------------------------------------->
    <h2>Representacion IEEE 754</h2>
    <table id="tablaIEEE">
        <tr>
            <th>Signo</th>
            <th>Exponente + 127</th>
            <th>Fraccion</th>
        </tr>
    </table>

    <div class="resultado-ieee">
        <p id="resultadoIEEE"></p>
    </div>
</div>

<script>
    function convertir(){
        const numero = parseFloat(document.getElementById("inputNumero").value);

        //separacion de parte entera y fraccionaria
        const parteEntera = Math.floor(Math.abs(numero));
        let parteFraccionaria = Math.abs(numero) - parteEntera;
        //conversion de parte entera
        let binarioEntero = "";
        let tablaEntera = document.getElementById("tablaEntera");
        tablaEntera.innerHTML = `
            <tr><th>Valor</th><th>Divisor</th><th>Cociente</th><th>Residuo</th></tr>
        `;
        let valor = parteEntera;
        while (valor > 0) {
            let cociente = Math.floor(valor / 2);
            let residuo = valor % 2;
            binarioEntero = residuo + binarioEntero;
            tablaEntera.innerHTML += `<tr><td>${valor}</td><td>2</td><td>${cociente}</td><td>${residuo}</td></tr>`;
            valor = cociente;
        }

        //Mostrar proceso de conversión de la parte fraccionaria a binario
        let binarioFraccionario = "";
        let tablaFraccionaria = document.getElementById("tablaFraccionaria");
        tablaFraccionaria.innerHTML = `
            <tr><th>Valor</th><th>Multiplicador</th><th>Producto</th><th>Dígito</th></tr>
        `;
        for (let i = 0; i < 10; i++) {
            let producto = parteFraccionaria * 2;
            let digito = Math.floor(producto);
            binarioFraccionario += digito;
            tablaFraccionaria.innerHTML += `<tr><td>${parteFraccionaria.toFixed(15)}</td><td>2</td><td>${producto.toFixed(15)}</td><td>${digito}</td></tr>`;
            parteFraccionaria = producto - digito;
            if (parteFraccionaria === 0) break;
    }

        //Obtener el exponente y signo
        const exponente = binarioEntero.length - 1;
        const exponenteIEEE = exponente + 127;
        const signo =+ (numero < 0);

        //Generar la mantisa 
        const mantisa = (binarioEntero + binarioFraccionario).substring(1, 24);

        //Mostrar la tabla IEEE 754
        const tablaIEEE = document.getElementById("tablaIEEE");
        tablaIEEE.innerHTML = `
            <tr><th>Signo</th><th>Exponente + 127</th><th>Fracción (Mantisa)</th></tr>
            <tr>
                <td>${signo}</td>
                <td>${exponenteIEEE} = ${exponente} + 127</td>
                <td>${mantisa.padEnd(23, "0")}</td>
            </tr>
        `;

        //Mostrar la representación final completa
        const resultadoIEEE = `${signo} ${exponenteIEEE.toString(2).padStart(8, "0")} ${mantisa.padEnd(23, "0")}`;
        document.getElementById("resultadoIEEE").textContent = resultadoIEEE;

    }
</script>

</body>
</html>
