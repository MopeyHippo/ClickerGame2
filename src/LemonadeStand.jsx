import { useEffect, useState } from "react";

const LEMONADE_VALUE = 1; // sets the base value
const LEMONADE_STAND_COST = 3.738; // inital cost from which scaling is based
const LEMONADE_COEFFICIENT = 1.07; // coefficient for the scaling
const LEMONADE_TIME_MULTIPLIER = 0.6; // how often currencey is earned

const NEWSPAPER_VALUE = 45;
const NEWSPAPER_STAND_COST = 60;
const NEWSPAPER_COEFFICIENT = 1.15;
const NEWSPAPER_TIME_MULTIPLIER = 3;

const CARWASH_VALUE = 540;
const CARWASH_COST = 720;
const CARWASH_COEFFICIENT = 1.14;
const CARWASH_TIME_MULTIPLIER = 6;

const PIZZA_DELIVERY_VALUE = 4320;
const PIZZA_DELIVERY_COST = 8640;
const PIZZA_DELIVERY_COEFFICIENT = 1.13;
const PIZZA_DELIVERY_TIME_MULTIPLIER = 12;

const DONUT_SHOP_VALUE = 51840;
const DONUT_SHOP_COST = 103680;
const DONUT_SHOP_COEFFICIENT = 1.12;
const DONUT_SHOP_TIME_MULTIPLIER = 24;

const prettyNumber = (number) => {
  return Math.round(number * 100) / 100; //formula to return a number to 2 decimal places
};

const FancyButton = (
  props //this line given/taught to me by my friend
) => (
  <button
    // className="bg-primary text-white rounded-md px-4 py-2 disabled:bg-primary/50 hover:bg-primary/90"
    {...props}
  />
);

