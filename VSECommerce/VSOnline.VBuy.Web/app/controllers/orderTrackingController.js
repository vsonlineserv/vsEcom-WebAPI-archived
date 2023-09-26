////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
//</copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce
///////////////////////////////////////////////////////////////////////////////////////////

app.controller('orderTrackingController', ['$rootScope', '$scope', '$http', '$routeParams', 'orderTrackingService', 'authInterceptorService',
function ($rootScope, $scope, $http, $routeParams,orderTrackingService, authInterceptorService) {
    {

       
        $scope.TrackOrdersList = {};
        $scope.TotalOrdersList = {};
        $scope.TotalProductList = {};
        $scope.ProductList= {};
        function initializeTrackingOrder() {

            orderTrackingService.getTrackingOrders($scope, $http)
              .then(function (response) {

                  $scope.TrackOrdersList = response.data;
                  
                //  GetOrders();
              },
              function (err) {


              });
            orderTrackingService.GetOrdersList($scope, $http)
           .then(function (response)
           {
               $scope.TotalOrdersList = response.data;
              
           },
           function (err) {
             
           });
         
            $scope.message = "";
            $scope.model ="Order Details";
           
        }
        initializeTrackingOrder();
     
    }
 

    $scope.OrderPagination=function(count)
    {
        var page =count;
        orderTrackingService.PagingOrders($scope, $http,page)
       .then(function (response) {
           $scope.TrackOrdersList = response.data;
      
       },
       function (err) {
         
       });

    }
    $scope.orderedProducts=function(orders)
    {
        $scope.ProductList = null;
        var btnText=$scope.model;
        var orderId =orders.Id;
        orderTrackingService.GetProductList($scope, $http, orderId)
         .then(function (response) {
           
             
             $scope.ProductList = response.data;
            
         },
         function (err) {
             
         });
    }
    $scope.CancelOrders=function(orders)
    { 
        var flagCancelOrder = window.confirm('Are you sure you want to Cancel Order? \n Order Number : ' + orders.Id + '\n Number of products: ' + orders.NumberOfProducts
            + '\n Order Status: ' + orders.OrderStatus + '\n Order Total: ' + orders.OrderTotal);
        if (flagCancelOrder) {

            var orderId = orders.Id;

            orderTrackingService.CancelOrders($scope, $http, orderId)
             .then(function (response) {

                 if (response.data === true) {
                     $scope.savedSuccessfully = true;
                     $scope.message = "Order Number " + orderId + " Cancelled";
                     loadOrderList();
                 }
                 else {
                     $scope.savedSuccessfully = false;
                     $scope.message = "Error Cancelled " + orderId;
                 }

             },
             function (err) {

             });
        }
    }

    function loadOrderList()
    {
        orderTrackingService.getTrackingOrders($scope, $http)
              .then(function (response) {

                  $scope.TrackOrdersList = response.data;                  
              //    GetOrders();
              },
              function (err) {


              });
    }

    $scope.getISTDate = function(orderDateUtc)
    {
        var IST = new Date(orderDateUtc + 'Z'); // Clone UTC Timestamp
       // IST.setHours(IST.getHours() + 5); // set Hours to 5 hours later
        //IST.setMinutes(IST.getMinutes() + 30);
        return IST;
    }

    $scope.SearchOrders = function (search,event)
    {
       
        var orderId =search.OrderId;
        if (orderId ==null) {
            orderId=0;
        }
        if (orderId > 0) {
            orderTrackingService.SearchOrders($scope, $http, orderId)
             .then(function (response) {
                 $scope.TrackOrdersList = response.data;

             },
             function (err) {

             });
        }
        else
        {
            initializeTrackingOrder();
        }
    }
}]);