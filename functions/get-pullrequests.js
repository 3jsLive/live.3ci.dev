const fetch = require( 'node-fetch' );

exports.handler = async ( event ) => {

	console.log( `Function 'get-pullrequests' invoked` );

	try {

		const state = event.queryStringParameters && event.queryStringParameters.state;

		// check it
		const states = state.split( /,/g );
		if ( states.some( s => /^(open|merged|closed)$/.test( s ) !== true ) || states.length > 3 )
			throw new Error( `Invalid state requested: ${state}` );

		// query API
		const response = await fetch( `${process.env.APIURL}/pullrequests?state=${state}` );
		const content = await response.json();
		console.log( { content } );

		// prep data
		content.sort( ( a, b ) => b.updated_at.localeCompare( a.updated_at ) );
		content.forEach( push => push.commits.reverse() );

		return { statusCode: 200, body: JSON.stringify( content ) };

	} catch ( err ) {

		console.log( err );

		return { statusCode: 500, body: JSON.stringify( err ) };

	}

};

