# ampersand-auto-closing-view [![Build Status](https://travis-ci.org/ben-eb/ampersand-auto-closing-view.svg?branch=master)][ci] [![NPM version](https://badge.fury.io/js/ampersand-auto-closing-view.svg)][npm] [![Dependency Status](https://gemnasium.com/ben-eb/ampersand-auto-closing-view.svg)][deps]

> A view that closes itself after a certain period of time.

Install via [npm](https://npmjs.org/package/ampersand-auto-closing-view):

```
npm install ampersand-auto-closing-view --save
```

## Example

A simple example might be to show a prompt each time the user moves his/her
mouse. It could look like this:

```js
var View   = require('ampersand-view');
var ACView = require('ampersand-auto-closing-view');

// Extend the view so that we can have custom HTML instead
var MyACView = ACView.extend({
    template: '<h1>Hello, world!</h1>'
});

var MyView = View.extend({
    template: '<div class="container"><div class="prompt"></div></div>',
    events: {
        'mousemove': 'reset'
    },
    reset: function() {
        this.acView.trigger('reset');
    },
    render: function() {
        this.renderWithTemplate();
        this.acView = new MyACView();
        this.renderSubview(this.acView, '.prompt');
    }
});

var myView = new MyView({ el: document.body });
myView.render();

```

We can go a little further with this, and keep the view persisted whilst the
user has his/her mouse over our custom view:

```js
var MyACView = ACView.extend({
    template: '<h1>Hello, world!</h1>'
    events: {
        'mousemove': 'onMouseMove',
        'mouseout' : 'onMouseOut'
    },
    onMouseMove: function(e) {
        e.stopPropagation();
        this.trigger('stay');
    },
    onMouseOut: function(e) {
        e.stopPropagation();
        this.trigger('reset');
    }
});
```

Note that this module leaves the hide/show implementation up to you - at its
most simple, you can define these two classes in your CSS file:

```css
.hidden {
    display: none;
}

.active {
    display: block;
}
```

Or, make it look a little smoother by defining a transition between the two
states:

```css
.prompt {
    position: absolute;
    left: 0;
    top: 0;
    width: 200px;
    height: 100%;
    background: #222;
    transition: transform .2s ease;
}

.prompt.hidden {
    transform: translateX(-200px);
}
```

## API

`ampersand-auto-closing-view` is itself an [ampersand-view][amp-view] so you can
extend it to add additional functionality. This is recommended as this module
provides only a skeleton view which you can then fill with your own content.

### new ACView(options)

Construct a new auto closing view with an options object. The following options
are supported:

#### duration
##### type: `Number`
##### default: `4000`

The duration, in milliseconds, that the element should be shown for.

#### activeClass
##### type: `String`
##### default: `active`

The class name to use whilst the element is active.

#### hiddenClass
##### type: `String`
##### default: `hidden`

The class name to use whilst the element is hidden.

### ACView.hide()

"Hides" the view. Note that you should supplement this with your own CSS; this
is so you can animate the view in and out using CSS transitions. Does not start
the timer.

### ACView.show()

"Shows" the view. Note that you should supplement this with your own CSS; this
is so you can animate the view in and out using CSS transitions. Does not start
the timer.

### ACView.reset()

Reset the timer for the view, keeping it on screen for the duration that was
defined (default is 4 seconds). Note that you can also do
`ACView.trigger('reset')`.

### ACView.stay()

Convenience for clearing the timer and showing the view with a single method
call. Note that you can also do `ACView.trigger('stay')`.

### ACView.clear()

Clears the timeout for the view, so that you can (temporarily) override the
show/hide behaviour. For example, when you mouse over the view, it could stay in
place until you mouse out of it again.

## Contributing

Pull requests are welcome. If you add functionality, then please add unit tests
to cover it.

## License

MIT © Ben Briggs

[amp-view]: https://github.com/AmpersandJS/ampersand-view
[ci]:       https://travis-ci.org/ben-eb/ampersand-auto-closing-view
[deps]:     https://gemnasium.com/ben-eb/ampersand-auto-closing-view
[npm]:      http://badge.fury.io/js/ampersand-auto-closing-view
