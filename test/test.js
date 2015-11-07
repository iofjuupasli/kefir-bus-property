var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);
chai.should();

var BusProperty = require('../kefir-bus-property');

describe('kefir-bus-property', function () {
    it('emits last value on subscribe', function () {
        var prop = BusProperty();
        prop.emit('foo');
        var spy = chai.spy();
        prop.onValue(spy);
        spy.should.have.been.called.exactly(1);
        spy.should.have.been.called.with('foo');
    });

    it('emits new value', function () {
        var prop = BusProperty();
        var spy = chai.spy();
        prop.onValue(spy);
        prop.emit('foo');
        spy.should.have.been.called.exactly(1);
        spy.should.have.been.called.with('foo');
    });

    it('emits default value and then new value', function () {
        var prop = BusProperty(function () {
            return 'bar';
        });
        var spy = chai.spy();
        prop.onValue(spy);
        spy.should.have.been.called.exactly(1);
        spy.should.have.been.called.with('bar');
        prop.emit('foo');
        spy.should.have.been.called.exactly(2);
        spy.should.have.been.called.with('foo');
    });

    it('emits last value overriding default', function () {
        var prop = BusProperty(function () {
            return 'bar';
        });
        prop.emit('foo');
        var spy = chai.spy();
        prop.onValue(spy);
        spy.should.have.been.called.exactly(1);
        spy.should.have.been.called.with('foo');
    });
});
