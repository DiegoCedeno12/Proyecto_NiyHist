const helpers = {}

helpers.randomNumber = () => {
    const posible = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomSerial = '';
    for (let i = 0; i < 6; i++){
        randomSerial += posible.charAt(Math.floor(Math.random() * posible.length))
    }
    return randomSerial;
}

module.exports = helpers;