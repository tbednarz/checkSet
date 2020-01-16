# checkSet
command line tool to keep track of paychecks
Currently can use command line to created json file holding checks
or send http requests with authorized login to store in a database

```
Commands:
  app.js add     Adds check to be broken down
  app.js read    Read a check
  app.js list    Lists checks
  app.js remove  Remove a check
  ```
```
node app.js add --week=1 --amount=300

node app.js list

Your Checks: 
Week: 1
Amount: 300
--------------------

node app.js read --week=1

Week: 1
Amount: 300

node app.js remove --week=1

check from week 1 removed.

```
