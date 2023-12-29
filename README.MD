# Para que este app funcione debes crear tu cert TLS
## Generar Clave Privada y Certificado Auto-firmado con OpenSSL para Node.js

Este documento proporciona una guía paso a paso para generar una clave privada y un certificado auto-firmado utilizando OpenSSL, y cómo utilizarlos en una aplicación Node.js con un servidor HTTP/2.

## Paso 1: Instalar OpenSSL

Primero, asegúrate de tener OpenSSL instalado en tu sistema. En sistemas Unix (Linux, macOS), usualmente está preinstalado o se puede instalar a través del gestor de paquetes. En Windows, puedes descargarlo desde una fuente confiable o usar herramientas como Git Bash que lo incluyen.

### Descarga OpenSSL desde https://www.openssl.org/source/ 

En windows usa una consola como administrador y ejecuta:
~~~
choco install openssl
~~~

## Paso 2: Generar una Clave Privada

Abre una terminal y ejecuta el siguiente comando para crear una clave privada RSA de 2048 bits:
~~~
    openssl genrsa -out clave.privada 2048
~~~

Esto generará un archivo `clave.privada` en tu directorio actual.

## Paso 3: Generar un Certificado Auto-firmado

Con la clave privada creada, genera un certificado auto-firmado con el siguiente comando:
~~~
    openssl req -new -x509 -key clave.privada -out certificado.crt -days 365
~~~

Durante este proceso, se te solicitará información para el certificado. Puedes completarla o dejarla en blanco.

## Paso 4: Verificar los Archivos Generados

Verifica que los archivos `clave.privada` y `certificado.crt` estén en tu directorio:

~~~
    ls # En Unix
~~~
 ~~~  
    dir # En Windows
~~~

## Paso 5: Usar en tu Aplicación Node.js

Utiliza estos archivos en tu servidor HTTP/2 de Node.js. Asegúrate de referenciar correctamente su ubicación en tu código.