class App {
  constructor() {
    this.clearButton = document.getElementById("clear-btn");
    this.loadButton = document.getElementById("load-btn");
    this.carContainerElement = document.getElementById("cars-container");
    this.filterbyDate = document.getElementById("filterDate");
    this.filterbyTime = document.getElementById("filterTime");
    this.filterbyCapacity = document.getElementById("filterCapacity");
  }

  async init() {
    await this.load();

    // Register click listener
    this.clearButton.onclick = this.clear;
    this.loadButton.onclick = this.run;
  }

  run = () => {
    this.clear();
    const dateValue = this.filterbyDate.value;
    const timeValue = this.filterbyTime.value;
    const capacityValue = this.filterbyCapacity.value;
    
    const newDateTime = new Date(`${dateValue} ${timeValue}`);
    const epochTime = newDateTime.getTime();
    
    console.log(dateValue, timeValue, capacityValue, newDateTime, epochTime);
    this.load(epochTime, capacityValue);
    // if( dateValue === '' ||  timeValue === '' || capacityValue === ''){
    //   const messageError = document.createElement('p');
    //   messageError.innerHTML = "harap diisi"
    //   console.log('kosong');
    // }
  };

  async load(dateFilter, capacityFilter) {
    const cars = await Binar.listCars(item => item.capacity >= capacityFilter && (item.availableAt >= dateFilter));
    
    console.log('cars:', cars)
    Car.init(cars);
    Car.list.forEach((car) => {
      const node = document.createElement("div");
      node.innerHTML = car.render();
      this.carContainerElement.appendChild(node);
      node.classList.add('col-sm-4', 'col-xs-12', 'g-5');
    });
    
  }

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };

 
}
