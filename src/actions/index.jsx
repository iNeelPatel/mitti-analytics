var Parse = require("parse");

export const getSensorData = async () => {
  const samples = new Parse.Query("Data");

  samples.limit(2000);
  samples.equalTo("deviceId", "SL-2021-03-015-P");

  try {
    let data = await samples.find();
    var dataOfSensor = JSON.parse(JSON.stringify(data));
    // console.table(dataOfSensor);
    return dataOfSensor;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

export const getFliterSensorData = async (start, end) => {
  if (start != null && end != null) {
    const startDate = new Date(start.toDate());
    const endDate = new Date(end.toDate());

    var Data = Parse.Object.extend("Data");
    var innerQuery = new Parse.Query(Data);
    innerQuery.limit(2000);
    innerQuery.greaterThan("createdAt", startDate);

    var query = new Parse.Query(Data);

    query.lessThan = ("createdAt", endDate);
    query.limit(2000);
    var mainQuery = Parse.Query.and(
      query.greaterThan("createdAt", startDate),
      query.lessThanOrEqualTo("createdAt", endDate)
    );
    mainQuery.limit(2000)

    try {
      let result = mainQuery.find();
      // var dataOfSensor = JSON.parse(JSON.stringify(result));
      return result;
    } catch (err) {
      return err;
    }
  }
};
