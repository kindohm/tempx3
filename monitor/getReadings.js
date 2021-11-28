const BME280 = require("bme280-sensor");

// The BME280 constructor options are optional.
//
const options = {
  i2cBusNo: 1, // defaults to 1
  i2cAddress: BME280.BME280_DEFAULT_I2C_ADDRESS(), // defaults to 0x77
};

let bme280;

const main = async () => {
  try {
    bme280 = new BME280(options);
    await bme280.init();
  } catch (err) {
    console.error("error initializing sensor");
    console.error(err);
  }
};

main();

const getReadings = async () => {
  try {
    const { temperature_C, pressure_hPa, humidity } =
      await bme280.readSensorData();
    return {
      temperature: temperature_C,
      humidity,
      pressure: pressure_hPa,
    };
  } catch (err) {
    console.error("error getting readings");
    console.error(err);
  }
};

module.exports = { getReadings };
