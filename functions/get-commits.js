const fetch = require( 'node-fetch' );

exports.handler = async ( /* event, context, callback */ ) => {

	console.log( `Function 'get-commits' invoked` );

	try {

		// query API
		const response = await fetch( `${process.env.APIURL}/commits` );
		const content = await response.json();
		console.log( { content } );

		return { statusCode: 200, body: JSON.stringify( content ) };

	} catch ( err ) {

		console.log( err );

		return { statusCode: 500, body: JSON.stringify( err ) };

	}

};

