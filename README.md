# Aquitecturas de alta disponibilidad
*Eduardo Gálvez y Rodrigo Álvarez*
### Aplicación
Esta aplicación consiste en 3 frentes, una base de datos Mongo, un backend hecho con Express y Typescript, y un frontend simple hecho con NextJS

### Funcionamiento
Primero que todo se debe crear un archivo `.env` dentro de la carpeta api y la carpeta web.
EL interior de estas serán lo que está en `.env.example`

### Comandos
``` 
docker-compose up --build
```
Con este comando se buildeará la app y se levantarán los servicios:
    la api ocupará el puerto 3000 y el front estará disponible en el puerto 8080. 

Para ver el video, hacer click [aqui](https://www.youtube.com/watch?v=PoQRrfycH-E)
