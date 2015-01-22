'use strict';

var View = require('ampersand-view');

module.exports = View.extend({
    /**
     * Template placeholder for the view. Feel free to
     * override with your own DOM elements by extending
     * the view, and passing a new template string.
     * @type {String}
     */
    template: '<div class="autoclose-view"></div>',
    /**
     * Set the default properties for the view. Each auto
     * closing view has a duration that it opens for, an
     * active class when it is open, and a hidden class
     * when it is closed.
     * @type {Object}
     */
    props: {
        duration:    ['number', true, 4000],
        activeClass: ['string', true, 'active'],
        hiddenClass: ['string', true, 'hidden']
    },
    /**
     * Set up some events here so we can do view.trigger()
     * instead of having to call the methods directly
     */
    initialize: function() {
        this.listenTo(this, 'reset', this.reset);
        this.listenTo(this, 'stay', this.stay);
        return this;
    },
    /**
     * Renders the view into the DOM and "hides" it.
     */
    render: function() {
        this.renderWithTemplate();
        this.hide();
        return this;
    },
    /**
     * "Hides" the view. Note that you should supplement this
     * with your own CSS; this is so you can animate the view
     * in and out using CSS transitions. Does not start the timer.
     */
    hide: function() {
        this._manageClass(this.hiddenClass, this.activeClass);
        this.trigger('hidden', this);
        this.clear();
        return this;
    },
    /**
     * "Shows" the view. Note that you should supplement this
     * with your own CSS; this is so you can animate the view
     * in and out using CSS transitions. Does not start the timer.
     */
    show: function() {
        this._manageClass(this.activeClass, this.hiddenClass);
        this.trigger('active', this);
        return this;
    },
    /**
     * Reset the timer for the view, keeping it on screen for
     * the duration that was defined.
     */
    reset: function() {
        this.stay();
        this._timeOut = setTimeout(this.hide.bind(this), this.duration);
        return this;
    },
    /**
     * Convenience for clearing the timer and showing the view.
     */
    stay: function() {
        this.show();
        this.clear();
        return this;
    },
    /**
     * Clears the timeout for the view, so that you can
     * (temporarily) override the show/hide behaviour. For example,
     * when you mouse over the view, it could stay in place until
     * you mouse out of it again.
     */
    clear: function() {
        this._timeOut && clearTimeout(this._timeOut);
        return this;
    },
    /**
     * Small helper for adding/removing classes from the element
     * @param  {String} add    Class to add
     * @param  {String} remove Class to remove
     * @private
     */
    _manageClass: function(add, remove) {
        this.el.classList.add(add);
        this.el.classList.remove(remove);
        return this;
    }
});
