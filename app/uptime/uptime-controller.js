angular.module('uptime-controller', ['ngResource'])
  .controller('UptimeController', ['$scope', '$resource', '$interval', function($scope, $resource, $interval) {
    var Uptime = $resource('/api/uptime');

    $scope.refreshUptime = function() {
      $scope.uptimeData = Uptime.get();
    };

    // 초기 데이터 로드
    $scope.refreshUptime();

    // 5분(300000 밀리초)마다 자동 새로고침
    var autoRefresh = $interval($scope.refreshUptime, 300000);

    // 컨트롤러가 파괴될 때 interval을 정리합니다.
    $scope.$on('$destroy', function() {
      if (autoRefresh) {
        $interval.cancel(autoRefresh);
      }
    });

    // 수동 새로고침 기능 유지
    $scope.manualRefresh = function() {
      $scope.refreshUptime();
    };
  }]);
