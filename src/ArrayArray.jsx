import { useEffect, useState } from "react";

const investments = [
  {
    name: "Lemonade Stand",
    action: "sell lemonade",
    value: 1,
    cost: 3.738,
    coefficient: 1.07,
    timeMultiplier: 0.6,
    quantity: 0,
  },
  {
    name: "Newspaper Stand",
    action: "sell NewsPapers",
    value: 45,
    cost: 60,
    coefficient: 1.15,
    timeMultiplier: 3,
    quantity: 0,
  },
  {
    name: "Car Wash",
    action: "Wash Cars",
    value: 540,
    cost: 720,
    coefficient: 1.14,
    timeMultiplier: 6,
    quantity: 0,
  },
  {
    name: "Pizza Delivery",
    action: "Sell Pizzas",
    value: 4320,
    cost: 8640,
    coefficient: 1.13,
    timeMultiplier: 12,
    quantity: 0,
  },
  {
    name: "Donut Shop",
    action: "Sell Donuts",
    value: 51840,
    cost: 103680,
    coefficient: 1.12,
    timeMultiplier: 24,
    quantity: 0,
  },
  {
    name: "Shrimp Boat",
    action: "Sell Shrimp",
    value: 622080,
    cost: 1244160,
    coefficient: 1.11,
    timeMultiplier: 96,
    quantity: 0,
  },
  {
    name: "Hockey Team",
    action: "Sell Hockey Game Tickets",
    value: 7464960,
    cost: 14929920,
    coefficient: 1.1,
    timeMultiplier: 384,
    quantity: 0,
  },
  {
    name: "Movie Studio",
    action: "Sell Movies",
    value: 89579520,
    cost: 179159040,
    coefficient: 1.09,
    timeMultiplier: 1536,
    quantity: 0,
  },
  {
    name: "Bank",
    action: "Bank Money",
    value: 1074954240,
    cost: 2149908480,
    coefficient: 1.08,
    timeMultiplier: 6144,
    quantity: 0,
  },
  {
    name: "Oil Company",
    action: "Mine For Oil",
    value: 29668737024,
    cost: 25798901760,
    coefficient: 1.07,
    timeMultiplier: 36864,
    quantity: 0,
  },
];

const prettyNumber = (number) => {
  return Math.round(number * 100) / 100;
};

const FancyButton = (props) => <button {...props} />;

export default function App() {
  const [money, setMoney] = useState(
    parseInt(localStorage.getItem("money")) || 0
  );
  const [investmentsState, setInvestmentsState] = useState(
    investments.map((investment) => ({
      ...investment,
      quantity: parseInt(localStorage.getItem(investment.name)) || 0,
    }))
  );

  useEffect(() => {
    localStorage.setItem("money", JSON.stringify(money));
    investmentsState.forEach((investment) => {
      localStorage.setItem(
        investment.name,
        JSON.stringify(investment.quantity)
      );
    });
  }, [money, investmentsState]);

  useEffect(() => {
    const gameIntervalDuration = 1000;
    const durationRatio = 100;
    const gameSpeed = gameIntervalDuration / durationRatio;

    const timer = setInterval(() => {
      setMoney((currentMoney) => {
        let totalProfit = 0;
        investmentsState.forEach((investment) => {
          const profit =
            (investment.quantity * investment.value) /
            durationRatio /
            investment.timeMultiplier;
          totalProfit += profit;
        });
        return currentMoney + totalProfit;
      });
    }, gameSpeed);

    return () => clearInterval(timer);
  }, [setMoney, investmentsState]);

  const handleBuy = (index) => {
    setMoney((currentMoney) => currentMoney - investmentsState[index].cost);
    setInvestmentsState((prevState) => {
      const newState = [...prevState];
      newState[index].quantity += 1;
      newState[index].cost =
        prevState[index].cost * prevState[index].coefficient;
      return newState;
    });
  };

  const handleSell = (index) => {
    setMoney((currentMoney) => currentMoney + investmentsState[index].value);
  };

  return (
    <div className="flex flex-col gap-2 p-2 select-none">
      <div>money: £{prettyNumber(money)}</div>
      {investmentsState.map((investment, index) => (
        <div key={index} className="flex flex-row gap-2">
          <FancyButton
            disabled={investment.cost > money}
            onClick={() => handleBuy(index)}
          >
            Buy {investment.name} £{prettyNumber(investment.cost)}
          </FancyButton>
          <FancyButton
            disabled={index !== 0 && investment.quantity === 0}
            onClick={() => handleSell(index)}
          >
            {investment.action} £{prettyNumber(investment.value)}
          </FancyButton>
          <div>
            {investment.name}: {investment.quantity}
          </div>
        </div>
      ))}
      {/* <button onClick ={() => localStorage.clear()}>reset</button>    */}
    </div>
  );
}
