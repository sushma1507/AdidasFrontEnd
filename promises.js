
const getProduct = Promise.resolve({id: 1, name: 'prodcut1', active: true});
const getAvailability = Promise.resolve({availability:100});
const getForecast = new Promise((resolve,reject)=>{
    resolve({ forecast: '26-06-2021', risk: [ 'low', 'mid', 'high' ] });
});
const getForecastReject = new Promise((resolve,reject)=>{
    reject({ forecast: '26-06-2021', risk: [ 'low', 'mid', 'high' ] });
});
//Get all the product details
const getAllProductDetails = () => {
    const promises = [getProduct, getAvailability,getForecast];
    return new Promise ((resolve,reject)=>{
    Promise.allSettled(promises)
        .then(
                (results) => {
                    const allProductArr =[];
                    results.forEach((result) =>{
                        allProductArr.push(result.value)
                    } );
                    const allProductData = Object.assign({}, ...allProductArr);
                    resolve(allProductData);
                }  
        );
    });
};
//Get the product details when forcaste fails
const getAllProductExceptForecast  = () => {
    const promises = [getProduct, getAvailability,getForecastReject];
    return new Promise ((resolve,reject)=>{
        Promise.allSettled(promises)
            .then(
                    (results) => {
                        const allProductArr =[];
                        results.forEach((result) =>{
                            allProductArr.push(result.value)
                        } );
                        const allProductData = Object.assign({}, ...allProductArr);
                        resolve(allProductData);
                    }  
            );
    });
};


console.log(getAllProductDetails().then((response)=>console.log(response)));
console.log(getAllProductExceptForecast().then((response)=>console.log(response)));


