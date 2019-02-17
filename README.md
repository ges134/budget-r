# budget-r
Budget-R is a web application allowing you to manage personal finances. Get all your financial information at one glance!

# How to get started

You need a pg SQL database in order to be able to run the backend.

After, you need to create under `backend/src/config` a file named `knexConfig.ts`

and insert the following snippet.

```
const knexConfig = {
  host : '127.0.0.1',
  user : 'your_database_user',
  password : 'your_database_password.',
  database : 'budgetr'
}

export default knexConfig;
```
