import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { API_KEY } from './apiKey';
import Weather from './components/Weather';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [temperature, setTemperature] = useState(0);
  const [weatherCondition, setWeatherCondition] = useState(null);

  const fetchWeather = (lat = 25, lon = 25) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`,
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setTemperature(json.main.temp);
        setWeatherCondition(json.weather[0].main);
        setIsLoading(false);
        console.log(weatherCondition);
      });
  };
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      fetchWeather(position.coords.latitude, position.coords.longitude);
    });
  });

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View>
          <Text>Weather App</Text>
        </View>
      ) : (
        <Weather weather={weatherCondition} temperature={temperature} />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
