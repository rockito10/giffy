# Monorepo

- Eliminado: Prettier & ESLint
- Instalado: Biome
- Se movió todo a: "packages"
- Prisma ahora se llama db
- Se agregó un tsconfig en server
- Se Agregó import alias en server y client

# Cosas que hacer

- [ ] Cuando se migra el esquema de prisma, se debe correr `pnpm prisma generate dev` para que se actualicen los archivos de prisma
- [ ] Cuando se migra el esquema de prisma, el client no funciona sin un usuario en la base de datos
- [ ] Falta la documentación de la API
- [ ] Falta el script de migración de la base de datos
- [ ] Falta el script de seeding de la base de datos
- [ ] Falta el script de limpieza de la base de datos


<!--  -->


- [ ] Crear URLSearchParams en el cliente y server
- [ ] Normalizar tipos de datos en el cliente y server
