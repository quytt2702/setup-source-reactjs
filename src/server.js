import React from 'react';
import {routes} from 'base/routes';
import {store} from 'base/reducers';
import ReactDOMServer from 'react-dom/server';
import { createServer } from 'http';
import { Provider } from 'react-redux';
import { RenderRoutes } from 'base/routes';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import { StaticRouter as Router, Switch, Route, withRouter, Redirect, matchPath } from 'react-router-dom';
import path from 'path';
import fs from 'fs';
import ejs from 'ejs';
import express from 'express';
import { Server } from 'http';
import { parse as parseUrl } from 'url';
import CONFIG from 'base/constants/config';

export default {
  run: function() {

    const context = {};

    let PORT = process.env.PORT || 3000;

    const staticFiles = [
      '/*.png',
      '/*.jpg',
      '/*.jpeg',
      '/*.svg',
      '/*.ttf',
      '/*.css',
      '/*.js'
    ];

    const app = express();
    const server = new Server(app);

    app.use(express.static('/../build'));
    app.set('view engine', 'ejs');

    staticFiles.forEach(file => {
      app.get(file, (req, res) => {
        const filePath = path.resolve(`build${req.url}` );
        res.sendFile( filePath );
      });
    });



    app.get('*', (req, res) => {
      let error = () => {
        res.writeHead(404);
        res.write('Error');
        res.end();
      }

      const url = req.originalUrl || req.url
      const location = parseUrl(url)

      loadOnServer({ store, location, routes })
        .then(() => {
          const context = {};

          const generatedContent = ReactDOMServer.renderToString(
            <Provider store={store} key="provider">
              <Router
                location={req.url}
                context={context}
              >
                <ReduxAsyncConnect routes={routes} />
              </Router>
            </Provider>
          );

          let { SEO } = store.getState();

          const {title, description, image} = SEO;
          let url = ``;

          let fb_appId = CONFIG.FB_ID;
          const sitename = "YOUR_SITE_NAME"

          if (context.url) {
            res.writeHead(301, {
              Location: context.url
            })
            res.end()
          } else {
            let fs = require('fs');
            let data = fs.readFileSync('./build/manifest.json');
            let manifest = JSON.parse(data);

            let jsFile = '/' + manifest['app.js'];
            let jsVendorFile = '/' + manifest['vendor.js'];
            let cssFile = '/' + manifest['app.css'];

            (ejs.renderFile(
              path.resolve('./ssr-index.ejs' ),
              {
                generatedContent,
                jsFile,
                jsVendorFile,
                cssFile,

                title,
                description,
                image,
                url,
                sitename,
                fb_appId
              }, {},
              function(err, str) {
                if (err) {
                  console.log(err);
                }

                res.writeHead(200);
                res.write(str);
                res.end();
              })
            );
          }
        }
      );

    });

    server.listen(PORT, function() {
      console.log(`Listening at http://localhost:${server.address().port}`);
    });
  }
}
