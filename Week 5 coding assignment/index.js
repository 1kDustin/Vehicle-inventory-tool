//Start vehicle descriptions

class Vehicle {
    constructor(makeModel, year, engine, type) {
        this.makeModel = makeModel;
        this.year = year;
        this.engine = engine;
        this.type = type;
    }

    desctription() {
        return `Make and Model: ${this.makeModel} Year: ${this.year} Engine: ${this.engine}`;
    }
}

//End vehicle descriptions

class Inventory {
    constructor(name) {
        this.name = name;
        this.vehicles = [];
    }

    addVehicle(vehicle) {
        if (vehicle instanceof Vehicle) {
            this.vehicles.push(vehicle);
        } else {
            throw new Error(`You can only add an instance of Vehicle. Arguement is not a Vehicle: ${vehicle}`)
        }
    }
    describe() {
        return `${this.name} has ${this.vehicles.length} vehicles available.`;
    }
}

class Menu {
    constructor() {
        this.inventories = [];
        this.selectedInventory = null;
    }

    start() {
        let selection = this.showMainMenuOptions();

        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.addInventory();
                    break;
                    case '2':
                        this.viewInventory();
                        break;
                        case '3':
                            this.displayAllInventories();
                            break;
                            default:
                                 selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert('All changes have been saved.')
    }

    showMainMenuOptions() {
        return prompt(`
        0) Exit
        1) Add Inventory
        2) View Inventory
        3) Display all Inventories
        `);
    }

    showMainInventoryOptions(inventoryList) {
        return prompt(`
        0) Back
        1) Add Vehicle
        2) Delete Vehicle
        -----------------
        ${inventoryList}
        `);
    }

    displayInventories() {
        let inventoryString = '';
        for (let i = 0; i < this.inventories.length; i++) {
            inventoryString += i + ') ' + this.inventories[i].name + '\n';
        }
        alert(inventoryString)
    }

    addInventory() {
        let name = prompt('Enter a name for the inventory you would like to add:');
        this.inventories.push(new Inventory(name));
    }

    viewInventory() {
        let index = prompt('Please enter the index of the Inventory you would like to view:');
        if (index > -1 && index < this.inventories.length) {
            this.selectedInventory = this.inventories[index];
            let describe = 'Inventory of: ' + this.selectedInventory.name + '\n';
               
            for (let i = 0; i < this.selectedInventory.vehicles.length; i++) {
                describe += i + ') ' + this.selectedInventory.vehicles[i].makeModel + ' - ' + 
                this.selectedInventory.vehicles[i].year + ' - ' + 
                this.selectedInventory.vehicles[i].engine + ' - ' +
                '\n';
            }
            

            let selection = this.showMainInventoryOptions(describe);
            switch (selection) {
                case '1':
                    this.addVehicle();
                    break;
                    case '2':
                        this.deleteVehicle();
                        break;
            }
        }
    }

    addVehicle() {
        let index = alert('Please enter Vehicles information');
        let makeModel = prompt('Please enter the make and model of this vehicle:');
        let year = prompt('Please enter the year of the vehicle:');
        let engine = prompt('Please enter the engine type of the vehicle:')
        let type = prompt('Please enter the vehicle type:')
        this.selectedInventory.vehicles.push(new Vehicle(makeModel, year, engine, type));
    }

    deleteVehicle() {
        let index = prompt('Please enter the index of the vehicle you would like to delete:')
        if (index > -1 && index < this.selectedInventory.vehicles.length) {
            this.selectedInventory.vehicles.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();