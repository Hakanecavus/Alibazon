class products {
    constructor(currency, id, image_groups, long_description, master, name, orderable, page_description, page_title, price, price_max, primary_category_id, short_description){
        this.currency = currency;
        this.id = id;
        this.image_groups = image_groups;
        this.long_description = long_description;
        this.master = master;
        this.name = name;
        this.orderable = orderable;
        this.page_description = page_description;
        this.page_title = page_title;
        this.price = price;
        this.price_max = price_max;
        this.primary_category_id = primary_category_id;
        this.short_description = short_description;
    }
}
module.exports = products;