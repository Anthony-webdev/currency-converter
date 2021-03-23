import React from 'react';
import Header from 'src/components/Header';
import Currencies from 'src/components/Currencies';
import Amount from 'src/components/Amount';
import Toggler from 'src/components/Toggler';

import currenciesData from 'src/data/currencies';
import './style.scss';


class Converter extends React.Component {
  state = {
    open: true,
    baseAmount: 1,
    currency: 'United States Dollar',
    search: '',
    currencies: currenciesData,
  }

  componentDidMount() {
    this.pageTitleEffect();

    document.addEventListener('keyup', this.handleEscKeyup);
  }

  componentDidUpdate(prevProps, prevState) {
    const { currency } = this.state;

    if (prevState.currency !== currency) {
      this.pageTitleEffect();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleEscKeyup);
  }

  handleEscKeyup = (event) => {
    if (event.code === 'Escape') {
      this.setState({
        open: false,
      });
    }
  }

  pageTitleEffect = () => {
    const { currency } = this.state;
    document.title = `Euro to ${currency}`;
  }

  setOpen = () => {
    const { open } = this.state;

    this.setState({
      open: !open,
    });
  }

  makeConversion = () => {
    const { baseAmount, currency } = this.state;

    const foundCurrency = currenciesData.find((item) => item.name === currency);

    const result = baseAmount * foundCurrency.rate;
    return Number(result.toFixed(2));
  };

  setCurrency = (currency) => {
    this.setState({

      currency,
    });
  };

  setSearch = (value) => {
    this.setState({
      search: value,
    });
  }

  setBaseAmount = (value) => {
    this.setState({
      baseAmount: value,
    });
  }

  getCurrencies = () => {
    const { currencies, search } = this.state;
    let filteredCurrenciesList = currencies;

    if (search) {
      filteredCurrenciesList = filteredCurrenciesList.filter((currency) => {
        const loweredCurrency = currency.name.toLowerCase();
        const loweredSearch = search.toLowerCase();

        return loweredCurrency.includes(loweredSearch);
      });
    }

    return filteredCurrenciesList;
  }

  render() {
    const {
      open,
      baseAmount,
      currency,
      search,
    } = this.state;

    const value = this.makeConversion();

    const currenciesList = this.getCurrencies();

    return (
      <div className="converter">
        <Header
          baseAmount={baseAmount}
          onChangeBaseAmount={this.setBaseAmount}
        />
        <Toggler
          onClickButton={this.setOpen}
          isOpen={open}
        />
        {open && (
          <Currencies
            currencies={currenciesList}
            onClickCurrency={this.setCurrency}
            inputValue={search}
            onChangeInputValue={this.setSearch}
          />
        )}
        <Amount
          value={value}
          currency={currency}
        />
      </div>
    );
  }
}

export default Converter;
