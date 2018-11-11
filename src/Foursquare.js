//builds a url to request data from foursquare api
//houses necessary authorization keys
//parses returned data for use in app
class Helper {
	static baseURL() {
		return 'https://api.foursquare.com/v2'
	}
	static auth() {
		const keys = {
		  client_id: 'DMTGW5RKAGWA2QCNP014VNU5NKMB3FGVZNYZHB3SPUUV3AMB',
	    client_secret: 'QCKOMY31QQ0M303QW4JBIC4GVMEXUF3WHW4BXNOP5XERAIDI',
	    v: '20181019',
	    ll: '41.991431, -87.676839'
		}
		return Object.keys(keys)
			.map(key => `${key}=${keys[key]}`)
			.join('&')
	}
	static urlBuilder(urlPrams){
		if(!urlPrams){
			return ''
		}
		return Object.keys(urlPrams)
			.map(key => `${key}=${urlPrams[key]}`)
			.join('&')
	}
	static headers() {
		return {
			Accept: 'application/json'
		}
	}
	static simpleFetch(endPoint, method, urlPrams){
		let requestData = {
			method,
			headers: Helper.headers()
		}
		return fetch(
			`${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(
			urlPrams
		)}`,
			requestData
		).then(res => res.json())
	}
}
export default class SquareAPI {
	static search(urlPrams){
		return Helper.simpleFetch('/venues/search', 'GET', urlPrams)
	}
	static getVenueDetails(VENUE_ID){
		return Helper.simpleFetch(`/venues/${VENUE_ID}`, 'GET')
	}
	static getVenuePhotos(VENUE_ID){
		return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`, 'GET')
	}
}
