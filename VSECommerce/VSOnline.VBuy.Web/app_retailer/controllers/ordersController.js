 ////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
//</copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce
///////////////////////////////////////////////////////////////////////////////////////////

app_retailer.controller('ordersController', ['$rootScope', '$scope', '$http','$route', '$routeParams','$filter',
    'ordersService', 'storesService', 'ngTableParams', 'authInterceptorService',
function ($rootScope, $scope, $http,$route, $routeParams, $filter, ordersService, storesService,ngTableParams, authInterceptorService) {

        $scope.RetailerInfo = {};
        $scope.filters = {};
        $scope.message = '';
        $scope.pendingOrdersList = {};
        $scope.filteredOrdersList = {};
        $scope.OrderStatusList = {};
        $scope.PaymentOptionList = {};

        $scope.pageButtonList = [];
        $scope.currentPage = 0;
        var pageSize =100000;
        var pageNo = 1;
        $scope.pagenumbers = 0;

            function initializeOrderStores()
            {
                
                storesService.getRetailerInfo($http)
                .then(function (response) {
                    $rootScope.flagLoggedIn = true;
                    $scope.RetailerInfo = response.data;
                    $rootScope.RetailerInfo = response.data
                    $rootScope.StoreName = $scope.RetailerInfo.StoreName;
                },
             function (err) {
                 $scope.message = err.error_description;
                 $rootScope.flagLoggedIn = false;
             });

                storesService.getFilter($http)
                .then(function (response) {
                    $scope.filterList = response.data
                    loadDefaultFilterValues();
                },
             function (err) {
                 $scope.message = err.error_description;
             });         
             
            }

            var loadDefaultFilterValues = function () {
                if ($rootScope.RetailerInfo.Branches.length > 0) {
                    if (!($rootScope.filters.selectedBranchId > 0) || !$rootScope.filters.selectedBranchId) {
                        $rootScope.filters.selectedBranchId = $rootScope.RetailerInfo.Branches[0].BranchId;
                    }
                }

                if ($scope.filterList.CategoryFilter.length > 0) {
                    //change the logic later by saved filters.
                    $scope.filters.selectedCategory = $scope.filterList.CategoryFilter[0].CategoryId;

                }
                var branch = $rootScope.filters.selectedBranchId;
                getOrderStatus();
                GetPaymentOption();
                    GetTotalOrders(branch);
                    GetPendingOrders(branch, pageSize, pageNo);
                }
                  
            var GetPendingOrders = function (branch, pageSize, pageNo)
        {             
                ordersService.getPendingOrders($scope, $http, branch, pageSize, pageNo)
            .then(function (response) {
                $scope.pendingOrdersList = response.data;
                $scope.pendingOrdersGridParams.reload();
            },
            function (err) {
            

            });
            }
            var GetTotalOrders = function (branch) {
              
                ordersService.GetTotalOrders($scope, $http, branch)
                .then(function (response) {
                    $scope.TotalOrdersList = response.data;

                },
                function (err) {


                });
            }
             
        $scope.pendingOrdersTabClick=function()
        {
            var branch = $rootScope.filters.selectedBranchId;
            $scope.pageButtonList = [];
            GetPendingOrders(branch,pageSize, pageNo);
        }
        var getOrderStatus=function()
        {
            ordersService.getOrderStatus($scope, $http)
            .then(function (response) {           
                $scope.OrderStatusList = response.data;

            },
            function (err) {
            

            });
        }
        $scope.GetOrdersPage = function (obj)
        {
            var pageNo=obj.target.attributes.data.value;
            var branch = $rootScope.filters.selectedBranchId;
            GetPendingOrders(branch, pageSize, pageNo);
        }
        var GetPaymentOption = function ()
        {
          
            ordersService.GetPaymentOption($scope, $http)
                        .then(function (response) {
                            $scope.PaymentOptionList = response.data;

                        },
                        function (err) {
                      

                        });
        }
            initializeOrderStores();

        $scope.changeOrderStatus = function (orders) {
            var changeStatus = window.confirm("Proceed with changing Order Status? \n SubOrder Number : " + orders.Id + "\n Order Number : " + orders.OrderId);
            if(changeStatus)
            {
                ordersService.UpdateOrderStatus($scope, $http, orders.Id, orders.OrderId, orders.OrderItemStatusId)
                .then(function (response) {
                    if (response.data == "true")
                        $scope.pendingOrdersTabClick();
                    $scope.pendingOrdersGridParams.reload();
                    $scope.message = orders.Id + " / " + orders.OrderId + " Status Changed.";
                    $scope.savedSuccessfully = true;
                });
            }
        
        }
        $scope.changePaymentStatus = function (orders) {
        $scope.orderPaymentStatusId = orders.OrderItemStatusId;
        ordersService.UpdatePaymentStatus($scope, $http);
    }

    $scope.SearchOrders = function (order)
    {
        var branch = $rootScope.filters.selectedBranchId;

        if ((!order.status || order.status == "") && !(order.id>0))
        {
            GetPendingOrders(branch, pageSize, pageNo)
            return;
        }
        var orderStatus = order.status;
        var paymentStatus = order.payment;
      var orderid = order.id;
        if (orderid==null)
        {
            orderid =0;
        }
        if (orderStatus==null) {
            orderStatus = 0;
        }
        if (order.payment==null)
        {
            paymentStatus =0;
        }
        ordersService.getOrderSearch($scope, $http, branch, orderStatus, orderid, paymentStatus)
       .then(function (response) {
           $scope.pendingOrdersList = response.data;
           $scope.pendingOrdersGridParams.reload();
       },
       function (err) {
         
       });
       
    }
    var range = function () {
        var rangeSize = 4;
        var start;

        start = $scope.currentPage;
        if ($scope.pagenumbers < 4) {
            $scope.pageButtonList = [];
            for (var i = start; i <= $scope.pagenumbers; i++) {

                $scope.pageButtonList.push(i);

            }
        }
        else {
            if (start > $scope.pagenumbers - rangeSize) {

                start = $scope.pagenumbers - rangeSize + 1;

            }
            $scope.pageButtonList = [];
            for (var i = start; i < start + rangeSize; i++) {

                $scope.pageButtonList.push(i);

            }
        }
       


    }

    $scope.prevPage = function () {

        if ($scope.currentPage > 0) {
            var pageno = $scope.currentPage - 1;
            var branch = $rootScope.filters.selectedBranchId;
            GetPendingOrders(branch, pageSize, pageno);
            $scope.currentPage--;
            range();

        }
    };

    $scope.DisablePrevPage = function () {

        return $scope.currentPage === 0 ? "disabled" : "";

    };
    var pageCount = function () {

        $scope.pagenumbers = Math.ceil($scope.TotalOrdersList.length / pageSize) - 1;

    };
    $scope.nextPage = function () {

        if ($scope.currentPage < $scope.pagenumbers) {
            var pageno = $scope.currentPage + 1;
            var branch = $rootScope.filters.selectedBranchId;
            GetPendingOrders(branch, pageSize, pageno);
            $scope.currentPage++;
            range();

        }
    };
    $scope.DisableNextPage = function () {

        return $scope.currentPage === $scope.pagenumbers ? "disabled" : "";

    };
    $scope.setPage = function (n) {
        var pageno = n + 1;
        var branch = $rootScope.filters.selectedBranchId;
    
        GetPendingOrders(branch,pageSize,pageno)
        $scope.currentPage = n;

    };
  
   $scope.pendingOrdersGridParams = new ngTableParams({
       page: 1,            // show first page
       count: 10,        // count per page

   },
       {
           counts: [10, 25, 50, 100],
           total: angular.isUndefined($scope.pendingOrdersList.length) ? 0 : $scope.pendingOrdersList.length,
           getData: function ($defer, params) {
               $scope.filteredOrdersList = params.sorting() ? $filter('orderBy')($scope.pendingOrdersList, params.orderBy()) : $scope.pendingOrdersList;
               $scope.filteredOrdersList = params.filter() ? $filter('filter')($scope.filteredOrdersList, params.filter()) : $scope.filteredOrdersList;               
               if ($scope.filteredOrdersList && $scope.filteredOrdersList.length > 0) {
                   params.total($scope.filteredOrdersList.length);
                   params.totalPage = (Math.ceil($scope.filteredOrdersList.length / params.count()));
                   $scope.filteredOrdersList = $scope.filteredOrdersList.slice((params.page() - 1) * params.count(), params.page() * params.count());
                   $defer.resolve($scope.filteredOrdersList);
               }
               else {
                   params.total($scope.pendingOrdersList.length);
                   params.totalPage = (Math.ceil($scope.pendingOrdersList.length / params.count()));
                   $defer.resolve($scope.pendingOrdersList);
               }

           }
       });

   $rootScope.onBranchChange = function () {
       $route.reload();
   }

   $scope.getLocalDate = function (dateUtc) {
       var LOCALTIME = new Date(dateUtc + 'Z'); // Clone UTC Timestamp
       return LOCALTIME;
   }
}]);


