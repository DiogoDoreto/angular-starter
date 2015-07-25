import angular from 'angular';
import 'angular-material';

angular.module('app', ['ngMaterial'])
.controller('AppCtrl', ['$scope', function ($scope) {
    $scope.myAction = function () {
        alert('World');
    };
}]);

angular.element(document).ready(
    () => angular.bootstrap(document, ['app'])
);