export default function App() {
  const [money, setMoney] = useState(  
    parseInt(localStorage.getItem("money")) || 0
  );
  const [lemonadeStands, setLemonadeStands] = useState(
    parseInt(localStorage.getItem("lemonadeStands")) || 0
  );
  const [newspaperStands, setNewspaperStands] = useState(
    parseInt(localStorage.getItem("newspaperStands")) || 0
  );
  const [carWashes, setCarwashes] = useState(
    parseInt(localStorage.getItem("carWashes")) || 0
  );
  const [pizzaDelivery, setPizzadelivery] = useState(
    parseInt(localStorage.getItem("pizzaDelivery")) || 0
  );
  const [donutShop, setDonutshop] = useState(
    parseInt(localStorage.getItem("donutShop")) || 0
  );

  useEffect(() => {
    localStorage.setItem("money", JSON.stringify(money));
    localStorage.setItem(
      "lemonadeStands",
      JSON.stringify(lemonadeStands)
    );
    localStorage.setItem(
      "newspaperStands",
      JSON.stringify(newspaperStands)
    );
    localStorage.setItem(
      "carWashes", 
      JSON.stringify(carWashes)
    );
    localStorage.setItem(
      "pizzaDelivery", 
      JSON.stringify(pizzaDelivery)
    );
    localStorage.setItem(
      "donutShop", 
      JSON.stringify(donutShop)
    );
  }, [money, lemonadeStands, newspaperStands, carWashes, pizzaDelivery, donutShop]);

  useEffect(() => {
    const gameIntervalDuration = 1000; //This constant defines the duration of the game interval in milliseconds.
    const durationRatio = 100; //his constant represents a ratio used for scaling the game speed. It seems like a factor used to adjust the speed of the game logic or animations relative to real-time. The specific meaning of this ratio would depend on the context of the game.
    const gameSpeed = gameIntervalDuration / durationRatio; //This line calculates the gameSpeed by dividing the gameIntervalDuration by the durationRatio. This calculation results in a value that determines how frequently game updates occur or how fast certain game actions take place relative to real-time. In this case, it suggests that the game's speed will be 10 times faster than real-time, assuming the gameIntervalDuration is 1000 milliseconds (1 second) and the durationRatio is 100.

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
          (carWashes * CARWASH_VALUE) / 
          durationRatio / 
          CARWASH_TIME_MULTIPLIER;
        const pizzadeliveryProfit =
          (pizzaDelivery * PIZZA_DELIVERY_VALUE) / 
          durationRatio / 
          PIZZA_DELIVERY_TIME_MULTIPLIER;
        const donutshopProfit =
          (donutShop * DONUT_SHOP_VALUE) / 
          durationRatio / 
          DONUT_SHOP_TIME_MULTIPLIER;

        return currentMoney + lemonadeProfit + newspaperProfit + carwashProfit + pizzadeliveryProfit + donutshopProfit;
      });
    }, gameSpeed);

    return () => clearInterval(timer);
  }, [
    setMoney,
    lemonadeStands,
    newspaperStands,
    carWashes,
    pizzaDelivery,
    donutShop,
  ]);

  const lemonadeStandCost =
    LEMONADE_STAND_COST * LEMONADE_COEFFICIENT ** lemonadeStands;

  const lemonadeStandWorth =
  LEMONADE_VALUE * LEMONADE_COEFFICIENT ** lemonadeStands;

  const newspaperStandCost =
    NEWSPAPER_STAND_COST * NEWSPAPER_COEFFICIENT ** newspaperStands;

    const newspaperStandWorth = 
    NEWSPAPER_VALUE * NEWSPAPER_COEFFICIENT ** newspaperStands;

  const carwashesCost = 
  CARWASH_COST * CARWASH_COEFFICIENT ** carWashes;

  const carwashesWorth = 
  CARWASH_VALUE * CARWASH_COEFFICIENT ** carWashes

  const pizzaDeliveryCost =
   PIZZA_DELIVERY_COST * PIZZA_DELIVERY_COEFFICIENT ** pizzaDelivery;

   const pizzaDeliveryWorth =
   PIZZA_DELIVERY_VALUE * PIZZA_DELIVERY_COEFFICIENT ** pizzaDelivery

  const donutShopCost = 
  DONUT_SHOP_COST * DONUT_SHOP_COEFFICIENT ** donutShop;

  const donutShopWorth =
  DONUT_SHOP_VALUE * DONUT_SHOP_COEFFICIENT ** donutShop

  return (
    <div className="flex flex-col gap-2 p-2 select-none">
      <div>money: £{prettyNumber(money)}</div>
      <div>Lemonade Stands: {lemonadeStands}</div>
      <div>Newspaper Stands: {newspaperStands}</div>
      <div>Car Washes: {carWashes}</div>
      <div>Pizza Delivery: {pizzaDelivery}</div>
      <div>Donut Shop: {donutShop}</div>

      <div className="flex flex-row gap-2">
        <FancyButton
          onClick={() => {
            setMoney((money) => money + LEMONADE_VALUE);
          }}
        >
          Sell lemonade £{prettyNumber(lemonadeStandWorth)}
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
          Sell Papers £{prettyNumber(newspaperStandWorth)}
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
          Sell Car washes £{prettyNumber(carwashesWorth)}
        </FancyButton>
        <FancyButton
          disabled={carwashesCost > money}
          onClick={() => {
            setMoney((money) => money - carwashesCost);
            setCarwashes((stand) => stand + 1);
          }}
        >
          Buy Car Washes £{prettyNumber(carwashesCost)}
        </FancyButton>
      </div>
      <div className="flex flex-row gap-2">
        <FancyButton
          disabled={PIZZA_DELIVERY_COST > money}
          onClick={() => {
            setMoney((money) => money + PIZZA_DELIVERY_VALUE);
          }}
        >
          Sell Pizza Delivery £{prettyNumber(pizzaDeliveryWorth)}
        </FancyButton>
        <FancyButton
          disabled={pizzaDeliveryCost > money}
          onClick={() => {
            setMoney((money) => money - pizzaDeliveryCost);
            setPizzadelivery((stand) => stand + 1);
          }}
        >
          Buy Pizza Delivery £{prettyNumber(pizzaDeliveryCost)}
        </FancyButton>
      </div>
      <div className="flex flex-row gap-2">
        <FancyButton
          disabled={PIZZA_DELIVERY_COST > money}
          onClick={() => {
            setMoney((money) => money + PIZZA_DELIVERY_VALUE);
          }}
        >
          Sell Donut Shop £{prettyNumber(donutShopWorth)}
        </FancyButton>
        <FancyButton
          disabled={donutShopCost > money}
          onClick={() => {
            setMoney((money) => money - donutShopCost);
            setDonutshop((stand) => stand + 1);
          }}
        >
          Buy Donut Shop £{prettyNumber(donutShopCost)}
        </FancyButton>
      </div>
    </div>
  );
}