app_retailer.controller('PrintOrderController', ['$scope', '$location', '$http', '$rootScope', '$routeParams', 'ordersService',
function ($scope, $location, $http, $rootScope, $routeParams, ordersService) {

    $scope.message = '';
    $scope.orderConfirmationDate = {};

    InitializePrintOrder();
    function InitializePrintOrder() {

        ordersService.printOrderDetails($http, $routeParams.orderId)
                   .then(function (response) {
                       if (response.data) {
                           $scope.printorderDetails = response.data;
                            

                           var IST = new Date($scope.printorderDetails.OrderDetails.OrderDateUtc + 'Z'); // Clone UTC Timestamp                           
                           $scope.orderConfirmationDate = IST;
                       }
                   });
    }

}]);


app_retailer.controller('dashboardController', ['$rootScope', '$scope', '$http', '$route', '$routeParams', '$filter',
    'ordersService', 'storesService', 'authInterceptorService',
function ($rootScope, $scope, $http, $route, $routeParams, $filter, ordersService, storesService, authInterceptorService) {

    $scope.RetailerInfo = {};
    $scope.filters = {};
    $scope.message = '';

    $scope.orderSummaryList = {};
    $scope.OrderStatusList = {};
    $scope.PaymentOptionList = {};
    $scope.TotalOrdersList = {};
 

    function groupBy(array, col, value) {
        var r = [], o = {};
        array.forEach(function (a) {
            if (!o[a[col]]) {
                o[a[col]] = {};
                o[a[col]][col] = a[col];
                o[a[col]][value] = 0;
                r.push(o[a[col]]);
            }
            o[a[col]][value] += +a[value];
        });
        return r;
    };

    function InitializeDashboard() {

        storesService.getRetailerInfo($http)
        .then(function (response) {
            $rootScope.flagLoggedIn = true;
            $scope.RetailerInfo = response.data;
            $rootScope.RetailerInfo = response.data
            $rootScope.StoreName = $scope.RetailerInfo.StoreName;
        },
     function (err) {
         $scope.message = err.error_description;
         $rootScope.flagLoggedIn = false;
     });

        storesService.getFilter($http)
        .then(function (response) {
            $scope.filterList = response.data
            loadDefaultFilterValues();
        },
     function (err) {
         $scope.message = err.error_description;
     });

        GetOrderSummary();

    }

    var loadDefaultFilterValues = function () {
        if ($rootScope.RetailerInfo.Branches.length > 0) {
            if (!($rootScope.filters.selectedBranchId > 0) || !$rootScope.filters.selectedBranchId) {
                $rootScope.filters.selectedBranchId = $rootScope.RetailerInfo.Branches[0].BranchId;
            }
        }

        if ($scope.filterList.CategoryFilter.length > 0) {
            $scope.filters.selectedCategory = $scope.filterList.CategoryFilter[0].CategoryId;

        }
        var branch = $rootScope.filters.selectedBranchId;
        GetOrderSummary(branch);
    }
    var GetOrderSummary = function (branch) {
        ordersService.getOrdersSummary($scope, $http, branch)
        .then(function (response) {

            $scope.orderSummaryList = response.data;

        },
        function (err) {
        });

        ordersService.getOrderSummaryByCategory($scope, $http, branch)
       .then(function (response) {

           $scope.orderCategorySummaryList = response.data;

       },
       function (err) {
       });

        ordersService.getOrderSummaryByProduct($scope, $http, branch)
      .then(function (response) {

          $scope.orderProductSummaryList = response.data;

      },
      function (err) {
      });

        ordersService.getOrderCountByStatus($scope, $http, branch)
     .then(function (response) {
         var label = [];
         var data = [];
         $scope.orderCountByStatusSummaryList = response.data;

         var groupresult = groupBy($scope.orderCountByStatusSummaryList, 'PaymentMethodString', 'OrderCount');

         for (var i = 0; i < groupresult.length; i++) {
             label.push(groupresult[i]["PaymentMethodString"]);
             data.push(groupresult[i]["OrderCount"]);
         }
         $scope.labelpaymentMethod = label;
         $scope.datapaymentMethod = data;
     },
     function (err) {
     });

        ordersService.getBranchProductSummary($scope, $http, branch)
    .then(function (response) {

        $scope.branchProductSummaryList = response.data;

    },
    function (err) {
    });

        ordersService.getBranchEnquirySummary($scope, $http, branch)
   .then(function (response) {

       $scope.branchEnquirySummaryList = response.data;

   },
   function (err) {
   });

        ordersService.getLast7DaysSalesChart($scope, $http, branch)
    .then(function (response) {

        $scope.branch7daysSalesChart = response.data;
        $scope.labelweekday = [];
        $scope.seriesweekday = [];
        $scope.dataweekday = [];
        $scope.seriesweekday = ['Sales'];
        var label = [];
        var salesdata1 = [];
        for (var i = 0; i < $scope.branch7daysSalesChart.length; i++) {
            label.push($scope.branch7daysSalesChart[i]["Period"]);
            salesdata1.push($scope.branch7daysSalesChart[i]["Total"]);
        }
        $scope.labelweekday = label;
        $scope.dataweekday.push(salesdata1);
    },
    function (err) {
    });

        ordersService.getLast6MonthsSalesChart($scope, $http, branch)
        .then(function (response) {

            $scope.branch6MonthsSalesChart = response.data;
            $scope.labelMonth = [];
            $scope.seriesMonth = [];
            $scope.dataMonth = [];
            $scope.seriesMonth = ['Sales'];
            var label = [];
            var salesdata1 = [];
            for (var i = 0; i < $scope.branch6MonthsSalesChart.length; i++) {
                label.push($scope.branch6MonthsSalesChart[i]["Period"]);
                salesdata1.push($scope.branch6MonthsSalesChart[i]["Total"]);
            }
            $scope.labelMonth = label;
            $scope.dataMonth.push(salesdata1);
        },
        function (err) {
        });

    }
     
    InitializeDashboard();

    $rootScope.onBranchChange = function () {
        $route.reload();
    }
}]);

