const http = require('http');


function createDiv(val) {
	let div;
	if (val == 0) {
		div = '<div style="width: 10px; height: 10px; display: inline-block; background-color: #fff;"></div>';
	} else {
		div = '<div style="width: 10px; height: 10px; display: inline-block; background-color: #000;"></div>';
	}
	return div;
}

const ourServer = http.createServer((req, res) => {
	let ourURLArray = req.url.split('?')
	if (ourURLArray[0] == '/getDat') {


		let theUserValueArray = ourURLArray[1].split('=')
		let theValue = theUserValueArray[1];
		theValue = theValue.toUpperCase();
		let numberArray = [];
		for (let i = 0; i < theValue.length; i++) {
			numberArray.push((theValue.charCodeAt(i) - 65).toString(2));
		}
		let theEncodedArrayOfArrays = [];
		numberArray.forEach((item, i, array) => {
			while (array[i].length < 8) {
				array[i] = `0${array[i]}`;
			}
			let theSplitArray = array[i].split('');
			theEncodedArrayOfArrays.push(theSplitArray)
		})


		console.log(theEncodedArrayOfArrays);
		let returnedHTML = '<div id="theContainer" style="display: inline-block;">';
		theEncodedArrayOfArrays.forEach((item, index) => {
			returnedHTML += '<div class="myRow">';
			item.forEach((anotherItem) => {
				returnedHTML += createDiv(anotherItem);
			})
			returnedHTML += '</div>';
		})
		returnedHTML += '</div>';

		res.write('<!DOCTYPE html> <html lang = "en" > ')
		res.write('<head><style>canvas{float:right;}</style></head><body">');
		res.write(`${returnedHTML}`)
		res.write('<script>function myLoadedFunction(){html2canvas(document.querySelector("#theContainer")).then(canvas => {document.body.appendChild(canvas)})};</script>')
		res.write('<script onload="myLoadedFunction()" src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.5.0-beta4/html2canvas.js"></script></body></html>');
		res.end();
	} else if(ourURLArray[0] == '/readDat') {
		console.log(req);
		res.write('');
		res.end();
	}else {
		res.write('<!DOCTYPE html> <html lang = "en" > ')
		res.write('<head></head><body>');
		res.write('<form action="/getDat" method="GET"><input type="text" value="google.com" name="addUser" /><button type="submit">Submit</button></form>')
		res.write('<br />');
		res.write('<form action="/readDat" method="GET"><input type="file" accept="image/*" name="addUser" /><button type="submit">Submit</button></form>')		
		res.write('</body></html>')
		res.end();
	}
});

ourServer.listen(8080, () => console.log('Server running'));