import { Console, Random } from "@woowacourse/mission-utils";

class Car {
  constructor(name) {
    if (name.length > 5) {
      throw new Error("이름은 5자 이하만 가능합니다.")
    }
    this.name = name;
    this.position = 0;
  }
  move() {
    const randomNumber = Random.pickNumberInRange(0,9);
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
    this.cars = carNames.split(",").map((name) => new Car(name));
    this.counts = counts;
  }

  gameStart() {
    for (let i = 0; i < this.counts; i++) {
      Console.print(`\n${i + 1}차 시도`);
      this.cars.forEach(car => {
        car.move();
        Console.print(`${car.name} : ${car.nowPosition}`);        
      });
    }
  }

  get winner(){
    const maxPosition = Math.max(...this.cars.map((car) => car.position));
    const winners = this.cars.filter((car) => car.position === maxPosition);
    return winners.map((winner) => winner.name).join(", ");
  }

}

class App {
  async play() {
    try{
      const cars = await Console.readLineAsync(`경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분) \n`);
      if(!cars){
        throw new Error("자동차 이름을 최소 1개 입력하세요.")
      }
      const inputCounts = await Console.readLineAsync("시도할 회수는 몇회인가요?")
      const counts = parseInt(inputCounts);
      const game = new RacingGame(cars, counts);
      game.gameStart();
      Console.print("최종 우승자 : " + game.winner);
    }catch(error){
      throw error;
    }
  }
}

export default App;