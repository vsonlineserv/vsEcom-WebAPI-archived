////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
//</copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce
///////////////////////////////////////////////////////////////////////////////////////////
app.directive('ngVbuyRating', function () {
    return {
        restrict: 'A',
        template: '<ul class="rating">' +
                    '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
                        '\u2605' +
                    '</li>' +
                  '</ul>',
        scope: {
            ratingValue: '=',
            max: '=',
            readonly: '@',
            onRatingSelected: '&'
        },
        link: function (scope, elem, attrs) {
            scope.stars = [];
            for (var i = 0; i < scope.max; i++) {
                scope.stars.push({ filled: i < scope.ratingValue });
            }
            var updateStars = function () {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({ filled: i < scope.ratingValue });
                }
            };

            scope.toggle = function (index) {
                if (scope.readonly && scope.readonly === 'true') {
                    return;
                }
                scope.ratingValue = index + 1;
                scope.onRatingSelected({ rating: index + 1 });
            };

            scope.$watch('ratingValue', function (oldVal, newVal) {
                if (oldVal || newVal) {
                    updateStars();
                }
            });
        }
    }
});

app.directive('ngVbuyFbComments', function () {
    function createHTML(href, numposts, colorscheme) {
        return '<div class="fb-comments" ' +
                       'data-href="' + href + '" ' +
                       'data-numposts="' + numposts + '" ' +
                       'data-colorsheme="' + colorscheme + '">' +
               '</div>';
    }

    return {
        restrict: 'A',
        scope: {},
        link: function postLink(scope, elem, attrs) {
            attrs.$observe('pageHref', function (newValue) {
                var href        = newValue;
                var numposts    = attrs.numposts    || 10;
                var colorscheme = attrs.colorscheme || 'light';

                elem.html(createHTML(href, numposts, colorscheme));
                FB.XFBML.parse(elem[0]);
            });
        }
    };
});


app.directive('ngVbuyFbRecommend', function () {
    function createHTML(href) {
        return '<div class="fb-like" ' +
                       'data-href="' + href + '" ' +
                       'data-action="recommend" >' +
               '</div>';
    }

    return {
        restrict: 'A',
        scope: {},
        link: function postLink(scope, elem, attrs) {
            attrs.$observe('pageHref', function (newValue) {
                var href = newValue;
                elem.html(createHTML(href));
                FB.XFBML.parse(elem[0]);
            });
        }
    };
});

 