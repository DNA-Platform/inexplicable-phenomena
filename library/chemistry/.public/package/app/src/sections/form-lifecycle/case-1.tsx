import React from 'react';
import { $, $Chemical } from '@/index';
import {
    AppFrame, StockTicker, StockCard, StockSymbol, StockPrice, StockChange,
    FormBadge, RefreshButton, InfoRow, CallCount,
} from './case.styled';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';

const symbols = ['AAPL', 'GOOG', 'TSLA', 'MSFT'];
const randomPrice = () => Math.round((100 + Math.random() * 200) * 100) / 100;

class $StockCard extends $Chemical {
    $symbol = '';
    price = 0;
    change = 0;
    loading = true;
    formCalls = 0;
    fetchCalls = 0;
    refreshCalls = 0;

    async $form() {
        this.formCalls++;
        const data = await this.$fetchQuote();
        this.price = data.price;
        this.change = data.change;
        this.loading = false;

        // second call exercises memoization — fetchCalls should stay at 1
        await this.$fetchQuote();
    }

    async $fetchQuote() {
        this.fetchCalls++;
        await new Promise(r => setTimeout(r, 600 + Math.random() * 800));
        const price = randomPrice();
        return { price, change: Math.round((Math.random() * 10 - 5) * 100) / 100 };
    }

    async refresh() {
        this.refreshCalls++;
        this.loading = true;
        await new Promise(r => setTimeout(r, 400));
        this.price = randomPrice();
        this.change = Math.round((Math.random() * 10 - 5) * 100) / 100;
        this.loading = false;
    }

    view() {
        const trend = this.change > 0 ? 'up' : this.change < 0 ? 'down' : 'flat';
        const formOk = this.formCalls === 1;
        const fetchOk = !this.loading && this.fetchCalls === 1;
        return (
            <StockCard $loading={this.loading}>
                <StockSymbol>{this.$symbol}</StockSymbol>
                {this.loading ? (
                    <StockPrice $trend="flat">---</StockPrice>
                ) : (
                    <StockPrice $trend={trend}>
                        ${this.price.toFixed(2)}
                        <StockChange $positive={this.change >= 0}>
                            {this.change >= 0 ? '+' : ''}{this.change.toFixed(2)}
                        </StockChange>
                    </StockPrice>
                )}
                <InfoRow>
                    <FormBadge $ran={formOk}>
                        $form: {this.formCalls}x
                    </FormBadge>
                    <CallCount>$fetchQuote: {this.fetchCalls}x · refresh: {this.refreshCalls}x</CallCount>
                    {!this.loading && (
                        <RefreshButton onClick={this.refresh}>Refresh</RefreshButton>
                    )}
                </InfoRow>
                <VerdictSection>
                    <VerdictRow $state={formOk ? 'pass' : 'pending'}>
                        <VerdictDot $state={formOk ? 'pass' : 'pending'} />
                        {formOk
                            ? `✓ $form ran exactly once (${this.formCalls}x)`
                            : '○ $form not yet run'}
                    </VerdictRow>
                    <VerdictRow $state={fetchOk ? 'pass' : (this.loading ? 'pending' : 'fail')}>
                        <VerdictDot $state={fetchOk ? 'pass' : (this.loading ? 'pending' : 'fail')} />
                        {fetchOk
                            ? `✓ $fetchQuote memoized — called 2x in $form but executed only ${this.fetchCalls}x`
                            : this.loading
                                ? '○ loading...'
                                : `✗ $fetchQuote ran ${this.fetchCalls}x — expected 1 (memoization failed)`}
                    </VerdictRow>
                </VerdictSection>
            </StockCard>
        );
    }
}

class $StockDashboard extends $Chemical {
    cards: $StockCard[] = [];
    bondCtorRuns = 0;

    $StockDashboard(...cards: $StockCard[]) {
        this.cards = cards;
        this.bondCtorRuns++;
    }

    view() {
        const hasCards = this.cards.length > 0;
        const bondState = hasCards ? 'pass' : 'pending';

        return (
            <>
                <AppFrame>
                    <StockTicker>
                        {this.cards.map((card, i) => {
                            const C = $(card);
                            return <C key={i} />;
                        })}
                    </StockTicker>
                    <CallCount>
                        Bond ctor: {this.bondCtorRuns}x · {this.cards.length} cards received as typed children
                    </CallCount>
                </AppFrame>
                <VerdictSection>
                    <VerdictRow $state={bondState}>
                        <VerdictDot $state={bondState} />
                        {hasCards
                            ? `✓ bond ctor received ${this.cards.length} $StockCard children (ran ${this.bondCtorRuns}x)`
                            : '○ no cards received'}
                    </VerdictRow>
                </VerdictSection>
            </>
        );
    }
}

const StockCardEl = $($StockCard);
const StockDashboard = $($StockDashboard);

export default function Case1Demo() {
    return (
        <StockDashboard>
            {symbols.map(s => <StockCardEl key={s} symbol={s} />)}
        </StockDashboard>
    );
}
