'use strict';

var View = require('./'),
    test = require('tape');

function setup(opts) {
    var view = new View(opts || {});
    view.render();
    return view;
}

/**
 * Polyfill bind for phantomjs
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
 */

if (!Function.prototype.bind) {
    Function.prototype.bind = function(oThis) {
        var aArgs   = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP    = function() {},
            fBound  = function() {
                return fToBind.apply(oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}

test('should have a valid duration', function(t) {
    var view = setup();
    t.throws(function() {
        view.duration = '4 seconds';
    }, 'should be an integer');
    t.end();
});

test('should be hidden when first rendered', function(t) {
    var view = setup();
    t.equal(view.el.className, 'autoclose-view hidden');
    t.end();
});

test('should have a show method', function(t) {
    var view = setup();
    view.show();
    t.equal(view.el.className, 'autoclose-view active');
    t.end();
});

test('should have a hide method', function(t) {
    var view = setup();
    view.show();
    view.hide();
    t.equal(view.el.className, 'autoclose-view hidden');
    t.end();
});

test('should automatically close', function(t) {
    t.plan(2);
    var view = setup({ duration: 50 });
    view.reset();
    t.equal(view.el.className, 'autoclose-view active');
    setTimeout(function() {
        t.equal(view.el.className, 'autoclose-view hidden');
    }, 75);
});

test('should automatically close, with triggers', function(t) {
    t.plan(2);
    var view = setup({ duration: 50 });
    view.trigger('reset');
    t.equal(view.el.className, 'autoclose-view active');
    setTimeout(function() {
        t.equal(view.el.className, 'autoclose-view hidden');
    }, 75);
});

test('should cancel the timer and stay on screen', function(t) {
    t.plan(1);
    var view = setup({ duration: 50 });
    view.trigger('reset');
    setTimeout(function() {
        view.stay();
    }, 25);
    setTimeout(function() {
        t.equal(view.el.className, 'autoclose-view active');
    }, 75);
});

test('should cancel the timer and stay on screen, with triggers', function(t) {
    t.plan(1);
    var view = setup({ duration: 50 });
    view.trigger('reset');
    setTimeout(function() {
        view.trigger('stay');
    }, 25);
    setTimeout(function() {
        t.equal(view.el.className, 'autoclose-view active');
    }, 75);
});
