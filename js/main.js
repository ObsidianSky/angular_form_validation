var app = angular.module('app', []);

app.controller('regForm', function($scope) {
    $scope.countries = ['Ukraine', 'England', 'Japan', 'USA'];
});

app.directive('validate', function() {
    return {
        restrict: 'A',
        require: '^form',
        link: function(scope, el, attr, formCtrl){
            var input = angular.element(el[0].querySelector('[name]'));
            var inputName = input.attr('name');

            input.bind('blur', function() {
                var ngInput = formCtrl[inputName];

                if(ngInput.$pristine) return;

                if(ngInput.$valid) {
                  el.removeClass('has-error').addClass('has-success')
                } else {
                  el.addClass('has-error').removeClass('has-success')
                }
            });
        }
    }
});

app.directive('compareTo', function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {
             
            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };
 
            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
});
