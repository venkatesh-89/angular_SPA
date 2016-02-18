'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {

            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            $scope.showMenu = false;
            $scope.message = "Loading...";

            menuFactory.getDishes().query(
              function (response) {
                $scope.dishes = response;
                $scope.showMenu = true;
              },
              function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
              }
            );

            $scope.select = function(setTab) {
                $scope.tab = setTab;

                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };

            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };

            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];

            $scope.channels = channels;
            $scope.invalidChannelSelection = false;

        }])

        .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {

            $scope.sendFeedback = function() {

                console.log($scope.feedback);

                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                  //Code to update

                    feedbackFactory.getFeedback().save($scope.feedback);

                  //Code to reset Comments obj
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

            $scope.showDish = false;
            $scope.message = "Loading...";

            menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
            .$promise.then(
              function (response) {
                $scope.dish = response;
                $scope.showDish = true;
              },
              function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
              }
            );

        }])

        .controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory) {



            $scope.ratingGroup = [1,2,3,4,5];
            $scope.comment = { yourName:"", rating:5, description:"", currDate:"" };
            $scope.submitComment = function () {

            //Step 2: This is how you record the date
            $scope.comment.currDate = new Date().toISOString();
            var dishComment = { rating:$scope.comment.rating,
                                comment:$scope.comment.description,
                                author:$scope.comment.yourName,
                                date:$scope.comment.currDate };

            // Step 3: Push your comment into the dish's comment array
            $scope.dish.comments.push(dishComment);
            menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);

            //Step 4: reset your form to pristine
            $scope.commentForm.$setPristine();

            //Step 5: reset your JavaScript object that holds your comment
            $scope.comment = { yourName:"", rating:5, description:"" };
            };
        }])

        // implement the IndexController and About Controller here
        .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory) {

            $scope.showFeaturedDish = false;
            $scope.showPromotionDish = false;
            $scope.showExecChef = false;
            $scope.message1 = "Loading...";
            $scope.message2 = "Loading...";
            $scope.message3 = "Loading...";

            menuFactory.getDishes().get({id:0})
            .$promise.then(
              function (response) {
                $scope.featureDish = response;
                $scope.showFeaturedDish = true;
              },
              function (response) {
                console.log(response);
                $scope.message1 = "Error: " + response.status + " " + response.statusText;
              }
            );

            menuFactory.getPromotions().get({id:0})
            .$promise.then(
              function (response) {
                $scope.promotionDish = response;
                $scope.showPromotionDish = true;
              },
              function (response) {
                $scope.message2 = "Error: " + response.status + " " + response.statusText;
              }
            );

            corporateFactory.getLeaders().get({id:3})
            .$promise.then(
              function (response) {
                $scope.execChef = response;
                $scope.showExecChef = true;
              },
              function (response) {
                $scope.message3 = "Error: " + response.status + " " + response.statusText;
              }
            );

        }])

        .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {

          $scope.showLeaders = false;
          $scope.message = "Loading...";

            corporateFactory.getLeaders().query(
              function (response) {
                $scope.leaders = response;
                $scope.showLeaders = true;
              },
              function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
              }
            );
        }])

;
