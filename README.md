
# ExactTarget-email-sends-dashboard
_Wouldn't it be great if ExactTarget had some kind of dashboard that let you view all the data for your email sends in a clear and helpful way?_

### How to run Meteor with mongodb version 3
(This assumes you have another mongodb running that is version 3)
Run Meteor with MONGO_URL: 
MONGO_URL=mongodb://localhost:27017/<db_name> meteor
http://www.meteorpedia.com/read/Environment_Variables


### Migrate existing database into meteor

#### Dump existing mongo database:
`-h` is default mongodb hostname
`mongodump -h 127.0.0.1:27017 -d <name of database to be dumped> -o <pathname of folder to dump into>`


#### Restore dumped database into meteor:
- `-h` is default meteor mongodb instance hostname
- `-d` is the name of the database to dump into. You should use the default `meteor` db (already created by meteor)
- the last argument is the path of the *database name* in the folder where the dump lives - it needs no flag
`mongorestore -h 127.0.0.1:3001 -d meteor <path of database name in database dump folder>`


#### Notes:
Variables must be passed into a MongoDB query as an object, maybe like JSON.parse(...)