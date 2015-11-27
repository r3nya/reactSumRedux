You should have browserify installed, then:

    npm install

And:

    browserify reactSum.jsx -o reactSum.js -t [ babelify --presets [  react es2015 ] ]
