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