angular.module("mainApp", [])
	.controller("mainAppController", function($scope, $location, $http, $timeout, $window) 
	{

		var config = {
            headers : {
                'Content-Type': 'application/json'
            }
        }

        // This is the trigger array variable to push the items in table 
        $scope.counterItems = [];
    	
	    $scope.addCounterForm = function(counterForm,counterItem)
	    {

	    // create data

	    	// Validation
	    	if (!counterForm.title.$valid) 
	        {

	           	$scope.titleValid = true;
	        } 

	        else

	        {
	        	// show validation success message
	        	$scope.titleValid = false;


	        	var dataObj = {
					title : $scope.counterItem.addTitle
			
				};	

				$http.post('/api/v1/counter', dataObj, config)
				.then(

						function successCallback(res) 
						{

							if (res)
							{
								$scope.msg = "Post Data Submitted Successfully!";

								console.log('Message Added Title: ',$scope.msg);
								console.log('Success Added Title: ',res);

								// clear the input value after submitting
								$scope.counterItem.addTitle = '';

								$scope.mainID = res.data.id;
								$scope.mainID = res.data.id;

								console.log('Message Added Title: ', $scope.mainID);


								$scope.counterItems.push(res.data);

							}

						}
						, 

						function errorCallback(res) 
						{
							$scope.msg = "Error: Something wrong in the code!";
							$scope.statusval = res.status;
							$scope.statustext = res.statusText;
							$scope.headers = res.headers();

							console.log('Message Added Title: ', $scope.msg);
						}
				);

	        }

    	};

    
    	$scope.allItems= function()
    	{

    		$http.get('/api/v1/counters')
			.then(

					function successCallback(res) 
					{

						if (res)
						{
							$scope.msg = "Success: allItems Data Submitted !";
							console.log('Result Data: ', res.data);

						}

					}
					, 

					function errorCallback(response) 
					{
						$scope.msg = "Error: Something wrong in the code!";
						$scope.statusval = res.status;
						$scope.statustext = res.statusText;
						$scope.headers = res.headers();

						console.log('Message All Data: ', $scope.msg);
					}
			);	


    	}


    	 // this will remove row once the user click the button of selected row
	    $scope.deleteCounterItem = function(itemIndex,mainID)
	    {
	        
	 

			//console.log('mainID',mainID);

			var dataObj = {
				id : mainID
			
			};	

			console.log('dataObj',dataObj);

			$http.delete('/api/v1/counter',  {params: {id : mainID}} , config)
			.then(

					function successCallback(response) 
					{

						if (response)
						{
							$scope.msg = "Data Deleted Successfully!";

							console.log('Message Delete Item: ',$scope.msg);
							console.log('Success Delete Item: ',response);
						}

						$scope.counterItems.splice(itemIndex, 1);	  

					}
					, 

					function errorCallback(response) 
					{
						$scope.msg = "Error: Something wrong in the code!";
						$scope.statusval = response.status;
						$scope.statustext = response.statusText;
						$scope.headers = response.headers();

						console.log('Message Delete Item: ', $scope.msg);
					}
			);


	    };

        // increment number
        $scope.increment = function(counterItem,mainID)
        {
            

            var dataObj = {
				id : mainID
			
			};	

			console.log('dataObj',dataObj);

			$http.post('/api/v1/counter/inc', dataObj, config)
			.then(

					function successCallback(response) 
					{

						if (response)
						{
							$scope.msg = "Increment Data Submitted Successfully!";

							console.log('Message Increment: ',$scope.msg);
							console.log('Success Increment: ',response);


							counterItem.count += 1;


						}

					}
					, 

					function errorCallback(response) 
					{
						$scope.msg = "Error: Something wrong in the code!";
						$scope.statusval = response.status;
						$scope.statustext = response.statusText;
						$scope.headers = response.headers();

						console.log('Message Increment: ', $scope.msg);
					}
			);
        }

        // decrement number
        $scope.decrement = function(counterItem,mainID)
        {

            var dataObj = {
				id : mainID
			
			};	

			$http.post('/api/v1/counter/dec', dataObj, config)
			.then(

					function successCallback(response) 
					{

						if (response)
						{
							$scope.msg = "Decrement Data Submitted Successfully!";

							console.log('Message Decrement: ',$scope.msg);
							console.log('Success Decrement: ',response);

							counterItem.count -= 1;

						}

					}
					, 

					function errorCallback(response) 
					{
						$scope.msg = "Error: Something wrong in the code!";
						$scope.statusval = response.status;
						$scope.statustext = response.statusText;
						$scope.headers = response.headers();

						console.log('Message Decrement: ', $scope.msg);
					}
			);

        }

        // total sum 
        $scope.total = function() 
        {
	        var total = 0;

	        angular.forEach($scope.counterItems, function(counterItem) {
	            total += counterItem.count;
	        })

	        return total;
		}
        


	}
)