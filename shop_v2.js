
// Good - класс для хранения данных о товаре со свойствами:
class Good{
    constructor(id, name, description, sizes, price, available){
        this.id =id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    }

    // изменение признака доступности для продажи
    setAvailable(status){
        return this.available = status;
    }
}

//GoodsList - класс для хранения каталога товаров со свойствами:
class GoodsList{
    #goods
    constructor(filter, sortPrice, sortDir){
        this.#goods = []; 
        this.filter = filter;
        this.sortPrice = sortPrice;
        this.sortDir =sortDir;
    }
    get list(){
        const forSale = this.#goods.filter(good => this.filter.test(good.name));

        if (!this.sortPrice){
            return forSale;
        }
        if(this.sortDir){
            return forSale.sort((x,y) => (x.price - y.price));
        }
        return forSale.sort((x,y) => (x.price - y.price));
    }

    add(newGood) {
        this.#goods.push(newGood);
    }

    remove(id){
        const getId = this.findId(good => good.id == id);
        if(getId != undefined){
            this.#goods.splice(getId,1);
        }
        return getId;
    }
}

//BasketGood - класс дочерний от Good, для хранения данных о товаре в корзине с дополнительным свойством:
class BasketGood extends Good{
    constructor(good ,amount){
        super(good.id, good.name, good.description, good.sizes, good.price, good.available);
        this.amount = amount;
    }
}

//Basket - класс для хранения данных о корзине товаров со свойствами:

class Basket{
    constructor(){
        this.goods = [] // массив объектов класса BasketGood для хранения данных о товарах в корзине
    }

    // возвращает общую стоимость товаров в корзине
    get totalAmount(){ 
        return this.goods.reduce((x, y) => x + y.amount * y.price, 0)
    }

    // возвращает общее количество товаров в корзине
    get totalSum(){ 
        return this.goods.map(item => item.amount).reduce((x, y) => x + y, 0)
    }
    
    add(good, amount) {
        let index = this.goods.findIndex(value => value.id === good.id);
        if (index >= 0) {
            this.goods[index].amount += amount;
        } else {
            let addGood = new BasketGood(good ,amount);
            this.goods.push(addGood);
        }
    }

    remove(good, amount) {
        let index = this.goods.findIndex(value => value.id === good.id);
        if (index >= 0) {
            if (this.goods[index].amount - amount <= 0 || amount === 0) {
                this.goods.splice(index, 1);
            } else {
                this.goods[index].amount -= amount;
            }
        } 
    }

    clear() {
        this.goods.length = 0;
    }

    removeUnavailable() {
        this.goods = this.goods.filter(good => good.available === true)
        return this.goods;
    }

}



const good1 = new Good(1, "Шапка мужская зимняя", "цвет чёрный, материал шерсть", ["S", "M", "L"], 550, true);
const good2 = new Good(2, "Шапка женская зимняя", "цвет белый, материал шерсть", ["M", "L"], 600, true);
const good3 = new Good(3, "Шапка детская зимняя", "цвет синий, материал шерсть", ["S"], 500, true);
const good4 = new Good(4, "Бейсболка мужская", "цвет чёрный, материал хлопок", ["M", "L"], 900, true);
const good5 = new Good(5, "Бейсболка женская", "цвет чёрный, материал хлопок", ["L"], 800, true);

// good4.setAvailable(false); // изменение признака доступности для продажи

const product = []

    product.push(good1);
    product.push(good2);
    product.push(good3);
    product.push(good4);
    product.push(good5);

const basket = new Basket();

basket.add(good1,2);
basket.add(good1,2);
basket.add(good1,2); // Добавляет товар в корзину, если товар уже есть увеличивает количество
basket.add(good2,3);
basket.add(good3,1);
basket.add(good4,2);
basket.add(good5,3);



basket.remove(good1, 6); // Уменьшает количество товара в корзине, если количество становится равным нулю, товар удаляется
basket.remove(good5, 1);



basket.removeUnavailable(); // Удаляет из корзины товары, имеющие признак available === false



// basket.clear() // Очищает содержимое корзины

console.log(basket)

console.log('Общее количество товаров в корзине' ,basket.totalSum)

console.log('Общая стоимость товаров в корзине' ,basket.totalAmount)