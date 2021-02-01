## First step

In the first step you need to install webpack by 
`npm install webpack webpack-cli --save-dev`

After webpack is installed you can create the `src` folder which contains the "source" code.
To make this a working solution you need to add `webpack.config.js` containing basic build information structured like this: 

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```
This config contains the entrypoint of the project called `index.js` which needs to be resolved with `path` which is an build in dependency of Node.
To build the project you will need to add the `"build": "webpack"` script to the `package.json`.
You can run the `build` script by using the following command `npm run build`. 
This will output a dist folder which can be used by a webserver.

## Second step

To create a actual project which can be shown in a browser you can make use of plugins like the HtmlWebpackPlugin which can be installed with the following command: `npm install html-webpack-plugin@next --save-dev`.
HtmlWebpackPlugin simplifies management of HTML files to serve `webpack` bundles.

Adding the following configuration to the webpack config will automatically move the `index.html` file to the dist folder when building the project.
```js
new HtmlWebpackPlugin({
    template: 'src/index.html',
    inject: false
})
```

## Third step

This step is about setting up an development environment. For development purposes it's nice to have things like hot-reloading and a builtin webserver.

You can install the webpack-dev-server with the following command: `npm install --save-dev webpack-dev-server`.
To enable the webserver you need to add the following lines to the `webpack.config.js` 

```js
devServer: {
    contentBase: './dist',
    open: true
},
```

To turn on the development environment within webpack you need to add `mode: 'development` to the `webpack.config.js`.
To make debugging a lot easier you can enable inline source maps. This will add mappings to the original code while debugging from a browser. You can do this by adding `devtool: 'inline-source-map'` to `webpack.config.js`

Finally you need to add a new command to `package.json` to serve the website directly from a webserver. This can be done by adding `"start": "webpack serve",` to the `package.json`.

When you run `npm run start` your terminal will open your default browser with the development build of the project.


## Fourth step

This step is about adding npm packages which are dependencies which can be used inside the project. The main idea is to create a sort of a jukebox where you can drag in Disney songs.

For importing css files into webpack you will need to have a loader called `style-loader`. To add styling you need to create a folder called `styles` into the `src` folder. Styles can be of whatever type of styling you want. i.e. `CSS, SCSS, LESS`. For this demo usage I preferred to stick with CSS.

To make life easier I looked for a solution where you can play songs via Spotify. With Spotify you can use it's Web Playback SDK to convert your browser into a player.
I choose to use the Spotify API to give the SDK superpowers 🚀 to play songs. 
