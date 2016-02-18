'use strict';

angular.module('confusionApp')
        .constant("baseURL","http://localhost:3333/")
        .service('menuFactory', ['$resource', 'baseURL', function($resource, baseURL) {

          this.getDishes = function(){

              return $resource(baseURL + 'dishes/:id', null,
              {'update':{method:'PUT'}});

          };

          // implement a function named getPromotion
          // that returns a selected promotion.

          this.getPromotions = function() {

            return $resource(baseURL + 'promotions/:id', null,
            {'update':{method:'PUT'}});
          };

        }])

        .factory('corporateFactory', ['$resource', 'baseURL', function($resource, baseURL) {

            var corpfac = {};

            // Remember this is a factory not a service

            corpfac.getLeaders = function() {

              return $resource(baseURL + 'leadership/:id', null,
              {'update':{method:'PUT'}});
            };

            return corpfac;

        }])

        .factory('feedbackFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

          var feedbackFac = {};

          feedbackFac.getFeedback = function() {

            return $resource(baseURL + 'feedback/:id', null,
            {'update':{method:'PUT'}});
          };

          return feedbackFac;

        }])

;
