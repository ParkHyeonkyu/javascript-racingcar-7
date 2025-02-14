import { Console, Random } from "@woowacourse/mission-utils";

class Car {
  constructor(name) {
    if (name.length < 1) {
      //이름은 최소 1자 이상입니다.
      throw new Error("[ERROR]");
    }
    if (name.length > 5) {
      //이름은 5자 이하만 가능합니다.
      throw new Error("[ERROR]");
    }
    this.name = name;
    this.position = 0;
  }
  move() {
    const randomNumber = Random.pickNumberInRange(0, 9);
    if (randomNumber >= 4) {
      this.position++;
    }
  }
  get nowPosition() {
    return "-".repeat(this.position);
  }
}

class RacingGame {
  constructor(carNames, counts) {
    const nameArray = carNames.split(",").map((name) => name.trim());

    const nameCheck = new Set(nameArray);
    if (nameCheck.size !== nameArray.length) {
      throw new Error(
        //중복된 이름이 있습니다. 모든 자동차 이름은 고유해야 합니다.
        "[ERROR]"
      );
    }

    this.cars = nameArray.map((name) => new Car(name));
    this.counts = counts;
  }

  playRound() {
    this.cars.forEach((car) => {
      car.move();
      Console.print(`${car.name} : ${car.nowPosition}`);
    });
  }

  gameStart() {
    for (let i = 0; i < this.counts; i++) {
      Console.print(`\n${i + 1}차 시도`);
      this.playRound();
    }
  }

  get winner() {
    const maxPosition = Math.max(...this.cars.map((car) => car.position));
    const winners = this.cars.filter((car) => car.position === maxPosition);
    return winners.map((winner) => winner.name).join(", ");
  }
}

class App {
  async run() {
    try {
      const cars = await Console.readLineAsync(
        `경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분) \n`
      );
      if (!cars) {
        //이름이 입력되지 않았습니다.
        throw new Error("[ERROR]");
      }
      const inputCounts = await Console.readLineAsync(
        "시도할 회수는 몇회인가요?"
      );
      if (inputCounts < 1) {
        //최소 1회 이상 시도해야 합니다.
        throw new Error("[ERROR]");
      }
      const counts = parseInt(inputCounts);

      const game = new RacingGame(cars, counts);
      game.gameStart();

      Console.print("최종 우승자 : " + game.winner);
    } catch (error) {
      throw error;
    }
  }
}

export default App;
