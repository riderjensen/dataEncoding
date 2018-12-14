const http = require('http');

const ourServer = http.createServer((req, res) => {
	let ourURLArray = req.url.split('?')
	if(ourURLArray[0] == '/getDat'){
		let theUserValueArray = ourURLArray[1].split('=')
		let theValue = theUserValueArray[1];
		console.log(theValue);
	}
	if(req.url = '/'){
		res.write('<!DOCTYPE html> <html lang = "en" > ')
		res.write('<head></head><body>');
		res.write('<form action="/getDat" method="GET"><input type="text" value="testing" name="addUser" /><button type="submit">Submit</button></form>')
		res.write('</body></html>')
		res.end();
	}
});

ourServer.listen(8080, () => console.log('Server running'));