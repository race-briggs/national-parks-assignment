'use strict';

const searchEndPoint = 'https://api.nps.gov/api/v1/parks';

const apiKey = 'aJcHBzfd93E4cIvOg7zlFf7z49NvEdEutCdtChfT';

function formatQuery(params) {
	const queryTerm = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
	return queryTerm.join('&');
}

function displayResults(responseJson, maxResults) {
	console.log(responseJson);
	$('.js-results-list').empty();

	for (let i = 0; i < responseJson.length & i < maxResults; i++) {
		$('.js-results-list').append(
			`<li class="result-li">
				<h3>${responseJson[i].name}</h3>
				<a href="${responseJson[i].url}">${responseJson[i].url}</a>
				<p>${responseJson[i].description}</p>
			</li>`
			);
	};
	$('#results').removeClass('hidden');
}

function getRequest(query, maxResults=10) {

	const params = {
		stateCode: query.replace(/\s/g,'');
		api_key: apiKey
	};

	const url = searchEndPoint + '?' + formatQuery(params);

	fetch(url, options)
		.then(response => {
			if(response.ok){
				return response.json();
			} else {
				throw new Error(response.statusText);
			}
		})
		.then(responseJson => displayResults(responseJson, maxResults))
		.catch(e => {
			$('.error-message').text(`An Error Occurred: ${e.message}`);
		});
}

function watchForm() {
	$('#js-form').submit(event => {
		event.preventDefault();
		const searchTerm = $('.js-search').val();
		const maxResults = $('.js-max-results').val();
		getRequest(searchTerm, maxResults);
		$('.js-search').val("");
		$('.js-max-results').val("");
	});
}

$(watchForm);