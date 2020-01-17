# checkSet
command line tool to keep track of paychecks.
Currently can use command line to created json file holding checks
or send http requests with authorized login to store in a database

```
Commands:
  app.js a  --week=ENTER-WEEK --amount=ENTER-AMOUNT  Adds check to be broken down
  app.js r  --week=ENTER-WEEK                        Read a check
  app.js l                                           Lists checks
  app.js rm --week=ENTER-WEEK                        Remove a check
  app.js rmall                                       remove all checks
  app.js sort                                        Sorts checks.json just incase it gets out of wack

```
