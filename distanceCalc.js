export function haversine(lat1, long1, lat2, long2) {
  const radius = 6371000;
  function toRad(num) {
    return (num * Math.PI) / 180;
  }
  var start = { latitude: lat1, longitude: long1 };
  var end = { latitude: lat2, longitude: long2 };

  var dLat = toRad(end.latitude - start.latitude);
  var dLon = toRad(end.longitude - start.longitude);
  var latStart = toRad(start.latitude);
  var latEnd = toRad(end.latitude);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) *
      Math.sin(dLon / 2) *
      Math.cos(latStart) *
      Math.cos(latEnd);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return radius * c;
}
