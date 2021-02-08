define(function(require) {
    var ORIGIN = require('constants/Origin');
    var GLOBAL = require('constants/Global');
    var REFERENCES = require('constants/References');

    return {
        id: 'Config',
        factories: {
            tooltip: {
                components: {
                    renderer: {componentName: 'ui/htmlRenderer', class: 'tooltip'},
                    positioner: { componentName: 'behaviour/tooltipPositioner', target: "~renderer", renderer: '&renderer' }
                },
                children: {
                    horizontalDistance: {
                        components: {
                            textRenderer: {componentName: 'ui/textRenderer', text: 'Horizontal Distance: ', class: 'horizontalText'}
                        },
                        children: {
                            horizontalValue: {
                                components: {
                                    distanceRenderer: {componentName: 'ui/textRenderer', type: 'span', class: 'value'},
                                    syncDistanceX: {componentName: 'behaviour/updateDistance', renderer: '&distanceRenderer', model: '~model', modelKey: 'x'}
                                }
                            }
                        }
                    },
                    verticalDistance: {
                        components: {
                            textRenderer: {componentName: 'ui/textRenderer', text: 'Vertical Distance: ', class: 'verticalText'}
                        },
                        children: {
                            verticalValue: {
                                components: {
                                    distanceRenderer: {componentName: 'ui/textRenderer', type: 'span', class: 'value'},
                                    syncDistanceY: {componentName: 'behaviour/updateDistance', renderer: '&distanceRenderer', model: '~model', modelKey: 'y'}
                                }
                            }
                        }
                    }
                }
            },
            cannonBall: {
                components: {
                    renderer: { componentName: 'ui/htmlRenderer', class: 'ball', parent: '&boundariesWrapper.renderer' },
                    model: { componentName: 'model/cannonBall' },
                    syncX: { componentName: 'sync/modelToNumericProperty', target: '&renderer', property: 'x', model: '&cannon.model', offset: ORIGIN.X, modelKey: 'ballX' },
                    syncY: { componentName: 'sync/modelToNumericProperty', target: '&renderer', property: 'y', model: '&cannon.model', offset: -ORIGIN.Y, modelKey: 'ballY', factor: -1 },
                    syncEnableFireButton: { componentName: 'sync/toggleClass', renderer: '&fireButton.renderer', model: '&cannon.model', modelKey: 'enableFireButton', modelKeyValue: false, className: 'disabled' },
                    updateBall: { componentName: 'behaviour/updateBall', model: '&cannon.model', angleModel: '&angle.model', velocityModel: '&exitVelocity.model', aimHandle: '&aim.aimHandle' },
                    updateVectors: { componentName: 'behaviour/updateVectors', model: '&cannon.model',angleModel: '&angle.model', velocityModel: '&exitVelocity.model'}
                },
                children: {
                    ghostBallX: {
                        components: {
                            renderer: { componentName: 'ui/htmlRenderer', class: 'ballGhostX', parent: '&boundariesWrapper.renderer' },
                            syncBulletGhostX: { componentName: 'sync/toggleVisibility', model: '&cannon.model', modelKey: 'showBulletGhost', modelKeyValue: true, renderer: '&renderer' },
                            syncX: { componentName: 'sync/modelToNumericProperty', target: '&renderer', property: 'x', model: '&cannon.model', offset: ORIGIN.X, modelKey: 'ballX' }
                        }
                    },
                    ghostBallY: {
                        components: {
                            renderer: { componentName: 'ui/htmlRenderer', class: 'ballGhostY', parent: '&boundariesWrapper.renderer' },
                            syncBulletGhostY: { componentName: 'sync/toggleVisibility', model: '&cannon.model', modelKey: 'showBulletGhost', modelKeyValue: true, renderer: '&renderer' },
                            syncY: { componentName: 'sync/modelToNumericProperty', target: '&renderer', property: 'y', model: '&cannon.model', offset: -ORIGIN.Y, factor: -1, modelKey: 'ballY' }
                        }
                    },
                    velocityLineX:{
                        components:{
                            renderer: { componentName: 'ui/htmlRenderer', type: 'canvas', attributes: { width: 525, height: 500 }, parent: '&boundariesWrapper.renderer'  },
                            drawLine: { componentName: 'ui/drawLine', model: '&cannon.model', modelKey: 'vx', renderer : '&renderer', color: '#00ff00', lineWidth : 2, fromX: 'ballX', fromY : 'ballY', to : 'vx'},
                            toggle: {componentName: 'sync/toggleVisibility', renderer: '&renderer', model: '&cannon.model', modelKey: 'showBulletVelocityVector', modelKeyValue: true}
                        }
                    },
                    velocityLineY:{
                        components:{
                            renderer: { componentName: 'ui/htmlRenderer', type: 'canvas', attributes: { width: 525, height: 500 }, parent: '&boundariesWrapper.renderer'  },
                            drawLine: { componentName: 'ui/drawLine', model: '&cannon.model', modelKey: 'vy', renderer : '&renderer', color: '#0000ff', lineWidth : 2, fromX: 'ballX', fromY : 'ballY', to : 'vy'},
                            toggleTarget: {componentName: 'sync/toggleVisibility', renderer: '&renderer', model: '&cannon.model', modelKey: 'showBulletVelocityVector', modelKeyValue: true}
                        }
                    },
                    velocityLineDiagonal:{
                        components:{
                            renderer: { componentName: 'ui/htmlRenderer', type: 'canvas', attributes: { width: 525, height: 500 }, parent: '&boundariesWrapper.renderer'  },
                            drawLine: { componentName: 'ui/drawLine', model: '&cannon.model', modelKey: 'vd', renderer : '&renderer', color: '#ff0000', lineWidth : 2, fromX: 'ballX', fromY : 'ballY', to : 'vd'},
                            toggle: {componentName: 'sync/toggleVisibility', renderer: '&renderer', model: '&cannon.model', modelKey: 'showBulletVelocityVector', modelKeyValue: true}
                        }
                    },
                    accelerationLineNormal:{
                        components:{
                            renderer: { componentName: 'ui/htmlRenderer', type: 'canvas', attributes: { width: 525, height: 500 }, parent: '&boundariesWrapper.renderer'  },
                            drawLine: { componentName: 'ui/drawLine', model: '&cannon.model', modelKey: 'an', renderer : '&renderer', color: '#00ff00', lineWidth : 2, fromX: 'ballX', fromY : 'ballY', to : 'an'},
                            toggle: {componentName: 'sync/toggleVisibility', renderer: '&renderer', model: '&cannon.model', modelKey: 'showBulletAccelerationVector', modelKeyValue: true}
                        }
                    },
                    accelerationLineTangential:{
                        components:{
                            renderer: { componentName: 'ui/htmlRenderer', type: 'canvas', attributes: { width: 525, height: 500 }, parent: '&boundariesWrapper.renderer'  },
                            drawLine: { componentName: 'ui/drawLine', model: '&cannon.model', modelKey: 'at', renderer : '&renderer', color: '#ff0000', lineWidth : 2, fromX: 'ballX', fromY : 'ballY', to : 'at'},
                            toggle: {componentName: 'sync/toggleVisibility', renderer: '&renderer', model: '&cannon.model', modelKey: 'showBulletAccelerationVector', modelKeyValue: true}
                        }
                    },
                    accelerationLineDiagonal:{
                        components:{
                            renderer: { componentName: 'ui/htmlRenderer', type: 'canvas', attributes: { width: 525, height: 500 }, parent: '&boundariesWrapper.renderer'  },
                            drawLine: { componentName: 'ui/drawLine', model: '&cannon.model', modelKey: 'ad', renderer : '&renderer', color: '#0000ff', lineWidth : 2, fromX: 'ballX', fromY : 'ballY', to : 'ad'},
                            toggle: {componentName: 'sync/toggleVisibility', renderer: '&renderer', model: '&cannon.model', modelKey: 'showBulletAccelerationVector', modelKeyValue: true}
                        }
                    }
                }
            },
            target: {
                components: {
                    capi: {componentName: 'capi/target', id: REFERENCES.INDEX },
                    model: {componentName: 'model/target', id: REFERENCES.INDEX },
                    renderer: {componentName: 'ui/htmlRenderer', class: 'target'},
                    targetLocationX: {componentName: 'sync/modelToNumericProperty', target: '&renderer', model: '&model', modelKey: 'x', property: 'x', offset: ORIGIN.X},
                    targetLocationY: {componentName: 'sync/modelToNumericProperty', target: '&renderer', model: '&model', modelKey: 'y', property: 'y', offset: -ORIGIN.Y, factor: -1},
                    syncX: {componentName: 'sync/modelToModel', modelA: '&capi', modelAKey: 'x', modelB: '&model', modelBKey: 'x'},
                    syncY: {componentName: 'sync/modelToModel', modelA: '&capi', modelAKey: 'y', modelB: '&model', modelBKey: 'y'},
                    xRangeValidator: { componentName: 'validator/range', model: '&model', value: 'x', minValue: 'minX', maxValue: 'maxX' },
                    yRangeValidator: { componentName: 'validator/range', model: '&model', value: 'y', minValue: 'minY', maxValue: 'maxY' },
                    syncVisible: {componentName: 'sync/modelToModel', modelA: '&capi', modelAKey: 'visible', modelB: '&model', modelBKey: 'visible'},
                    syncDestroyed: {componentName: 'sync/modelToModel', modelA: '&capi', modelAKey: 'destroyed', modelB: '&model', modelBKey: 'destroyed'},
                    toggleTarget: { componentName: 'sync/toggleVisibility', renderer: '&renderer', model: '&model', modelKey: 'visible', modelKeyValue: true },
                    explosion: { componentName: 'ui/htmlRenderer', class: 'explosion', parent: '&renderer' },
                    targetCollision: { componentName: 'behaviour/targetCollision', renderer: '&renderer', model: '&model', cannonModel: '&cannon.model' },
                    destroyTarget: { componentName: 'behaviour/destroyTarget', renderer: '&renderer', explosionRenderer: '&explosion', model: '&model' },
                    updateFlight: { componentName: 'sync/flight', targetModel: '&model', velocityModel: '&exitVelocity.model', angleModel: '&angle.model', cannonModel: '&cannon.model' },
                    syncCollisionYDiff: {componentName: 'sync/modelToModel', modelA: '&capi', modelAKey: 'collisionYDiff', modelB: '&model', modelBKey: 'collisionYDiff' },
                    chipTarget: { componentName: 'behaviour/chipTarget', renderer: '&renderer', explosionRenderer: '&explosion', model: '&model' },
                    draggable: { componentName: 'ui/draggable', renderer: '&renderer' },
                    validator: { componentName: 'validator/targetPosition', offsetX: ORIGIN.X, offsetY: ORIGIN.Y, parentWidth: GLOBAL.WIDTH, parentHeight: GLOBAL.HEIGHT, objectOffsetX : 11, objectOffsetY: 17, groundHeight: 8 },
                    dragTarget: { componentName: 'behaviour/dragTarget', model: '&model', targetsModel: '&targets.targetsModel', renderer: '&renderer', validator: '&validator', offsetX: -ORIGIN.X, offsetY: ORIGIN.Y },
                    createTooltip: { componentName: 'behaviour/createTooltip', model: '&model', targetsModel: '&targets.targetsModel', renderer: "&renderer", tooltipCreator: '&tooltipCreator.creator'}
                }
            }
        },
        entities: {
            cannon: {
                components: {
                    renderer: { componentName: 'ui/htmlRenderer', class: 'cannon', rotation: '90' },
                    capi: { componentName: 'capi/cannon' },
                    model: { componentName: 'model/cannon' },
                    LockSim: { componentName: 'sync/lockSim', model: '&model' },
                    syncShowBulletsLeft: { componentName: 'sync/modelToModel', modelA: '&capi', modelAKey: 'showBulletsLeft', modelB: '&model', modelBKey: 'showBulletsLeft' },
                    syncMaximumBullets: { componentName: 'sync/modelToModel', modelA: '&capi', modelAKey: 'maximumBullets', modelB: '&model', modelBKey: 'maximumBullets' },
                    syncData: { componentName: 'sync/cannon', velocityModel: '&exitVelocity.model', angleModel : '&angle.model', cannonModel : '&model'},
                    syncShowBulletPath: { componentName: 'sync/modelToModel', modelA: '&capi', modelAKey: 'showBulletPath', modelB: '&model', modelBKey: 'showBulletPath' },
                    syncRotation: { componentName: 'sync/modelToNumericProperty', target: '&renderer', model: '&angle.model',  modelKey: 'val', property: 'rotation', factor: -1 },
                    syncLockSimAfterDestroy: { componentName: 'sync/modelToModel', modelA: '&capi', modelAKey: 'lockSimAfterDestroy', modelB: '&model', modelBKey: 'lockSimAfterDestroy' },
                    syncShowBulletGhost: { componentName: 'sync/modelToModel', modelA: '&capi', modelAKey: 'showBulletGhost', modelB: '&model', modelBKey: 'showBulletGhost' },
                    syncShowBulletAccelerationVector: { componentName: 'sync/modelToModel', modelA: '&capi', modelAKey: 'showBulletAccelerationVector', modelB: '&model', modelBKey: 'showBulletAccelerationVector' },
                    showBulletVelocityVector: { componentName: 'sync/modelToModel', modelA: '&capi', modelAKey: 'showBulletVelocityVector', modelB: '&model', modelBKey: 'showBulletVelocityVector' },
                    syncYVelocityAfter10sec: { componentName: 'sync/modelToModel',modelA: '&model', modelB: '&capi', modelAKey: 'yVelocityAfter10sec',  modelBKey: 'yVelocityAfter10sec' },
                    syncRadiusOfCurvature: { componentName: 'sync/modelToModel', modelA: '&model', modelB: '&capi', modelAKey: 'radiusOfCurvature',  modelBKey: 'radiusOfCurvature' },
                    syncTimeOfFlight: { componentName: 'sync/modelToModel', modelA: '&model', modelB: '&capi', modelAKey: 'timeOfFlight',  modelBKey: 'timeOfFlight' },
                    syncInitialXVelocity: { componentName: 'sync/modelToModel', modelA: '&model', modelB: '&capi', modelAKey: 'initialXVelocity',  modelBKey: 'initialXVelocity' },
                    syncInitialYVelocity: { componentName: 'sync/modelToModel', modelA: '&model', modelB: '&capi', modelAKey: 'initialYVelocity',  modelBKey: 'initialYVelocity' },
                    syncDistanceTravelled: { componentName: 'sync/modelToModel', modelA: '&model', modelB: '&capi', modelAKey: 'distanceTravelled',  modelBKey: 'distanceTravelled' }
                }
            },
            exitVelocity: {
                components: {
                    renderer: { componentName: 'ui/htmlRenderer', class: 'exitVelocity', rotation: '0' },
                    model: { componentName: 'model/inputValue' },
                    capi: { componentName: 'capi/inputValue', alias: 'Exit Velocity', minValue: 1, maxValue: 300 },
                    syncVal: { componentName: 'sync/modelToModel', modelA: '&capi', modelAKey: 'val', modelB: '&model', modelBKey: 'val' },
                    syncMinVal: { componentName: 'sync/modelToModel', modelA: '&capi', modelAKey: 'minVal', modelB: '&model', modelBKey: 'minVal' },
                    syncMaxVal: { componentName: 'sync/modelToModel', modelA: '&capi', modelAKey: 'maxVal', modelB: '&model', modelBKey: 'maxVal' },
                    syncShow: { componentName: 'sync/modelToModel', modelA: '&capi', modelAKey: 'show', modelB: '&model', modelBKey: 'show' },
                    syncAllowEdit: { componentName: 'sync/modelToModel', modelA: '&capi', modelAKey: 'allowEdit', modelB: '&model', modelBKey: 'allowEdit' },
                    syncRotation: { componentName: 'sync/modelToNumericProperty', target: '&renderer', model: '&angle.model',  modelKey: 'val', property: 'rotation', offset: 0, factor: -1 },
                    syncWithAim: { componentName: 'sync/velocityInput', cannonModel: '&cannon.model', inputModel: '&model', aimModel: '&aim.model' },
                    rangeValidator: { componentName: 'validator/range', model: '&model', value: 'val', minValue: 'minVal', maxValue: 'maxVal' },
                    toggle: { componentName: 'sync/toggleClass', model: '&model', renderer: '&renderer', modelKey: 'show', modelKeyValue: true, matching: false, className: 'isHidden' }
                },
                children: {
                    input: {
                        components: {
                            renderer: { componentName: 'ui/htmlRenderer', type: 'input', attributes: { id: 'inputVelocity' } },
                            validator: { componentName: 'validator/number' },
                            sync: { componentName: 'sync/modelToInput', renderer: '&renderer', model: '&^.model', modelKey: 'val', validator: '&validator' },
                            toggleFocus: { componentName: 'sync/toggleClass', model: '&^.model', modelKey: 'focused', modelKeyValue: true, renderer: '&renderer', className: 'focused' },
                            syncFocus: { componentName: 'sync/setOnEvent', renderer: '&renderer', model: '&^.model', modelKey: 'focused', eventName: 'focus', value: true },
                            syncBlur: { componentName: 'sync/setOnEvent', renderer: '&renderer', model: '&^.model', modelKey: 'focused', eventName: 'blur', value: false },
                            toggleDisabled: {componentName: 'sync/toggleRendererProperty', models : ['&^.model','&cannon.model'], modelKeys: ['allowEdit','lockSim'], modelKeyValues: [false,true], propertyName: 'disabled', renderer: '&renderer' }
                        }
                    },
                    label: {
                        components: {
                            renderer: { componentName: 'ui/textRenderer', type: 'label', text: 'Exit Velocity (m/s)', attributes: { for: 'inputVelocity' } }
                        }
                    }
                }
            },
            aim: {
                components: {
                    renderer: { componentName: 'ui/htmlRenderer', class: 'aim' },
                    model: { componentName: 'model/aim' },
                    capi: { componentName: 'capi/aim' },
                    draggable: { componentName: 'ui/draggable', renderer: '&renderer' },
                    validator: { componentName: 'validator/aimPosition', radius: ORIGIN.RADIUS, exitVelocityModel: '&exitVelocity.model',angleModel: '&angle.model' },
                    draggableToModel: { componentName: 'sync/draggableToModel', model: '&model', renderer: '&renderer', validator: '&validator', xKey: 'posX', yKey: 'posY', offsetX: -ORIGIN.X, offsetY: ORIGIN.Y },
                    syncX: { componentName: 'sync/modelToNumericProperty', target: '&renderer', property: 'x', model: '&model', modelKey: 'posX', offset: ORIGIN.X },
                    syncY: { componentName: 'sync/modelToNumericProperty', target: '&renderer', property: 'y', model: '&model', modelKey: 'posY', offset: -ORIGIN.Y, factor: -1 },
                    syncVelocityFocus: { componentName: 'sync/setOnEvent', renderer: '&renderer', model: '&exitVelocity.model', modelKey: 'focused', eventName: 'dragstart', value: true },
                    syncVelocityBlur: { componentName: 'sync/setOnEvent', renderer: '&renderer', model: '&exitVelocity.model', modelKey: 'focused', eventName: 'dragstop', value: false },
                    syncAngleFocus: { componentName: 'sync/setOnEvent', renderer: '&renderer', model: '&angle.model', modelKey: 'focused', eventName: 'dragstart', value: true },
                    syncAngleBlur: { componentName: 'sync/setOnEvent', renderer: '&renderer', model: '&angle.model', modelKey: 'focused', eventName: 'dragstop', value: false },
                    aimHandle: { componentName: 'behaviour/aimHandle', capi: '&capi', model: '&model'},
                    syncShowGuidelines: { componentName: 'sync/modelToModel', modelA: '&capi', modelAKey: 'showGuidelines', modelB: '&model', modelBKey: 'showGuidelines' },
                    toggle: { componentName: 'sync/toggleClass', model: '&model', renderer: '&renderer', modelKey: 'showHandle', modelKeyValue: true, matching: false, className: 'isHidden' },
                    toggleAngle: { componentName: 'sync/toggleClass', model: '&angle.model', renderer: '&renderer', modelKey: 'allowEdit', modelKeyValue: false, className: 'angleDisabled' },
                    toggleVelocity: { componentName: 'sync/toggleClass', model: '&exitVelocity.model', renderer: '&renderer', modelKey: 'allowEdit', modelKeyValue: false, className: 'velocityDisabled' },
                    lockSim: { componentName: 'behaviour/lockDraggable', model: '&cannon.model', renderer: '&renderer' }
                }
            },
            angle: {
                components: {
                    renderer: { componentName: 'ui/htmlRenderer', class: 'angle' },
                    model: { componentName: 'model/inputValue' },
                    capi: { componentName: 'capi/inputValue', alias: 'Angle', minValue: 0, maxValue: 90 },
                    syncVal: { componentName: 'sync/modelToModel', modelA: '&capi', modelAKey: 'val', modelB: '&model', modelBKey: 'val' },
                    syncMinVal: { componentName: 'sync/modelToModel', modelA: '&capi', modelAKey: 'minVal', modelB: '&model', modelBKey: 'minVal' },
                    syncMaxVal: { componentName: 'sync/modelToModel', modelA: '&capi', modelAKey: 'maxVal', modelB: '&model', modelBKey: 'maxVal' },
                    syncShow: { componentName: 'sync/modelToModel', modelA: '&capi', modelAKey: 'show', modelB: '&model', modelBKey: 'show' },
                    syncAllowEdit: { componentName: 'sync/modelToModel', modelA: '&capi', modelAKey: 'allowEdit', modelB: '&model', modelBKey: 'allowEdit' },
                    syncWithAim: { componentName: 'sync/angleInput', cannonModel: '&cannon.model', inputModel: '&model', aimModel: '&aim.model' },
                    rangeValidator: { componentName: 'validator/range', model: '&model', value: 'val', minValue: 'minVal', maxValue: 'maxVal' },
                    toggle: { componentName: 'sync/toggleClass', model: '&model', renderer: '&renderer', modelKey: 'show', modelKeyValue: true, matching: false, className: 'isHidden' }
                },
                children: {
                    input: {
                        components: {
                            renderer: { componentName: 'ui/htmlRenderer', type: 'input', attributes: { id: 'inputAngle' } },
                            validator: { componentName: 'validator/number' },
                            sync: { componentName: 'sync/modelToInput', renderer: '&renderer', model: '&^.model', modelKey: 'val', validator: '&validator' },
                            toggleFocus: { componentName: 'sync/toggleClass', model: '&^.model', modelKey: 'focused', modelKeyValue: true, renderer: '&renderer', className: 'focused'},
                            syncFocus: { componentName: 'sync/setOnEvent', renderer: '&renderer', model: '&^.model', modelKey: 'focused', eventName: 'focus', value: true },
                            syncBlur: { componentName: 'sync/setOnEvent', renderer: '&renderer', model: '&^.model', modelKey: 'focused', eventName: 'blur', value: false },
                            toggleDisabled: {componentName: 'sync/toggleRendererProperty', models : ['&^.model','&cannon.model'], modelKeys: ['allowEdit','lockSim'], modelKeyValues: [false,true], propertyName: 'disabled', renderer: '&renderer' }
                        }
                    },
                    label: {
                        components: {
                            renderer: { componentName: 'ui/textRenderer', type: 'label', text: 'Cannon Angle (' + String.fromCharCode(176) +')', attributes: { for: 'inputAngle' } }
                        }
                    }
                }
            },
            aimPath: {
                components: {
                    renderer: { componentName: 'ui/htmlRenderer', type: 'canvas', class: 'cannonPath', attributes: { width: 525, height: 500 }  },
                    drawPath: { componentName: 'ui/aimPath', renderer: '&renderer', model: '&aim.model', focusModel: '&exitVelocity.model' },
                    toggle: { componentName: 'sync/toggleClass', model: '&aim.model', renderer: '&renderer', modelKey: 'showGuidelines', modelKeyValue: true, matching: false, className: 'isHidden' }
                }
            },
            anglePath: {
                components: {
                    renderer: { componentName: 'ui/htmlRenderer', type: 'canvas', class: 'anglePath', attributes: { width: 525, height: 500 }  },
                    drawPath: { componentName: 'ui/anglePath', renderer: '&renderer', model: '&aim.model', angleModel: '&angle.model', focusModel: '&angle.model' },
                    toggle: { componentName: 'sync/toggleClass', model: '&aim.model', renderer: '&renderer', modelKey: 'showGuidelines', modelKeyValue: true, matching: false, className: 'isHidden' }
                }
            },
            trajectoryPath: {
                components: {
                    renderer: { componentName: 'ui/htmlRenderer', type: 'canvas', class: 'trajectoryPath', attributes: { width: 525, height: 500 } },
                    drawPath: { componentName: 'ui/drawPath', renderer: '&renderer', angleModel: '&angle.model', velocityModel: '&exitVelocity.model' },
                    togglePath: { componentName: 'sync/toggleVisibility', renderer: '&renderer', model: '&cannon.model', modelKey: 'showBulletPath', modelKeyValue: true }
                }
            },
            boundariesWrapper: {
                components: {
                    renderer: {componentName: 'ui/htmlRenderer', class: 'boundaries'}
                }
            },
            fireButton: {
                components: {
                    renderer: {componentName: 'ui/textRenderer', text: 'FIRE', class: 'fire'},
                    updateFiredBullets: { componentName: 'behaviour/updateFiredBullets', renderer: '&renderer', model: '&cannon.model' },
                    syncFiredBullets: { componentName: 'sync/modelToModel', modelA: '&cannon.capi', modelAKey: 'firedBullets', modelB: '&cannon.model', modelBKey: 'firedBullets' },
                    toggleDisabled: { componentName: 'sync/toggleClass', renderer: '&renderer', model: '&cannon.model', modelKey: 'enableFireButton', modelKeyValue: false, className: 'disabled'},
                    syncEnableFireButton: { componentName: 'sync/modelToModel', modelA: '&cannon.capi', modelAKey: 'enableFireButton', modelB: '&cannon.model', modelBKey: 'enableFireButton' },
                    createCannonBall: { componentName: 'behaviour/createCannonBall', renderer: '&renderer', cannonBallFactory: '+cannonBall', model: '&cannon.model', aimHandle: '&aim.aimHandle' }
                }
            },
            bullets: {
                components: {
                    renderer: {componentName: 'ui/htmlRenderer', class: 'bullets showThree'},
                    syncShowBulletsLeft: {componentName: 'sync/modelToModel', modelA: '&cannon.capi', modelAKey: 'showBulletsLeft', modelB: '&cannon.model', modelBKey: 'showBulletsLeft'},
                    updateBulletsLeft: {componentName: 'behaviour/updateBulletsLeft', renderer: '&renderer', model: '&cannon.model'},
                    toggleBullets: {componentName: 'sync/toggleVisibility', renderer: '&renderer', model: '&cannon.model', modelKey: 'showBulletsLeft', modelKeyValue: true}
                }
            },
            targets: {
                components: {
                    targets: { componentName: 'ui/htmlRenderer', class: 'targets' },
                    targetsCapi: { componentName: 'capi/targets' },
                    targetsModel: { componentName: 'model/targets'},
                    renderer: { componentName: 'ui/htmlRenderer', class: 'bullets showThree' },
                    updateBulletsLeft: { componentName: 'behaviour/updateBulletsLeft', renderer: '&renderer', model: '&cannon.model' },
                    toggleBullets: { componentName: 'sync/toggleVisibility', renderer: '&renderer', model: '&cannon.model', modelKey: 'showBulletsLeft', modelKeyValue: true },
                    syncTargets: { componentName: 'sync/modelToModel', modelA: '&targetsCapi', modelAKey: 'targets', modelB: '&targetsModel', modelBKey: 'targets' },
                    syncShowTooltip: { componentName: 'sync/modelToModel', modelA: '&targetsCapi', modelAKey: 'showTooltip', modelB: '&targetsModel', modelBKey: 'showTooltip' },
                    syncAllowTargetDrag: {componentName: 'sync/modelToModel', modelA: '&targetsCapi', modelAKey: 'allowTargetDrag', modelB: '&targetsModel', modelBKey: 'allowTargetDrag'},
                    syncAllowTooltips: {componentName: 'sync/modelToModel', modelA: '&targetsCapi', modelAKey: 'allowTargetTooltips', modelB: '&targetsModel', modelBKey: 'allowTargetTooltips'},
                    createTarget: { componentName: 'behaviour/createTarget', targetFactory: '+target', renderer: '&targets', targetsModel: '&targetsModel'}
                }
            },
            tooltipCreator: {
                components:{
                    creator: { componentName: "behaviour/tooltipCreator", factory: '+tooltip'}
                }
            }
        }
    };
});
