export default scrollBar;

require('./scroll-bar.scss');

function scrollBar() {
    "use strict";

    return {
        restrict: 'E',
        scope: {
            parts: '=',
            element: '='
        },
        template: require('./scroll-bar.html'),
        link: function ($scope) {

            var blockLocation = 0;
            var Draggable = require('Draggable');
            var dragHeight = 100 / $scope.parts;
            var dragElement = angular.element('.scroll-drag');
            var scrollElem = angular.element('.' + $scope.element);
            var dragContainer = angular.element('.drag-container');
            var incVal = scrollElem.prop('scrollHeight');

            $scope.scrollBlocks = _.range(0, $scope.parts);

            scrollElem.css({'overflow-y': 'hidden'});
            dragElement.css({'height': dragHeight + '%'});
            angular.element('.scroll-bar').css({'height': incVal + 'px'});

            var options = {
                limit: dragContainer[0],
                onDrag: function (v) {
                }
            };

            new Draggable(dragElement[0], options);         // Initialize drag, element is draggable now;

            function smoothScroll(event, head) {
                if (head == 'top' || event.originalEvent.deltaY < 0) {
                    blockLocation--;
                } else {
                    blockLocation++;
                }
                if (blockLocation < 0) blockLocation = 0;
                if (blockLocation >= $scope.parts) blockLocation = ($scope.parts - 1);
                animate();
            }

            function animate(){
                scrollElem.animate({scrollTop: (blockLocation * incVal)}, 'slow');
                dragElement.animate({top: (blockLocation * dragHeight) + '%'}, 'slow');
            }

            scrollElem.bind("DOMMouseScroll mousewheel onmousewheel", function ($event) {
                smoothScroll($event);
            });

            $scope.blockClick = function (block) {
                blockLocation = block;
                animate();
            };

            $scope.scrollHeads = function ($event, head) {
                smoothScroll($event, head);
            };
        }
    }
}