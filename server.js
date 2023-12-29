const http2 = require('http2');
const fs = require('fs');
const path = require('path');

// Carga la lista de productos desde el archivo JSON
const productos = require('./productos.json');

// Crea el servidor HTTP/2 con TLS
const server = http2.createSecureServer({
    key: fs.readFileSync('cert/clave.privada'),
    cert: fs.readFileSync('cert/certificado.crt')
});

server.on('stream', (stream, headers) => {
    // Analiza la URL de la solicitud
    const url = new URL(headers[":path"], `https://${headers[":authority"]}`);

    if (url.pathname === '/productos') {
        let respuesta;

        // Obtiene un producto específico si se proporciona un ID
        const id = url.searchParams.get('id');
        if (id) {
            const producto = productos.find(p => p.id.toString() === id);
            respuesta = producto ? JSON.stringify(producto) : 'Producto no encontrado';
        } else {
            // Si no se proporciona un ID, devuelve todos los productos
            respuesta = JSON.stringify(productos);
        }

        stream.respond({
            'content-type': 'application/json',
            ':status': 200
        });
        stream.end(respuesta);
    } else {
        // Manejo de rutas no encontradas
        stream.respond({ ':status': 404 });
        stream.end('No encontrado');
    }
});

server.listen(3000, () => {
    console.log('Servidor corriendo en https://localhost:3443');
});
