app.directive('ngElevateZoom', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            //Will watch for changes on the attribute
            attrs.$observe('zoomImage', function () {
                linkElevateZoom();
            })

            function linkElevateZoom() {
                //Check if its not empty
                if (attrs.zoomImage.indexOf(".jpeg") > 0 || attrs.zoomImage.indexOf(".jpg") > 0) {

                    var image = $('#productImage');
                    $.removeData(image, 'elevateZoom');                    
                    $('.zoomContainer').remove();// remove zoom container from DOM

                    //remove line breaks 
                    attrs.zoomImage = attrs.zoomImage.replace(/(\r\n|\n|\r)/gm, "");

                    element.attr('data-zoom-image', attrs.zoomImage);
                    $(element).data("zoom-image", attrs.zoomImage);

                    $(element).elevateZoom(
                           {
                               lensFadeOut: 50,
                               zoomWindowWidth: 500,
                               zoomWindowHeight: 400,
                               zoomWindowFadeIn: 100,
                               zoomWindowFadeOut: 100,
                               lensFadeIn: 50,
                               lensSize: 100,
                               zoomType: "window"
                           });
                }
                else {
                    var image = $('#productImage');
                    $.removeData(image, 'elevateZoom');
                    $('.zoomContainer').remove();// remove zoom container from DOM
                    return;
                }
            }
            //linkElevateZoom();
        }
    };
});

app.directive('slickSlider', function () {
    return {
        restrict: 'A',
        scope: { 'data': '=' },
        link: function (scope, element, attrs) {
            var isInitialized = false;
            scope.$watch('data', function (newVal, oldVal) {
                if (newVal && newVal.length > 0 && !isInitialized) {
                    $(element).slick(scope.$eval(attrs.slickSlider));
                    isInitialized = true;
                }
            });
        }
    }
});

app.directive('slickSliderBanner', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
                $(element).bxSlider(scope.$eval(attrs.slickSliderBanner));
        }
    }
});

app.directive('slickSliderRecentview', function () {
    return {
        restrict: 'A',
        scope: { 'data': '=' },
        link: function (scope, element, attrs) {            
            var isInitialized = false;
            scope.$watch('data', function (newVal, oldVal) {
                if (newVal && newVal.length > 0 && !isInitialized) {
                   $(element).bxSlider(scope.$eval(attrs.slickSliderRecentview));                   
                    isInitialized = true;
                }
            });
        }
    }
});

app.directive('slickSliderRelatedproduct', function () {
    return {
        restrict: 'A',
        scope: { 'data': '=' },
        link: function (scope, element, attrs) {
            var isInitialized = false;
            scope.$watch('data', function (newVal, oldVal) {
                if (newVal && newVal.length > 0 && !isInitialized) {
                    var slider = $(element).bxSlider(scope.$eval(attrs.slickSliderRelatedproduct));
                    slider.reloadSlider();
                    isInitialized = true;
                }
            });
        }
    }
});

app.directive('slickProductImageSlider', function () {
    return {
        restrict: 'A',
        scope: { 'data': '=' },
        link: function (scope, element, attrs) {
            var isInitialized = false;
            scope.$watch('data', function (newVal, oldVal) {
                if (newVal && newVal.PictureName && !isInitialized) {
                    $(element).slick(scope.$eval(attrs.slickProductImageSlider));
                    isInitialized = true;
                }
            });
        }
    }
});

app.directive('radiusSlider', function ($parse) {
    return {
        restrict: 'A',
        replace: true,
        template: '',
        link: function ($scope, element, attrs) {
            var model = $parse(attrs.model);
            var slider = $(element[0]).slider(
                {
                    value : $scope.$parent.defaultRadius
                }
                );
            model.assign($scope, $scope.searchRadius);
            //$scope.$apply();
            slider.on('slide', function (ev) {
               // model.assign($scope, ev.value);
               // $scope.$apply();
            });
            slider.on('slideStop', function (ev) {
                model.assign($scope, ev.value);
                $scope.onProductFilterChanged();
                $scope.$apply();
            });
        }
    }
});

app.directive('priceRangeSlider', function ($parse) {
    return {
        restrict: 'A',
        replace: true,
        template: '',
        link: function ($scope, element, attrs) {
            var isInitialized = false;
            $scope.$watch("loadPriceRangeSlider", function () {
                if (!isInitialized && $scope.loadPriceRangeSlider) {
                    var model = $parse(attrs.model);                   
                    var slider = $(element[0]).slider(
                        {
                            value: [$scope.searchFilter.data.Min, $scope.searchFilter.data.Max],
                            min: $scope.searchFilter.data.Min,
                            max: $scope.searchFilter.data.Max
                        });
                    $scope.sliderValue = [$scope.searchFilter.data.Min, $scope.searchFilter.data.Max];
                    model.assign($scope, $scope.sliderValue);
                    slider.on('slide', function (ev) {

                    });
                    slider.on('slideStop', function (ev) {
                        model.assign($scope, ev.value);
                        $scope.priceRangeFrom = ev.value[0];
                        $scope.priceRangeTo = ev.value[1];
                        $scope.onPricingFilterChanged();
                        $scope.$apply();
                    });
                    isInitialized = true;
                }                
            });
        }
    }
});

app.directive('errSrc', function () {
    return {
        link: function (scope, element, attrs) {
            element.bind('error', function () {
                if (attrs.src != attrs.errSrc) {
                    attrs.$set('src', attrs.errSrc);
                }
            });
        }
    }
});

app.directive('ngJwPlayerNew', function () {
    return {
        restrict: 'A',
        link: function ($scope, element, attrs) {
            var isInitialized = false;

            attrs.$observe('source', function () {
                if(attrs.source != null && attrs.source.indexOf('http')==0)
                {
                    jwplayer("videocontainer").setup({
                        file: attrs.source,
                        autostart: false,
                        image: attrs.image,
                        title: attrs.videotitle
                    });
                }
             })            
        }
    }
});