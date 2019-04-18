function DeviceMotionEvent() {
    this.type = 'devicemotion';
    this.accelerationIncludingGravity = null;
}

var isInit = false;
var registerFunc = _cc.inputManager._registerAccelerometerEvent.bind(_cc.inputManager);
var unregisterFunc = _cc.inputManager._unregisterAccelerometerEvent.bind(_cc.inputManager);

Object.assign(_cc.inputManager, {
    _registerAccelerometerEvent () {
        // register engine AccelerationEventListener to get acceleration data from qg
        registerFunc();
    
        if (!isInit) {
            isInit = true;
            qg.onAccelerometerChange && qg.onAccelerometerChange(function (res) {
                var deviceMotionEvent = new DeviceMotionEvent();
                var resCpy = {};
                resCpy.x = res.x;
                resCpy.y = res.y;
                resCpy.z = res.z;
            
                var gravityFactor = 10;
                resCpy.x *= -gravityFactor;
                resCpy.y *= -gravityFactor;

                deviceMotionEvent.accelerationIncludingGravity = resCpy;
                document.dispatchEvent(deviceMotionEvent);
            });
        } else {
            qg.startAccelerometer && qg.startAccelerometer({
                fail (err) {
                    cc.error('register Accelerometer failed ! err: ' + err);
                },
                // success () { },
                // complete () { },
            });
        }
    },

    _unregisterAccelerometerEvent () {
        // unregister engine AccelerationEventListener
        unregisterFunc();
    
        qg.stopAccelerometer && qg.stopAccelerometer({
            fail (err) {
                cc.error('unregister Accelerometer failed ! err: ' + err);
            },
            // success () { },
            // complete () { },
        });
    },    
});