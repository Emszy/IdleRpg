import Items from "../../Objects/Item/"

export default class ItemTest {
  constructor() {
      this.items = new Items();
      // this.items.listCategories();

      // this.listSubCategories();
      this.test();
  }

  listSubCategories() {
      this.items.listSubCategories(0);
      this.items.listSubCategories(1);    
      this.items.listSubCategories(2);    
      this.items.listSubCategories(3);

  }

  test() {

     let item = this.items.getItemFromClick(0)

     let none = this.items.none();

     console.log(none);

     console.log(none.use());

     let randomItem = this.items.randomItemDrop(0);
     // let randomItemCopy = randomItem.copy();
     console.log(randomItem)
     for (var x = 1; x < 20; x++) {
        let randomItem = this.items.randomItemDrop(5);
        console.log(randomItem)

     }

  }

  log()
  {
    
  }



}