 ////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
//</copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce
///////////////////////////////////////////////////////////////////////////////////////////
 app.service('categoryService', function () {

     //var endPoint = '/VSECommerce/api/Admin';
     var endPoint = 'http://localhost:49475/api/Admin';

    this.getAllCategory = function ($scope, $http) {
        var config = {
            headers: { "CommandType": "GetAllCategory" }
        };
        $scope.app = {};
        $http.get(endPoint, config)
         .success(function (data, status, headers) {
             $scope.app.category = data;             
         }).error(function () {
             $scope.app.error = 'something\'s broken';
         });;
        return $scope.app.category;
    };


});