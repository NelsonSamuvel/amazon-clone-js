class Car{
    #brand;
    #model;
    #speed;
    isOpenTrunk;


    constructor({brand,model,speed,trunk}){
        this.brand = brand;
        this.model = model;
        this.isOpenTrunk = trunk;
        this.#speed = speed;
        
    }


    openTrunk(){
        if(this.#speed === 0){
            this.isOpenTrunk = true;  
        }
    }
    closeTrunk(){
        this.isOpenTrunk = false;
    }


    go(){
        if(!this.isOpenTrunk){
            this.#speed += 5;
            if(this.#speed > 200){
                this.#speed =0;
            }
        }


    }

    brake(){
        this.#speed -= 5;
    }



    displayInfo(){
        const trunkStatus = this.isOpenTrunk ? 'open' : 'closed';
        console.log(`${this.#brand} , ${this.#model} , ${this.#speed} km/hr , ${trunkStatus}`);
    }

}


class RaceCar extends Car{


    acceleration;
    
    constructor({brand,model,speed,acceleration}){
        super({brand,model,speed});
        this.acceleration = acceleration;
    }


    openTrunk(){
        return null;
    }

    closeTrunk(){
        return null;
    }

    go(){

        this.speed += this.acceleration;

        if(this.speed > 300){
            this.speed = 300;
        }
    }

    displayInfo(){
        return `${this.speed}`
    }

}


// const normalCar = new Car({
//     brand : "toyoto",
//     model : "corolla",
//     speed : 120,
//     trunk : false,
// });

// normalCar.displayInfo();


const raceCar = new RaceCar({
    brand : "toyoto",
    model : "corolla",
    speed : 120,
    acceleration : 20,
})


raceCar.go();

console.log(raceCar.displayInfo());
