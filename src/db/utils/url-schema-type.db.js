import urlRegex from 'url-regex'

export default mongoose => {
	function Url(key, options) {
		mongoose.SchemaType.call(this, key, options, 'Url')
	}

	Url.prototype = Object.create(mongoose.SchemaType.prototype)

	Url.prototype.cast = function(url) {
		if (!urlRegex({ exact: true, strict: true }).test(url)) {
			throw new Error('Url: ' + url + ' is not a valid url')
		}
		return url
	}

	mongoose.Schema.Types.Url = Url
}
