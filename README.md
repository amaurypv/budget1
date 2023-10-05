

# API de Manejo de Sobres

Esta API permite realizar operaciones básicas en una lista de sobres, como agregar nuevos sobres, obtener detalles de sobres específicos, actualizar el presupuesto de un sobre, eliminar sobres y transferir presupuesto entre sobres.

## Configuración Inicial

Asegúrate de tener Node.js y npm (el administrador de paquetes de Node.js) instalados en tu sistema.

1. Clona o descarga este repositorio en tu máquina local.

2. Abre una terminal y navega hasta el directorio del proyecto.

3. Instala las dependencias necesarias ejecutando el siguiente comando:

   ```bash
   npm install
   ```

4. Inicia el servidor con el siguiente comando:

   ```bash
   npm start
   ```

   El servidor se ejecutará en el puerto 4000 por defecto.

## Endpoints Disponibles

### 1. Obtener Todos los Sobres

- **URL:** `/envelopes`
- **Método HTTP:** GET
- **Descripción:** Obtiene todos los sobres disponibles.
- **Uso:** Abre tu navegador y accede a `http://localhost:4000/envelopes` para ver una lista de todos los sobres.

### 2. Obtener un Sobre por su ID

- **URL:** `/envelopes/:id`
- **Método HTTP:** GET
- **Descripción:** Obtiene un sobre específico por su ID.
- **Uso:** Sustituye `:id` en la URL con el ID del sobre que deseas consultar. Por ejemplo, `http://localhost:4000/envelopes/1`.

### 3. Agregar un Nuevo Sobre

- **URL:** `/newenvelopes`
- **Método HTTP:** POST
- **Descripción:** Agrega un nuevo sobre a la lista.
- **Uso:** Envía una solicitud POST a `http://localhost:4000/newenvelopes` con el cuerpo de la solicitud en formato JSON que contiene los detalles del nuevo sobre.

### 4. Actualizar el Presupuesto de un Sobre

- **URL:** `/envelope/:id/:bud`
- **Método HTTP:** PUT
- **Descripción:** Actualiza el presupuesto de un sobre específico.
- **Uso:** Sustituye `:id` en la URL con el ID del sobre que deseas actualizar y `:bud` con la cantidad que deseas agregar o restar al presupuesto del sobre. Por ejemplo, `http://localhost:4000/envelope/1/50` restará 50 al presupuesto del sobre con ID 1.

### 5. Eliminar un Sobre por su ID

- **URL:** `/envelope/delete/:id`
- **Método HTTP:** DELETE
- **Descripción:** Elimina un sobre específico por su ID.
- **Uso:** Sustituye `:id` en la URL con el ID del sobre que deseas eliminar. Por ejemplo, `http://localhost:4000/envelope/delete/2` eliminará el sobre con ID 2.

### 6. Transferir Presupuesto entre Sobres

- **URL:** `/envelopes/switch/:from-:to/:qty`
- **Método HTTP:** POST
- **Descripción:** Transfiere presupuesto de un sobre a otro.
- **Uso:** Sustituye `:from` en la URL con el título del sobre desde el cual deseas transferir presupuesto, `:to` con el título del sobre al cual deseas transferir presupuesto y `:qty` con la cantidad que deseas transferir. Por ejemplo, `http://localhost:4000/envelopes/switch/food-clothes/100` transferirá 100 de "food" a "clothes".

**Nota:** Asegúrate de ajustar las rutas y los nombres de los sobres según tu propia configuración de datos.

¡Disfruta usando la API de Manejo de Sobres!
