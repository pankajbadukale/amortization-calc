import 'bootstrap/dist/css/bootstrap.css';

import angular from 'angular';
import template from './template.html';
import controller from './controller';

angular.module('calc', [])
  .component('calculator', {template,controller});
