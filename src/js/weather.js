const LOCAL_KET_USER_LOCATION = "userLocation";
const WEATHER_API_KEY = "e2e41e4ae74c3339b0b1ab184943a746";

const BASE_URL = "https://api.openweathermap.org";
const ICON_URL = "http://openweathermap.org/img/wn/";

export default class weather {
  userLocation = null;

  constructor({ $target }) {
    const weather = document.createElement("div");
    weather.id = "weather";
    this.$weather = weather;
    $target.append(weather);

    const localData = localStorage.getItem(LOCAL_KET_USER_LOCATION);
    if (localData) {
      this.userLocation = JSON.parse(localData);
      this.getWeather();
    } else {
      this.askForLocation();
    }
  }

  askForLocation() {
    navigator.geolocation.getCurrentPosition(this.handleGetGeoInfoSuccess, null);
  }

  handleGetGeoInfoSuccess = (position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const coordsObj = { lat, lng };
    this.userLocation = coordsObj;
    localStorage.setItem(LOCAL_KET_USER_LOCATION, JSON.stringify(coordsObj));

    this.getWeather();
  };

  getWeather = () => {
    const { lat, lng } = this.userLocation;
    const url = `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}&units=metric`;
    const weather = this.$weather;

    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        const temp = json.main.temp;
        const place = json.name;

        const weatherInfo = json?.weather[0];
        let weatherIconUrl = "";
        if (weatherInfo) {
          const iconId = weatherInfo.icon;
          weatherIconUrl = `${ICON_URL}${iconId}.png`;
        }

        if (temp && place) {
          weather.innerHTML = `
          <img src="${weatherIconUrl}">
          <span>${temp}℃ @ ${place}</span>`;
        } else {
          weather.innerHTML = null;
        }
      });
  };
}
