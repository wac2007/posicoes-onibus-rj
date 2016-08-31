angular.module('app', ['uiGmapgoogle-maps'])
.config(function(uiGmapGoogleMapApiProvider) {
  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyA_PGXFWF7lDsDoQOCMFpSdRu41Ow1ow00',
    v: '3.24', //defaults to latest 3.X anyhow
    libraries: 'weather,geometry,visualization'
  });
})
.controller('LineController', function($scope, $http, uiGmapGoogleMapApi){

  $scope.createPoints = function(data){
    $scope.map.positions = [];
    angular.forEach(data, function(v, k){
      var myLatLng = {latitude: v[3], longitude: v[4]};
      var obj = {
        id: v[1],
        coords: myLatLng
      };
      $scope.map.positions.push(obj);
      var data = moment(v[0]+'Z', 'MM-DD-yyyy HH:mm:ssZ').tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm z');
      // var marker = new google.maps.Marker({
      //   position: myLatLng,
      //   map: map,
      //   title: data
      // });
    });
    // console.log('map', $scope.map);
  };

  $scope.getData = function (){
    $http.get('http://dadosabertos.rio.rj.gov.br/apiTransporte/apresentacao/rest/index.cfm/obterPosicoesDaLinha/'+$scope.map.number)
    .success(function(data){
      console.log('DATA', data);
      $scope.createPoints(data.DATA);
    });
  };

  $scope.map = {
    center: {
      latitude: -23.00010,
      longitude: -43.3998200
    },
    zoom: 10,
    positions: [],
    number: '315',
  };

  $scope.position = {
    id: 'C41028',
    position: {
      latitude: -22.905788,
      longitude: -43.197826
    }
  };

  uiGmapGoogleMapApi.then(function(maps) {
    // alert('ready');
    $scope.getData();
  });
});
