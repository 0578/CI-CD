define(function(require) {
    var ExtendedModel = require('componentLibrary-Utils/ExtendedBackboneModel');
    var adapter = require('api/snapshot/adapters/BackboneAdapter').getInstance();

    return ExtendedModel.extend({
        defaults: {
            showBulletPath: true,
            firedBullets: 0,
            showBulletsLeft: false,
            maximumBullets: 99,
            lockSimAfterDestroy: false,
            enableFireButton: true,
            showBulletAccelerationVector: false,
            showBulletVelocityVector: false,
            showBulletGhost: true,
            yVelocityAfter10sec: 0,
            radiusOfCurvature: 0,
            timeOfFlight: 0,
            initialXVelocity: 0,
            initialYVelocity: 0,
            distanceTravelled: 0
        },

        start: function(){
            adapter.expose('showBulletPath', this, { alias: 'Cannon.Show Bullet Path', description: 'Show Bullet Path'});
            adapter.expose('firedBullets', this, { alias: 'Cannon.Num Of Bullets Fired', description: 'Number of Fired Bullets'});
            adapter.expose('showBulletsLeft', this, { alias: 'Cannon.Show Bullets Left', description: 'Show Bullets Left'});
            adapter.expose('maximumBullets', this, { alias: 'Cannon.Max Bullets', description: 'Maximum Allowed Bullets'});
            adapter.expose('yVelocityAfter10sec', this, {alias: 'Cannon.Y Velocity After 10 secs', description: 'Reports the velocity along Y axis after 10 seconds of bullet in flight', readonly: true});
            adapter.expose('radiusOfCurvature', this, {alias: 'Cannon.Radius Of Curvature', description: 'Reports the radius of curvature of the bullet'});
            adapter.expose('lockSimAfterDestroy', this, { alias: 'Cannon Data.Lock Sim After Destroy', description: '' });
            adapter.expose('enableFireButton', this, { alias: 'Cannon InfoPanel.Fire Button Enabled', description: 'Enable Fire Button'});
            adapter.expose('showBulletGhost', this, { alias: 'Cannon.Show Bullet Ghost', description: 'Show Bullet Ghost'});
            adapter.expose('showBulletAccelerationVector', this, { alias: 'Cannon.Show Bullet Acceleration Vector', description: 'Show Bullet Acceleration Vector'});
            adapter.expose('showBulletVelocityVector', this, { alias: 'Cannon.Show Bullet Velocity Vector', description: 'Show Bullet Velocity Vector'});
            adapter.expose('timeOfFlight', this, { alias: 'Cannon.Time Of Flight', description: 'Time of Flight of last fired bullet'});
            adapter.expose('initialXVelocity', this, { alias: 'Cannon.Initial X Velocity', description: 'Initial x velocity of the last fired bullet'});
            adapter.expose('initialYVelocity', this, { alias: 'Cannon.Initial Y Velocity', description: 'Initial y velocity of the last fired bullet'});
            adapter.expose('distanceTravelled', this, { alias: 'Cannon.Distance Travelled', description: 'The distance travelled by the last fired bullet'});
        },

        getShowBulletPath: function() { return this.get('showBulletPath'); },
        setShowBulletPath: function(value) { this.set('showBulletPath', value); },
        getFiredBullets: function() { return this.get('firedBullets'); },
        setFiredBullets: function(value) { this.set('firedBullets', value); },
        getShowBulletsLeft: function() { return this.get('showBulletsLeft'); },
        setShowBulletsLeft: function(value) { this.set('showBulletsLeft', value); },
        getMaximumBullets: function() { return this.get('maximumBullets'); },
        setMaximumBullets: function(value) { this.set('maximumBullets', value); },
        getBallX: function() { return this.get('ballX'); },
        setBallX: function(value) { this.set('ballX', value); },
        getBallY: function() { return this.get('ballY'); },
        setBallY: function(value) { this.set('ballY', value); },
        getLockSim: function() { return this.get('lockSim'); },
        setLockSim: function(value) { this.set('lockSim', value); },
        getLockSimAfterDestroy: function() { return this.get('lockSimAfterDestroy'); },
        setLockSimAfterDestroy: function(value) { this.set('lockSimAfterDestroy', value); },
        getEnableFireButton: function() { return this.get('enableFireButton'); },
        setEnableFireButton: function(value) { this.set('enableFireButton', value); },
        getYVelocityAfter10sec: function(){ return this.get('yVelocityAfter10sec');},
        setYVelocityAfter10sec: function(value) { this.set('yVelocityAfter10sec', value); },
        getRadiusOfCurvature: function(){ return this.get('radiusOfCurvature');},
        setRadiusOfCurvature: function(value) { this.set('radiusOfCurvature', value); },
        getTimeOfFlight: function() { return this.get('timeOfFlight'); },
        setTimeOfFlight: function(value) { this.set('timeOfFlight', value); },
        getInitialXVelocity: function(){ return this.get('initialXVelocity');},
        setInitialXVelocity: function(value) { this.set('initialXVelocity', value); },
        getInitialYVelocity: function(){ return this.get('initialYVelocity');},
        setInitialYVelocity: function(value) { this.set('initialYVelocity', value); },
        getDistanceTravelled: function(){ return this.get('distanceTravelled');},
        setDistanceTravelled: function(value) { this.set('distanceTravelled', value); }
    });
});

