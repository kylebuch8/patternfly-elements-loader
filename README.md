# PatternFly Elements Loader

This is a proof of concept server that would dynamically create a JavaScript
file based on the elements that are requested in the URL.

## Usage

```
npm start
```

This will start a server running on `http://localhost:3000`. Then make a request
to `http://localhost:3000?elements=cta,card,tabs`. The elements available in
this proof of concept are:

- accordion
- autocomplete
- card
- content-set
- cta
- datetime
- tabs

## Running the demo

```
npm run demo
```

Navigate to http://localhost:8081/test/ and you should see a call-to-action link
to redhat.com with an arrow to the right.
