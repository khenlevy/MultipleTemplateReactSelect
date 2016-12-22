var getOptions = function(input, callback) {
    setTimeout(function() {
        Promise.resolve({
            options: [
                { value: 'one', label: 'One' },
                { value: 'two', label: 'Two' }
            ],
            complete: true
        });
    }, 500);
};

export default getOptions;