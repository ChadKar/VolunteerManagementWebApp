
var config = {
    apiKey: "AIzaSyCPvM0PidSAxE5ev5iNGl7qfbVj5vK4zv8",
    authDomain: "stackover-burger.firebaseapp.com",
    databaseURL: "https://stackover-burger.firebaseio.com",
    projectId: "stackover-burger",
    storageBucket: "stackover-burger.appspot.com",
    messagingSenderId: "359154422713"
};

firebase.initializeApp(config);
var database = firebase.database();


// function code beleow

  firebase.initializeApp(config);

//function to save file
function previewFile(){
  var storage = firebase.storage();

  var file = document.getElementById("files").files[0];
    console.log(file);

  var storageRef = firebase.storage().ref();

  //dynamically set reference to the file name
  var thisRef = storageRef.child(file.name);

  //put request upload file to firebase storage
  thisRef.put(file).then(function(snapshot) {
    console.log('Uploaded a blob or file!');
});

  //get request to get URL for uploaded file
  thisRef.getDownloadURL().then(function(url) {
  console.log(url);
  })

  }


// second code here
(function() {
  var app = angular.module('ngUpload', [ ]);
  app.controller('UploadController', ['$http', function($http) {
    //for refering inside functions
    var vm = this;
    vm.status = true;
    vm.message = '';
    vm.deviceId = '';

    var httpPost = function(results) {
      vm.deviceId = results[0]["Device ID"];
      var req = {
        method: 'POST',
        url: 'https://requestb.in/13hsi3y1',
        headers: {
          'Content-Type': undefined
        },
        data: results
      }
      $http(req).then(function(){
        console.log('Posted successfully.');
      }, function(){
        console.log('$http error?!');
      });
    }

    vm.button = function() {
      if(vm.status) {
        //upload
        var f = document.getElementById('file').files[0];

        try {
          if(csvTypes.indexOf(f.type) > -1) {
            vm.message = f.name + ' uploaded successfully.';

            Papa.parse(f, {
              header: true,
              skipEmptyLines: true,
              dynamicTyping: true,
              complete: function(results, file) {
                console.log("Parsing complete:", results);
                httpPost(results.data);
              }
            });
            console.log('Posting...');
          } else {
            vm.message = f.name + ' is not supported.'
          }
          vm.status = !vm.status;
        }
        catch (e) {
          console.log(e);
          alert('Select a file!');
        }
      } else {
        //clear
        vm.message = '';
        f = {};
        document.getElementById('file').value = null;
        vm.status = !vm.status;
      }
    };
  }]);

  app.controller('QueryController', [ ]);

  //CSV types.
  var csvTypes = ['application/csv', 'text/csv','text/comma-separated-values', 'application/vnd.ms-excel'];

})();
