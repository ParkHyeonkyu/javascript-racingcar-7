import { Console, Random } from "@woowacourse/mission-utils";

class Car {
  constructor(name) {
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

class App {
  async play() {
    try{
      const carName = await Console.readLineAsync(`자동차 이름을 입력하세요.: \n`);
      const car = new Car(carName);
      Console.print("자동차 이름: " + car.name);
      car.move();
      Console.print(car.position);
    }catch(error){
      throw error;
    }
  }
}

export default App;