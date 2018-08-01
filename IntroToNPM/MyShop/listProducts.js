var faker = require('faker');


function fakeProducts(n) {
    for(var i = 0; i < n; i++) {
        console.log(faker.fake("{{commerce.productName}} - ${{commerce.price}}"));
    }
}

fakeProducts(10);