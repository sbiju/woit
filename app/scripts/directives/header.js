//--------------------------------------------------------------------------------------------------
//  Yocompute 2014-2017 Copyright reserved
//--------------------------------------------------------------------------------------------------

'use strict';

angular.module('main')

.directive('header', function () {
    return {
        restrict: 'E',
        scope: {
        	onChange: '&', // after check callback
            opt: '=',
            data: '='
        },
        templateUrl: '/scripts/directives/header.html',
        link: function (scope, element, attrs) {
            
            var opt = scope.opt;
            var $ctrl = $(element).find('.header');

            scope.toggle = function(){
                if($ctrl.hasClass('expanded')){
                    $ctrl.removeClass('expanded');
                }else{
                    $ctrl.addClass('expanded');
                }
            }

            scope.onClick = function(m){
                if(m.click)
                    m.click();
                $ctrl.removeClass('expanded');
            }
            
            function init() {

            }

            init();
        }// end of link
    }
})