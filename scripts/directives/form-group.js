angular.module('angularBootstrapMaterial')
    .directive('abmFormGroup', function (abmConfig) {
        return {
            scope: {
                classList: '=',
                label: '@',
                placeholder: '@',
                errorMessages: '=',
                errorMessagesInclude: "@"
            },
            replace: true,
            transclude: {
                label: '?abmLabel',
                input: '?abmInput'
            },
            templateUrl: 'templates/form-group.html',
            controller: function ($scope, $element) {
                $scope.errorMessageMap = {};
                $scope.showErrors = abmConfig.getErrorState() && $scope.errorMessages !== false;
                if ($scope.showErrors) {
                    var globalErrors = abmConfig.getErrors() || {};
                    if ($scope.errorMessages instanceof Object)
                        angular.extend($scope.errorMessageMap, globalErrors, $scope.errorMessages);
                    else
                        angular.extend($scope.errorMessageMap, globalErrors);
                }
                this.toggleFocus = function (state) {
                    $element.toggleClass("is-focused", state);
                };
                this.toggleEmpty = function (state) {
                    $element.toggleClass("is-empty", state);
                }
                this.toggleError = function (state) {
                    $element.toggleClass("has-error", state);
                }
                this.registerControl = function (scope) {
                    $scope.formControl = scope;
                }
            },
            link: {
                pre: function ($scope, element, attrs, ctrl, transclude) {

                },
                post: function (scope, element, attrs, ctrl, transclude) {
                    if (transclude.isSlotFilled('label')) {
                        var label = transclude(angular.noop, null, 'label');
                        element.find('label').replaceWith(label);
                    }
                    if (transclude.isSlotFilled('input')) {
                        var input = transclude(function (clone, scope) {
                            element.find('input').replaceWith(clone);
                        }, null, 'input');
                    }
                    console.log(transclude())
                }
            }
        }
    });