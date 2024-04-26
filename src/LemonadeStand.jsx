import { useEffect, useState } from "react";

const LEMONADE_VALUE = 1; // sets the base value
const LEMONADE_STAND_COST = 3.738; // inital cost from which scaling is based
const LEMONADE_COEFFICIENT = 1.07; // coefficient for the scaling
const LEMONADE_TIME_MULTIPLIER = 0.6; // how often currencey is earned

const NEWSPAPER_VALUE = 60;
const NEWSPAPER_STAND_COST = 60;
const NEWSPAPER_COEFFICIENT = 1.15;
const NEWSPAPER_TIME_MULTIPLIER = 3;

const CARWASH_VALUE = 540;
const CARWASH_COST = 720;
const CARWASH_COEFFICIENT = 1.14;
const CARWASH_TIME_MULTIPLIER = 6;

const prettyNumber = (number) => {
  return Math.round(number * 100) / 100;
};

const FancyButton = (props) => (  //this line given/taught to me by my friend
  <button
    // className="bg-primary text-white rounded-md px-4 py-2 disabled:bg-primary/50 hover:bg-primary/90"
    {...props}
  />
);

export default function App() {
  const [money, setMoney] = useState(parseInt(localStorage.getItem('money'))||0);
  const [lemonadeStands, setLemonadeStands] = useState(0);
  const [newspaperStands, setNewspaperStands] = useState(0);
  
useEffect(() => {
  localStorage.setMoney("money",JSON.stringify(money));
  localStorage.setLemonadeStands("LemsetLemonadeStands",JSON.stringify(money));
  localStorage.setNewspaperStands("NewspaperStands",JSON.stringify(money));
},[money])

  useEffect(() => {
   
    const gameIntervalDuration = 1000;
    const durationRatio = 100;
    const gameSpeed = gameIntervalDuration / durationRatio;

    const timer = setInterval(() => {
      setMoney((currentMoney) => {
        const lemonadeProfit =
          (lemonadeStands * LEMONADE_VALUE) /
          durationRatio /
          LEMONADE_TIME_MULTIPLIER;
        const newspaperProfit =
          (newspaperStands * NEWSPAPER_VALUE) /
          durationRatio /
          NEWSPAPER_TIME_MULTIPLIER;
        const carwashProfit =
          (carwashes * CARWASH_VALUE) /
          durationRatio /
          CARWASH_TIME_MULTIPLIER;

        return currentMoney + lemonadeProfit + newspaperProfit;
      });
    }, gameSpeed);

    return () => clearInterval(timer);
  }, [
    setMoney,
    lemonadeStands,
    // LEMONADE_VALUE,
    newspaperStands,
    // NEWSPAPER_VALUE,
    carwashes,
  ]);

  const lemonadeStandCost =
    LEMONADE_STAND_COST * LEMONADE_COEFFICIENT ** lemonadeStands;

  const newspaperStandCost =
    NEWSPAPER_STAND_COST * NEWSPAPER_COEFFICIENT ** newspaperStands;

  const carwashesCost =
    CARWASH_COST * CARWASH_COEFFICIENT ** carwashes;

  return (
    <div className="flex flex-col gap-2 p-2 select-none">
      <div>money: £{prettyNumber(money)}</div>
      <div>Lemonade Stands: {lemonadeStands}</div>
      <div>Newspaper Stands: {newspaperStands}</div>
      <div>Car Washes: {carwashes}</div>

      <div className="flex flex-row gap-2">
        <FancyButton
          onClick={() => {
            setMoney((money) => money + LEMONADE_VALUE);
          }}
        >
          Sell Lemonade
        </FancyButton>
        <FancyButton
          disabled={lemonadeStandCost > money}
          onClick={() => {
            setMoney((money) => money - lemonadeStandCost);
            setLemonadeStands((stand) => stand + 1);
          }}
        >
          Buy Stand £{prettyNumber(lemonadeStandCost)}
        </FancyButton>
      </div>

      <div className="flex flex-row gap-2">
        <FancyButton
        disabled={NEWSPAPER_STAND_COST > money}
          onClick={() => {
            setMoney((money) => money + NEWSPAPER_VALUE);
          }}
        >
          Sell Papers
        </FancyButton>
        <FancyButton
          disabled={newspaperStandCost > money}
          onClick={() => {
            setMoney((money) => money - newspaperStandCost);
            setNewspaperStands((stand) => stand + 1);
          }}
        >
          Buy Stand £{prettyNumber(newspaperStandCost)}
        </FancyButton>
      </div>
      <div className="flex flex-row gap-2">
        <FancyButton
        disabled={CARWASH_COST > money}
          onClick={() => {
            setMoney((money) => money + CARWASH_VALUE);
          }}
        >
          Sell Car washes
        </FancyButton>
        <FancyButton
          disabled={newspaperStandCost > money}
          onClick={() => {
            setMoney((money) => money - newspaperStandCost);
            setNewspaperStands((stand) => stand + 1);
          }}
        >
          Buy Carwashes £{prettyNumber(newspaperStandCost)}
        </FancyButton>
      </div>
    </div>
  );
}

