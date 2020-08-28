# Proyecto venta-online

## problema

Se desea simular un control de productos de diversos vendedores y ventas directas sobre los productos.
La idea es poder registrarse como vendedor, el vendedor tiene la capacidad de adminstrar sus productos con datos básicos, teniendo como mínimo, nombre y precio. El vendedor también puede comprar productos de otros vendedores.
Un usuario no registrado podrá solo ver el catálogo de productos y comprar

Se requiere:
  - Registro
  - CRUD productos
  - Autenticación – Requerido para el crud de productos
  -  Compra de productos
  -  Resultados (Reportes deseados para el vendedor):
       - Total de ventas por producto (en moneda)
       - Total de ventas global (en moneda)
       - Promedio de los precios manejados en su catálogo de productos


## Nota:
Para poder utilizar el apartado de reportes por favor realizar una venta antes.

## Correr sistema
Step 1: Clone this repo

- git clone https://github.com/crisswebapp/vende-online.git
- cd react-redux-starter
Step 2: Create a virtualenv with python3 (BASE PYTHON 3.6)

IMPORTANT! Before creating the virtual env, make sure the Python 3 version is 3.6 or higher.
mkvirtualenv starter --python=/usr/bin/python3
or 
mkvirtualenv starter --python=/usr/bin/python3.x
Step 3: Install the backend requirements

- pip install -r requirements.txt

Step 4: Run the migrations

- ./manage.py migrate
Step 5: Start the backend

- ./manage.py runserver
Step 6: Start the frontend

cd frontend
npm i
npm start
And Done, as easy as 123!!
  
