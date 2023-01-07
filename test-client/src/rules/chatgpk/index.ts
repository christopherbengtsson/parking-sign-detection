function interpretResponse(response, now) {
  now = now || new Date();
  let parkingAllowedUntil;

  for (let sign of response) {
    if (sign.label === "prohibited_parking") {
      return {
        allowed: false,
      };
    } else if (
      sign.textContent &&
      sign.textContent.length === 1 &&
      sign.textContent[0].content === "p"
    ) {
      parkingAllowedUntil = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    } else {
      let maxParkingTime;
      let timeRange;

      for (let text of sign.textContent) {
        if (text.content.includes("tim")) {
          maxParkingTime = parseTime(text.content);
        } else if (text.content.includes("-")) {
          timeRange = parseTimeRange(text.content);
        }
      }

      if (now > timeRange.end) {
        // If it is after the end of the time range, parking is not allowed
        return {
          allowed: false,
        };
      } else if (now < timeRange.start) {
        // If it is before the start of the time range, parking is allowed until the start of the time range
        parkingAllowedUntil = timeRange.start;
      } else {
        // If it is within the time range, parking is allowed until the end of the time range
        parkingAllowedUntil = timeRange.end;
      }

      // If a max parking time is specified, reduce the allowed parking time accordingly
      if (
        maxParkingTime &&
        parkingAllowedUntil > new Date(now.getTime() + maxParkingTime)
      ) {
        parkingAllowedUntil = new Date(now.getTime() + maxParkingTime);
      }
    }
  }

  return {
    allowed: true,
    until: parkingAllowedUntil,
  };
}
