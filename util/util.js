function successListResponse(res, response) {
	if (response == null || response == "" || response.isEmptyObject) {
        console.log('No content');
		return res.status(204).send('No content');
	}
	res.status(200).send({
		'list' : response
	});
}

function successResponse(res, response) {
	if (response == null || response == "") {
        console.log('Not found');
		return res.status(404).send('Not Found');
	}
	res.status(200).send(response);
}

module.exports = {
	successListResponse : successListResponse,
	successResponse : successResponse
}