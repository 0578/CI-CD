/*global requirejs */
requirejs.config({
    'shim': {
        'jquery': {
            'exports': '$'
        },
        'underscore': {
            'exports': '_'
        },
        'backbone': {
            'deps': ['underscore'],
            'exports': 'Backbone'
        },
        'sinon': {
            'exports': 'sinon'
        }
    },
    'paths': {
        'text': '../../../bower_components/requirejs-text/text',
        'jquery': '../../../bower_components/jquery/dist/jquery',
        'jquery-ui': '../../../bower_components/jquery-ui/ui',
        'underscore': '../../../bower_components/underscore/underscore',
        'backbone': '../../../bower_components/backbone/backbone',

        'check': '../../../bower_components/check-js/check.min',

        'templates': '../templates',

        'sim-common': '../../../bower_components/common/app/scripts/sim-common',

        //Mocking paths for Simcapi
        'api/snapshot': '../../../bower_components/simcapi/app/scripts/api/snapshot',

        'componentLibrary-Renderers': '../../../bower_components/componentLibrary-Renderers/app/scripts',
        'componentLibrary-Utils': '../../../bower_components/componentLibrary-Utils/app/scripts',
        'componentLibrary-Sync': '../../../bower_components/componentLibrary-Sync/app/scripts',
        'componentLibraryJQueryUI': '../../../bower_components/componentLibraryJQueryUI/app/scripts',

        'ComponentSystem': '../../../bower_components/componentSystem/componentSystem',
        'SceneManager': '../../../bower_components/sceneManager/sceneManager',
        'ComponentLibrary': '../../../bower_components/sceneManager/app/scripts/ComponentLibrary',
        'jquery-ui-touch-punch': "../../../bower_components/jquery-ui-touch-punch/jquery.ui.touch-punch"
    }
});