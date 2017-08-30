ShoppingList
=====================

## Using this project

You'll need the Ionic CLI with support for v2 apps:

```bash
$ npm install -g ionic
```

Then run:

```bash
$ ionic start myApp
```

More info on this can be found on the Ionic [Getting Started](http://ionicframework.com/docs/v2/getting-started/) page.

```ionic serve```



OK, to install everything:

```npm i```

It can be necessary:
```cordova plugin add cordova-plugin-console```
```cordova plugin add cordova-plugin-device```
```cordova plugin add cordova-plugin-splashscreen```
```cordova plugin add cordova-plugin-statusbar```
```cordova plugin add cordova-plugin-whitelist```
```cordova plugin add cordova-sqlite-storage```
```cordova plugin add ionic-plugin-keyboard```
  
  
To run on PC
```ionic serve```
  
To run on android
```ionic run android```

*FAQ*

If in console there's an error with 'indexOf' when ```ionic serve``` runs, please update modules to the specific versions:
```npm i @ionic/storage@1.1.7```
```npm install webpack@2.1.0-beta.28```

 - If you'll only update @ionic/storage 1.17 it will throw an error/warning: 
`build dev failed: Cannot set property 'fileSystem' of null.`
But if you'll only update webpack it will throw the same error with indexOf after transpiling.

 - On Linux node-sass library can be updated with `npm rebuild node-sass` command.

 - after `android run build` and after installing apk file it throws an error INSTALL_FAILED_UPDATE_INCOMPATIBLE. It may be caused by trying to build the app in different OS than before. You may want to uninsall the package to run it again.

/Versions of libraries installed on working environment:
+-- @angular/common@2.2.1
+-- @angular/compiler@2.2.1
+-- @angular/compiler-cli@2.2.1
| +-- @angular/tsc-wrapped@0.3.0
| +-- minimist@1.2.0
| `-- reflect-metadata@0.1.9
+-- @angular/core@2.2.1
+-- @angular/forms@2.2.1
+-- @angular/http@2.2.1
+-- @angular/platform-browser@2.2.1
+-- @angular/platform-browser-dynamic@2.2.1
+-- @angular/platform-server@2.2.1
| `-- parse5@2.2.3
+-- @ionic/app-scripts@0.0.47
| +-- autoprefixer@6.4.1
| +-- chalk@1.1.3
| +-- chokidar@1.6.1
| +-- clean-css@3.4.19
| +-- cross-spawn@4.0.0
| +-- express@4.14.0
| +-- fs-extra@0.30.0
| +-- glob@7.1.1
| +-- json-loader@0.5.4
| +-- node-sass@3.10.1
| +-- os-name@2.0.1
| +-- postcss@5.2.0
| +-- proxy-middleware@0.15.0
| +-- rollup@0.36.4
| +-- rollup-plugin-commonjs@5.0.5
| +-- rollup-plugin-json@2.0.2
| +-- rollup-plugin-node-builtins@2.0.0
| +-- rollup-plugin-node-globals@1.0.9
| +-- rollup-plugin-node-resolve@2.0.0
| +-- rollup-pluginutils@1.5.2
| +-- tiny-lr@1.0.3
| +-- tslint@3.15.1
| +-- tslint-eslint-rules@1.5.0
| +-- uglify-js@2.7.3
| +-- webpack@2.1.0-beta.28
| +-- ws@1.1.1
| `-- xml2js@0.4.17
+-- @ionic/cloud-angular@0.9.1
| +-- @ionic/cloud@0.15.1
| `-- rxjs@5.1.0
+-- @ionic/storage@1.1.7
| +-- @types/localforage@0.0.30
| +-- localforage@1.4.3
| `-- localforage-cordovasqlitedriver@1.5.0
+-- ionic-angular@2.0.0-rc.4
+-- ionic-native@2.2.11
+-- ionic-push-server@1.1.1 extraneous
+-- ionicons@3.0.0
+-- rxjs@5.0.0-beta.12
| `-- symbol-observable@1.0.4
+-- typescript@2.0.9
`-- zone.js@0.6.26
