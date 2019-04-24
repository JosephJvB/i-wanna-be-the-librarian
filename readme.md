# I wanna be the librarian

- TS express backend
  - save uploaded files to file-system
  - serve uploaded file meta-information: filename/extension/size?
  - save files to dist/temp so client can read/download the files
  - clear dist/temp on success or failure
- use JS framework frontend. Prob vue
  - see all uploaded files
  - filter/search uploaded files
  - can download single-files to computer
  - can download all files as backup

Is vue in typescript hard? I can think of one way to find out my man.

Todo:
- [x]scripts to reset meta.json and uploads folder on heroku
- [x] I wanna make some super dumb and unique auth system and here's how it's gonna work
  - button on main page: "go-go-gadget auth"
  - logs a hash to the heroku console. NEVER sends it back to the client.
  - I take the hash from the console and enter it in the front end..
  - If it matches the hash then I can go do stuff..
  - TODOS: expiry and shit like that. Done.
- [] I wanna build a front end in typescript.
  - Do I use react for hooks? Or vue cos I have a soft spot for vue
  - gonna use vue: vue vue-loader vue-router, might need vue-template-compiler
