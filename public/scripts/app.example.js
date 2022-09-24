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
    
    // console.log(dateValue, timeValue, capacityValue, newDateTime, epochTime);
    if( dateValue === '' ||  timeValue === '' || capacityValue === ''){ 
      document.getElementById("errorMsg").innerHTML = "Lengkapi form input!";  
      document.getElementById("errorMsg").style.display = "block";
    } else{
      this.load(epochTime, capacityValue);
    document.getElementById("errorMsg").style.display = "none";
    }
    
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
