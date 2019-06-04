module.exports = {
	sourceType: 'module',
	plugins: ['plugins/markdown'],
	source: {
		exclude: ['node_modules']
	},
	opts: {
		template: 'node_modules/braintree-jsdoc-template'
	},
	templates: {
		referenceTitle: 'Apple Sign In Passport Strategy',
		disableSort: false,
		collapse: true
	}
};
