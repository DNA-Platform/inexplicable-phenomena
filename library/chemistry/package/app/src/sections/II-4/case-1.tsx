import React from 'react';
import { $, $Chemical } from '@/index';
import {
    WeatherFrame, WeatherTitle, WeatherLoading,
    ForecastRow, ForecastDay, ForecastIcon, ForecastTemp,
} from './case.styled';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';

const forecast = [
    { day: 'Mon', icon: '☀️', temp: '24°' },
    { day: 'Tue', icon: '🌧️', temp: '18°' },
    { day: 'Wed', icon: '⛅', temp: '21°' },
];

class $WeatherCard extends $Chemical {
    loaded = false;

    async $WeatherCard() {
        await this.next('mount');
        await new Promise(r => setTimeout(r, 1200));
        this.loaded = true;
    }

    view() {
        return (
            <WeatherFrame>
                <WeatherTitle>3-Day Forecast</WeatherTitle>
                {!this.loaded ? (
                    <WeatherLoading>Loading forecast...</WeatherLoading>
                ) : (
                    <ForecastRow>
                        {forecast.map((f) => (
                            <ForecastDay key={f.day}>
                                <ForecastIcon>{f.icon}</ForecastIcon>
                                <ForecastTemp>{f.temp}</ForecastTemp>
                                {f.day}
                            </ForecastDay>
                        ))}
                    </ForecastRow>
                )}
                <VerdictSection>
                    <VerdictRow $state={this.loaded ? 'pass' : 'pending'}>
                        <VerdictDot $state={this.loaded ? 'pass' : 'pending'} />
                        {this.loaded
                            ? '✓ forecast loaded via await next(\'mount\')'
                            : '○ loading...'}
                    </VerdictRow>
                </VerdictSection>
            </WeatherFrame>
        );
    }
}

const WeatherCard = $($WeatherCard);

export default function Case1Demo() {
    return <WeatherCard />;
}
