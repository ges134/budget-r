const { src, dest } = require('gulp');
const del = require('del');

const modelsPath = '../models/lib';
const frontendPath = '../frontend/src/lib/models';
const backendPath = '../backend/src/models-folder';

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

exports.models = models;
