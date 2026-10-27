export interface WeatherData {
	city: string;
	temperature: number;
	condition: string;
	windSpeed: number;
	isDay: boolean;
	humidity?: number;
	time: string;
	highTemp?: number;
	lowTemp?: number;
	code: number;
}

// Convert Open-Meteo WMO weather codes to human labels & spider-themed descriptors
export const getWeatherCondition = (code: number): { label: string; icon: string } => {
	switch (code) {
		case 0:
			return { label: 'Clear Sky', icon: '☀️' };
		case 1:
		case 2:
			return { label: 'Partly Cloudy', icon: '🌤️' };
		case 3:
			return { label: 'Overcast Web-Sky', icon: '☁️' };
		case 45:
		case 48:
			return { label: 'Dimension Mist / Fog', icon: '🌫️' };
		case 51:
		case 53:
		case 55:
			return { label: 'Light Drizzle', icon: '🌦️' };
		case 61:
		case 63:
		case 65:
			return { label: 'Neon Rain Shower', icon: '🌧️' };
		case 71:
		case 73:
		case 75:
			return { label: 'Snow Flurries', icon: '❄️' };
		case 80:
		case 81:
		case 82:
			return { label: 'Heavy Brooklyn Downpour', icon: '⛈️' };
		case 95:
		case 96:
		case 99:
			return { label: 'Multiverse Thunderstorm', icon: '⚡' };
		default:
			return { label: 'Atmospheric Cloud', icon: '⛅' };
	}
};

export const fetchWeatherForCoords = async (
	latitude: number,
	longitude: number,
	cityName = 'Local Patrol Area',
): Promise<{ data: WeatherData | null; error: string | null }> => {
	try {
		const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
		const res = await fetch(url);
		if (!res.ok) {
			return { data: null, error: `Weather API returned status ${res.status}` };
		}
		const json = await res.json();
		const current = json.current;
		const daily = json.daily;
		const weatherCode = current?.weather_code ?? 0;
		const condition = getWeatherCondition(weatherCode).label;

		return {
			data: {
				city: cityName,
				temperature: Math.round(current?.temperature_2m ?? 20),
				condition,
				windSpeed: Math.round(current?.wind_speed_10m ?? 0),
				isDay: Boolean(current?.is_day),
				humidity: current?.relative_humidity_2m,
				time: current?.time || new Date().toISOString(),
				highTemp: daily?.temperature_2m_max?.[0] ? Math.round(daily.temperature_2m_max[0]) : undefined,
				lowTemp: daily?.temperature_2m_min?.[0] ? Math.round(daily.temperature_2m_min[0]) : undefined,
				code: weatherCode,
			},
			error: null,
		};
	} catch (err: unknown) {
		const msg = err instanceof Error ? err.message : 'Unable to connect to Weather Service';
		return { data: null, error: msg };
	}
};
