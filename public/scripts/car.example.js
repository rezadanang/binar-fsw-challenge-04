
class Car {
  static list = [];

  static init(cars) {
    this.list = cars.map((i) => new this(i));
  }

  constructor({
    id,
    plate,
    manufacture,
    model,
    image,
    rentPerDay,
    capacity,
    description,
    transmission,
    available,
    type,
    year,
    options,
    specs,
    availableAt,
  }) {
    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
  }

  render() {
    return `
      
            <div class="card" style="display: flex;">
                <img class="card-img-top img-fluid" style="width: auto; height:250px;" src="${this.image}" alt="${this.manufacture}">
                <div class="card-block px-3">
                <div class="container-text" style="margin:10px;">
                    <h4 class="card-title">Model Car: ${this.model}</h4>
                    <h4>Rp. ${this.rentPerDay}/day</h4>
                   
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi malesuada pellentesque mi eu facilisis. Ut lacus velit, rhoncus eu sodales aliquam, commodo finibus urna. </p>
                      <p class="card-text">&#xf500; Capacity: ${this.capacity}</p>
                      <p class="card-text">&#xf013; Transmission: ${this.transmission}</p>
                      <p class="card-text">&#xf073; Year: ${this.year}</p>
                      <p class="card-text">&#xf017; Available Time: ${this.availableAt}</p>
                    <div class="row pb-4">
                      <div class="col text-center">
                        <button class="btn btn-success" style="padding-right: 100px!important;padding-left: 100px!important;">Pilih Mobil</button>
                      </div>
                    </div>
                    </div>
                </div>
            </div>

     
    `;
  }
}
