const regex = {
    Number:'^(\d+?)$',
};

validateNumber = (input) => {
    var re = /^(\d+?)$/;
    return re.test(input);
};

export default regex;