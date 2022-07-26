/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../webpack.dev.config';
import errorHandler from './middleware/error-handler';

const fileupload = require("express-fileupload");
const historyApiFallback = require('connect-history-api-fallback');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const config = require('config');
const https = require('https');
const fs = require('fs');
const Logger = require('./utils/app-logger');
const log = new Logger('app');
const routes = require('./routes/index');

const app = express();
app.get('/healthcheck', (req, res) => {
  res.status(200).send('ok');
});

app.use(cors());
app.use(helmet());
app.use(fileupload());
app.use(express.static("files"));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use('/api', routes);
app.use(historyApiFallback());

if(config.env === 'dev') {
  const compiler = webpack(webpackConfig);
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
    }),
  );
  app.use(webpackHotMiddleware(compiler));
}

const DIST_DIR = __dirname;
app.use('/', express.static(path.join(DIST_DIR, '../../dist/')));
app.use('/static', express.static(path.join(DIST_DIR, '../../public/'), { maxAge: 86400000 }));

if (config.enableHttp) {
  app.listen(config.port, () => {
    log.debug(`Express HTTP server listening on port ${config.port}`);
  });
}

if(config.env === 'prod') {
  try {
    const httpsConfig = {
      cert: fs.readFileSync(process.env.NODE_CERT),
      key: fs.readFileSync(process.env.NODE_KEY),
    };
  
    https.createServer(httpsConfig, app).listen(config.httpsPort, () => {});
  } catch (e) {
    log.error(`Ignoring https server.. ${e}`);
  }
}

app.use(errorHandler(log));
export default app;