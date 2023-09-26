////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
//</copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce
///////////////////////////////////////////////////////////////////////////////////////////
app.service('cartService', function () {

    //var endPoint = '/VSECommerce/api/Cart';
    //var endPointCheckout = '/VSECommerce/api/CheckOut';

    var endPoint = 'http://localhost:49475/api/Cart';
    var endPointCheckout = 'http://localhost:49475/api/CheckOut';

    this.getOrderConfirmationDetails = function ($http, orderid, userName) {

        var config = {
            params: { orderId: orderid, userName: userName }
        };

        return $http.get(endPointCheckout + '/GetOrderConfirmationDetails/', config);
    }

    this.generateOrder = function ($http, shoppingCartItemModelList, userName, paymentMethod, deliveryMethod, couponCode) {
        var shoppingCartItemListDTO = {
            shoppingCartDTOList: shoppingCartItemModelList,
            userName: userName,
            paymentMethod: paymentMethod,
            deliveryMethod: deliveryMethod,
            couponCode: couponCode
        };

        return $http.post(endPointCheckout + '/CreateOrderForCart/', shoppingCartItemListDTO);
    }

    this.initiatePaymentForOrder = function ($http, userName, orderid) {
        var config = {
            params: { orderId: orderid, userName: userName }
        };

        return $http.get(endPointCheckout + '/InitiatePaymentGateway/', config);
    }


    this.addShoppingCartItem = function ($http, shoppingCartItemModel, userName) {

        var shoppingCartItem = {
            ProductId: shoppingCartItemModel.ProductId,
            BranchId: shoppingCartItemModel.BranchId,
            UnitPrice: shoppingCartItemModel.SpecialPrice,
            Quantity: shoppingCartItemModel.Quantity,
            AdditionalShippingCharge: shoppingCartItemModel.AdditionalShippingCharge,
            UserName: userName,
            SelectedSize: shoppingCartItemModel.SelectedSize
        }

        return $http.post(endPoint + '/AddShoppingCartItem/', shoppingCartItem);
    }

    this.addShoppingCartItemList = function ($http, shoppingCartItemModelList, userName) {
        var shoppingCartItemListDTO = { shoppingCartDTOList: shoppingCartItemModelList, userName: userName };
        return $http.post(endPoint + '/AddShoppingCartItemList/', shoppingCartItemListDTO);
    }

    this.updateCartItemQuantity = function ($http, shoppingCartItemModel, userName) {
        var shoppingCartItem = {
            ProductId: shoppingCartItemModel.ProductId,
            BranchId: shoppingCartItemModel.BranchId,
            UnitPrice: shoppingCartItemModel.SpecialPrice,
            Quantity: shoppingCartItemModel.Quantity,
            AdditionalShippingCharge: shoppingCartItemModel.AdditionalShippingCharge,
            UserName: userName
        }

        return $http.post(endPoint + '/UpdateCartItemQuantity/', shoppingCartItem);
    }

    this.getCartDiscount = function ($http, shoppingCartItemModelList, userName, couponCode) {
        var config = {
            params: { userName: userName, couponCode: couponCode }
        };
        return $http.get(endPointCheckout + '/GetCartDiscount/', config);
    }

    this.removeShoppingCartItem = function ($http, shoppingCartItemModel, userName) {

        var shoppingCartItem = {
            ProductId: shoppingCartItemModel.ProductId,
            BranchId: shoppingCartItemModel.BranchId,
            UnitPrice: shoppingCartItemModel.SpecialPrice,
            Quantity: shoppingCartItemModel.Quantity,
            AdditionalShippingCharge: shoppingCartItemModel.AdditionalShippingCharge,
            UserName: userName
        }

        return $http.post(endPoint + '/RemoveShoppingCartItem/', shoppingCartItem);
    }

    this.getShoppingCartItems = function ($http, userName) {
        var config = {
            params: { userName: userName }
        };

        return $http.get(endPoint + '/GetShoppingCartItems/', config);
    }

    this.getBuyerAddress = function ($http, userName) {
        var config = {
            params: { userName: userName }
        };

        return $http.get(endPoint + '/GetBuyerAddress/', config);
    }

    this.getReward = function ($http, userName) {
        var config = {
            params: { userName: userName }
        };
        return $http.get(endPoint + '/GetReward/', config);
    }

    this.getRewardDiscount = function ($http, rewardPoint) {
        var config = {
            params: { rewardPoint: rewardPoint }
        };
        return $http.get(endPoint + '/GetRewardDiscount/', config);
    }

    this.getUseMyReward = function ($http, userName, availableReward, useRewardPoint) {
        var config = {
            params: { email: userName, availableReward: availableReward, useRewardPoint: useRewardPoint }
        };
        return $http.get(endPointCheckout + '/GetUseMyReward/', config);
    }

    this.addBuyerAddress = function ($http, addressModel, userName) {

        addressModel.UserName = userName;
        return $http.post(endPoint + '/AddBuyerAddress/', addressModel);
    }

});