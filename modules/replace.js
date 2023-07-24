module.exports = (temp, data) => {
    let output = temp.toString().replace(/{%NAME%}/g, data.name);
    output = output.replace(/{%YEARS%}/g, data.years);
    output = output.replace(/{%ID%}/g, data.id);
    output = output.replace(/{%PROFISSIONAL%}/g, data.profissional);
    output = output.replace(/{%CITY%}/g, data.city);

    return output
}