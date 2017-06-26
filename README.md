# angular-components-cli

Nodejs CLI to generate all needed files in angular when creating components and services with the best practices

### Global install

```
npm install angular-components-cli -g
```

### how to use it

```
angularjs component [component-name]
```

```
angularjs service [service-name]
```

### Example

```
angularjs component my-component

// Generates the files with needed code:

my-component.component.js
my-component.controller.js
my-component.spec.js
my-component.html
```

```
angularjs service my-service

// Generates the file with needed code:

my-service.service.js
```

### TODO

Make support for:
- Factories
- Directives