(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        /* global define */
        define(['kefir-bus'], factory);
    } else if (typeof exports === 'object') {
        /* global module, require */
        module.exports = factory(require('kefir-bus'));
    } else {
        root.KefirBusProperty = factory(root.KefirBus);
    }
}(this, function (KefirBus) {
    return function PropertyBus(getInitial) {
        var bus = KefirBus();
        var property = bus
            .toProperty(getInitial)
            .onValue(function () { /* activate */ });

        [
            'emit',
            'error',
            'emitEvent',
            'plug',
            'unplug',
            'end'
        ].forEach(function (methodName) {
            property[methodName] = bus[methodName];
        });

        return property;
    }
}));
