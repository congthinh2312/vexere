axios({
    method : "GET",
    url : "http://localhost:3000/api/v1/test-finger-print"
}).then(() => {
    console.log(res);
}).catch((err) => {
    console.log(err);
})