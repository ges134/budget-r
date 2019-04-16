const {
  src,
  dest
} = require('gulp');
const del = require('del');
const fs = require('fs');
const uuidV1 = require('uuid/v1');

const modelsPath = '../models/lib';
const frontendPath = '../frontend/src/lib/models';
const backendBasePath = '../backend/src';
const backendPath = `${backendBasePath}/models-folder`;
const backendConfigPath = `${backendBasePath}/config`;

const baseCopy = () => src(`${modelsPath}/**/*`);

async function models(cb) {
  console.log('deleting models in frontend folder');
  await del(`${frontendPath}/**`, {
    force: true
  });

  console.log('deleting models in backend folder');
  await del(`${backendPath}/**`, {
    force: true
  });

  console.log('transpiling model in the backend folder');
  baseCopy().pipe(dest(backendPath));

  console.log('transpiling models in the frontend folder');
  baseCopy().pipe(dest(frontendPath));

  cb();
}

async function ciFakeConfig(cb) {
  const knexFileName = 'knexConfig.ts';
  const jwtFileName = 'jwtConfig.ts';
  const fakePassword = uuidV1();
  const fakeSecret = uuidV1();

  console.log('creating the templates');
  const knexTemplate =
    `export const knexConfig = {
    database: 'budgetr',
    host: '127.0.0.1',
    password: '${fakePassword}',
    user: 'ci'
  };`;

  const JwtTemplate = `export const jwtConfig = {
  secret: '${fakeSecret}'
  options: {
    expiresIn: '1h'
  }
  };`;

  console.log('creating the fake files');
  fs.writeFileSync(`${backendConfigPath}/${knexFileName}`, knexTemplate);
  fs.writeFileSync(`${backendConfigPath}/${jwtFileName}`, JwtTemplate);

  cb();
}

exports.models = models;
exports.ciFakeConfig = ciFakeConfig;