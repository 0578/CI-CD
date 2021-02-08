/*global require, process*/
module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        "pkg": "<json:package.json>",
        "projName": "unsw-eng-projectile-motion",
        "projVersion": "2.2.0",
        "deployFragment": "<%= projName %>/<%= projVersion %>",
        "requireScript": "<script type=\"text/javascript\">requirejs.config({ baseUrl: \"scripts\" });require([\"config\"], function() { require([\"main\"]); });</script>",
        "clean": {
            "local": {
                "src": [
                    "temp/local",
                    "dist/local"
                ],
                "options": {
                    "force": true
                }
            },
            "release": {
                "src": [
                    "temp",
                    "dist"
                ],
                "options": {
                    "force": true
                }
            }
        },
        "jshint": {
            "all": [
                "Gruntfile.js",
                "app/scripts/**/*.js",
                "test/specs/**/*.js"
            ],
            "options": {
                "curly": false,
                "eqeqeq": true,
                "immed": true,
                "latedef": true,
                "newcap": true,
                "noarg": true,
                "sub": true,
                "undef": true,
                "boss": true,
                "eqnull": true,
                "onecase": true,
                "scripturl": true,
                "globals": {
                    "exports": true,
                    "module": false,
                    "define": false,
                    "describe": false,
                    "xdescribe": false,
                    "it": false,
                    "xit": false,
                    "beforeEach": false,
                    "afterEach": false,
                    "expect": false
                }
            }
        },
        "less": {
            "local": {
                "options": {
                    "paths": [
                        "app/styles",
                        "bower_components/common/app/styles"
                    ]
                },
                "files": [
                    {
                        "dest": "temp/local/css/<%= projName %>.css",
                        "src": [
                            "app/styles/start.less"
                        ]
                    }
                ]
            },
            "prod": {
                "options": {
                    "paths": "<%= less.local.options.paths %>",
                    "compress": true
                },
                "files": [
                    {
                        "dest": "temp/prod/css/<%= projName %>.css",
                        "src": "app/styles/start.less"
                    }
                ]
            }
        },
        "copy": {
            "localCompile": {
                "files": [
                    {
                        "dest": "dist/local/index.html",
                        "src": [
                            "index.html"
                        ]
                    },
                    {
                        "dest": "dist/local/scripts/",
                        "src": [
                            "**"
                        ],
                        "cwd": "app/scripts/",
                        "expand": true
                    },
                    {
                        "dest": "dist/local/templates/",
                        "src": [
                            "**"
                        ],
                        "cwd": "app/templates/",
                        "expand": true
                    },
                    {
                        "dest": "dist/local/assets/",
                        "src": [
                            "**"
                        ],
                        "cwd": "app/assets/",
                        "expand": true
                    }
                ]
            },
            "release": {
                "files": [
                    {
                        "dest": "dist/prod/<%= deployFragment %>/index.html",
                        "src": [
                            "index.html"
                        ]
                    },
                    {
                        "dest": "temp/prod/scripts/",
                        "src": [
                            "**"
                        ],
                        "cwd": "app/scripts/",
                        "expand": true
                    },
                    {
                        "dest": "temp/prod/templates/",
                        "src": [
                            "**"
                        ],
                        "cwd": "app/templates/",
                        "expand": true
                    },
                    {
                        "dest": "dist/prod/<%= deployFragment %>/assets/",
                        "src": [
                            "**"
                        ],
                        "cwd": "app/assets/",
                        "expand": true
                    },
                    {
                        "dest": "dist/meta/README.md",
                        "src": [
                            "README.md"
                        ]
                    }
                ]
            }
        },
        "watch": {
            "styles": {
                "files": [
                    "app/styles/**"
                ],
                "tasks": [
                    "localStyle"
                ]
            },
            "code": {
                "files": [
                    "app/**",
                    "!app/styles/**",
                    "test/**/*.js"
                ],
                "tasks": [
                    "local"
                ]
            },
            "tddCode": {
                "files": [
                    "app/**",
                    "!app/styles/**",
                    "test/**/*.js"
                ],
                "tasks": [
                    "localTestFirst"
                ]
            },
            "copyOnly": {
                "files": [
                    "app/**",
                    "!app/styles/**",
                    "test/**/*.js"
                ],
                "tasks": [
                    "localCopyOnly"
                ]
            }
        },
        "requirejs": {
            "prod": {
                "options": {
                    "baseUrl": "temp/prod/scripts",
                    "mainConfigFile": "app/scripts/config.js",
                    "name": "../../../bower_components/almond/almond",
                    "include": "main",
                    "insertRequire": [
                        "main"
                    ],
                    "out": "dist/prod/<%= deployFragment %>/js/<%= projName %>.js",
                    "wrap": false
                }
            }
        },
        "templateFile": {
            "local": {
                "file": "dist/local/index.html",
                "options": {
                    "data": {
                        "jsUrl": "../../bower_components/requirejs/require.js",
                        "cssUrl": "css/<%= projName %>.css",
                        "version": "- v<%= projVersion %>",
                        "requireScript": "<%= requireScript %>"
                    }
                }
            },
            "localCSS": {
                "file": "dist/local/css/<%= projName %>.css",
                "options": {
                    "data": {
                        "imagePath": "../assets"
                    }
                }
            },
            "localEnvironment": {
                "file": "dist/local/scripts/env.js",
                "options": {
                    "data": {
                        "imagePath": "assets"
                    }
                }
            },
            "prod": {
                "file": "dist/prod/<%= deployFragment %>/index.html",
                "options": {
                    "data": {
                        "jsUrl": "/<%= deployFragment %>/js/<%= projName %>.js",
                        "cssUrl": "/<%= deployFragment %>/css/<%= projName %>.css",
                        "version": "- v<%= projVersion %>",
                        "requireScript": ""
                    }
                }
            },
            "prodCSS": {
                "file": "dist/prod/<%= deployFragment %>/css/<%= projName %>.css",
                "options": {
                    "data": {
                        "imagePath": "/<%= deployFragment %>/assets"
                    }
                }
            },
            "prodEnvironment": {
                "file": "temp/prod/scripts/env.js",
                "options": {
                    "data": {
                        "imagePath": "./assets"
                    }
                }
            }
        },
        "mocha": {
            "dot": {
                "src": [
                    "test/index.html"
                ]
            }
        },
        "bless": {
            "local": {
                "files": [
                    {
                        "dest": "dist/local/css/<%= projName %>.css",
                        "src": "temp/local/css/<%= projName %>.css"
                    }
                ]
            },
            "release": {
                "files": [
                    {
                        "dest": "dist/prod/<%= deployFragment %>/css/<%= projName %>.css",
                        "src": "temp/prod/css/<%= projName %>.css"
                    }
                ]
            }
        },
        "parallel": {
            "watch": {
                "options": {
                    "grunt": true,
                    "stream": true
                },
                "tasks": [
                    "watch:code",
                    "watch:styles"
                ]
            },
            "tddwatch": {
                "options": {
                    "grunt": true,
                    "stream": true
                },
                "tasks": [
                    "watch:tddCode",
                    "watch:styles"
                ]
            },
            "copywatch": {
                "options": {
                    "grunt": true,
                    "stream": true
                },
                "tasks": [
                    "watch:copyOnly",
                    "watch:styles"
                ]
            }
        },
        "gruntGenerator": {
            "options": {
                "type": "sim"
            }
        }
    });

    // Load plugins
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-requirejs");
    grunt.loadNpmTasks("grunt-mocha");
    grunt.loadNpmTasks("grunt-bless");
    grunt.loadNpmTasks("grunt-template-file");
    grunt.loadNpmTasks("grunt-parallel");
    grunt.loadNpmTasks("grunt-build-generator");


    // Define grunt tasks
    var watchToUse = 'parallel:' + (process.env.gruntWatch || '') + 'watch';
    grunt.registerTask("localTemplate", ["templateFile:local","templateFile:localCSS","templateFile:localEnvironment"]);
    grunt.registerTask("local", ["clean:local","jshint","copy:localCompile","less:local","bless:local","localTemplate","mocha:dot"]);
    grunt.registerTask("localStyle", ["clean:local","copy:localCompile","less:local","bless:local","localTemplate"]);
    grunt.registerTask("localCopyOnly", ["clean:local","copy:localCompile","less:local","bless:local","localTemplate"]);
    grunt.registerTask("localTestFirst", ["clean:local","copy:localCompile","less:local","bless:local","localTemplate","mocha:dot","jshint"]);
    grunt.registerTask("rel", ["clean","jshint","copy:localCompile","copy:release","less","bless","templateFile","mocha:dot","requirejs"]);
    grunt.registerTask("default", ["local",watchToUse]);
    grunt.registerTask("copyOnlyWatch", ["localCopyOnly","parallel:copywatch"]);
    grunt.registerTask("tddWatch", ["localTestFirst","parallel:tddwatch"]);
    grunt.registerTask("build", ["gruntGenerator"]);

};
