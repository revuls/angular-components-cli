#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

program
    .version('0.0.10');

program.command('component')
    .description('creates the folder and file for an angularJS component')
    // .option("-n, --name", "Name of the element or component")
    .action(function(name) {
        var arrayName = name.toLowerCase().split('-');

        let fileComponent = name.toLowerCase() + '.component.js';
        let fileController = name.toLowerCase() + '.controller.js';
        let fileTest = name.toLowerCase() + '.spec.js';
        let fileHtml = name.toLowerCase() + '.html';

        let nameComponent = '';
        let nameController = '';

        arrayName.forEach(function (item, key) {
            if (key === 0) {
                nameComponent = item;
            } else {
                nameComponent += item.capitalize();
            }
            nameController += item.capitalize();
        });
        nameController += 'Controller';

        const sourceComponent = "(function () {\n" +
            "  'use strict';\n\n" +

            "  var " + nameComponent + " = {\n" +
            "    templateUrl: '" + process.cwd() + "/" + fileHtml +"',\n" +
            "    bindings: {\n" +
            "    },\n" +
            "    controller: '" + nameController +"'\n" +
            "  };\n\n" +

            "  angular\n" +
            "    .module('app')\n" +
            "    .component('" + nameComponent + "', " + nameComponent + ");\n" +
            "})();\n";

        const sourceController = "(function () {\n" +
            "  'use strict';\n\n" +

            "  angular\n" +
            "    .module('app')\n" +
            "    .controller('" + nameController + "', " + nameController + ");\n\n" +

            "  /** @ngInject */\n" +
            "  function " + nameController + "() {\n" +
            "    var vm = this;\n\n" +

            "    vm.$onInit = function () {\n" +
            "    };\n" +
            "  }\n" +
            "})();\n";

        const sourceTest = `describe('component: ${nameComponent}', function () {
  var $componentController;

  beforeEach(module('app'));
  beforeEach(angular.mock.inject(function (_$componentController_) {
    $componentController = _$componentController_;
  }));

  // Here we are passing actual bindings to the component
  var bindings = {
  };

  it('should expose a "${nameComponent}" object', function () {
    var ctrl = $componentController('${nameComponent}', null, bindings);

    expect(ctrl).toBeDefined();

    ctrl.$onInit();
  });
});
`;

        const sourceHtml = "<h1>" + nameComponent + "</h1>";

        fs.writeFile(fileComponent, sourceComponent, function(err) {
            if(err) console.log(err.red);
        });

        fs.writeFile(fileController, sourceController, function(err) {
            if(err) console.log(err.red);
        });

        fs.writeFile(fileTest, sourceTest, function(err) {
            if(err) console.log(err.red);
        });

        fs.writeFile(fileHtml, sourceHtml, function(err) {
            if(err) console.log(err.red);
        });
    });

program.command('service')
    .description('creates angularJS service')
    // .option("-n, --name", "Name of the element or component")
    .action(function(name) {
        var arrayName = name.toLowerCase().split('-');
        let fileService = name.toLowerCase() + '.service.js';
        let nameService = '';

        arrayName.forEach(function (item, key) {
            if (key === 0) {
                nameService = item;
            } else {
                nameService += item.capitalize();
            }            
        });

        let service = nameService.capitalize();
        nameService += 'Service';

        const sourceService = `(function () {
  'use strict';

  angular
    .module('app')
    .service('${nameService}', ${nameService});

  /** @ngInject */
  function ${nameService}($http) {
    var url = '/${service}';
    var service = {
      get${service}: get${service}
    };
    return service;

    /**
     * @description method to call ApiService to get ${service}
     * @param  {object} ${service} - ${service} json
     * @return {object} - return a promise object with the api response
     */
    function get${service}() {
      return $http.get(url);
    }
  }
})();
`;        

        fs.writeFile(fileService, sourceService, function(err) {
            if(err) console.log(err.red);
        });        
    });

program.parse(process.argv);

if (!program.args.length) program.help();