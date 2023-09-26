////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
//</copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce
///////////////////////////////////////////////////////////////////////////////////////////
app.factory('authService', ['$rootScope', '$http', '$q', 'localStorageService', function ($rootScope, $http, $q, localStorageService) {

    var endPoint = 'http://localhost:49475/';


    var authServiceFactory = {};

    var _authentication = {
        isAuth: false,
        userName: "",
        useRefreshTokens: false
    };

    var _externalAuthData = {
        provider: "",
        userName: "",
        externalAccessToken: ""
    };

    var RegisterUser = function (registration) {

        LogOut();

        return $http.post(endPoint + 'api/account/register', registration).then(function (response) {
            return response;
        });

    };

    var LoginWithFacebook = function (accessToken, email) {

        var data = "grant_type=social_login&tokenOrigin=facebook" + "&access_token=" + accessToken;
        return VBuyClientLogin(data, email)
    };

    var LoginWithGoogle = function (accessToken, email, expires_in, expires_at, token_type, issued_at) {

        var data = "grant_type=social_login&tokenOrigin=google" + "&access_token=" + accessToken
        + "&expires_in=" + expires_in
         + "&expires_at=" + expires_at
         + "&token_type=" + token_type
         + "&issued_at=" + issued_at
        return VBuyClientLogin(data, email)
    };

    var Login = function (loginData) {

        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;
        return VBuyClientLogin(data, loginData.userName)

    };

    function VBuyClientLogin(data, userName) {
        var deferred = $q.defer();

        $http.post('http://localhost:49475/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
            localStorageService.set('authorizationData', { token: response.access_token, userName: userName, refreshToken: "", useRefreshTokens: false });
            _authentication.isAuth = true;
            _authentication.userName = userName;

            deferred.resolve(response);

        }).error(function (err, status) {
            LogOut();
            deferred.reject(err);
        });

        return deferred.promise;
    }

    var LogOut = function () {

        localStorageService.remove('authorizationData');

        _authentication.isAuth = false;
        _authentication.userName = "";
        _authentication.useRefreshTokens = false;

        localStorageService.remove('userName');
        localStorageService.remove('flagLoggedIn');
        localStorageService.remove('curUserDisplayName');

        $rootScope.flagLoggedIn = false;

        if (gapi && gapi.auth) {
            gapi.auth.signOut();
        }

    };

    var _fillAuthData = function () {

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            _authentication.isAuth = true;
            _authentication.userName = authData.userName;
            _authentication.useRefreshTokens = authData.useRefreshTokens;
        }

    };

    var _refreshToken = function () {
        var deferred = $q.defer();

        var authData = localStorageService.get('authorizationData');

        if (authData) {

            if (authData.useRefreshTokens) {

                var data = "grant_type=";
                //"grant_type=refresh_token&refresh_token=" + authData.refreshToken + "&client_id=" + ngAuthSettings.clientId;

                localStorageService.remove('authorizationData');

                $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                    localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: response.refresh_token, useRefreshTokens: true });

                    deferred.resolve(response);

                }).error(function (err, status) {
                    _logOut();
                    deferred.reject(err);
                });
            }
        }

        return deferred.promise;
    };

    var _obtainAccessToken = function (externalData) {

        var deferred = $q.defer();

        $http.get(serviceBase + 'api/account/ObtainLocalAccessToken', { params: { provider: externalData.provider, externalAccessToken: externalData.externalAccessToken } }).success(function (response) {

            localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: "", useRefreshTokens: false });

            _authentication.isAuth = true;
            _authentication.userName = response.userName;
            _authentication.useRefreshTokens = false;

            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _registerExternal = function (registerExternalData) {

        var deferred = $q.defer();

        $http.post(serviceBase + 'api/account/registerexternal', registerExternalData).success(function (response) {

            localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: "", useRefreshTokens: false });

            _authentication.isAuth = true;
            _authentication.userName = response.userName;
            _authentication.useRefreshTokens = false;

            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    // authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.login = Login;
    authServiceFactory.loginWithFacebook = LoginWithFacebook;
    authServiceFactory.loginWithGoogle = LoginWithGoogle
    authServiceFactory.logOut = LogOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;
    authServiceFactory.refreshToken = _refreshToken;

    authServiceFactory.obtainAccessToken = _obtainAccessToken;
    authServiceFactory.externalAuthData = _fillAuthData;
    authServiceFactory.registerExternal = _registerExternal;

    return authServiceFactory;
}]);